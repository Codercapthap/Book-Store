package bookstore.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import bookstore.data.BookRepository;
import bookstore.data.FavouriteRepository;
import bookstore.data.ImageRepository;
import bookstore.data.RatingRepository;
import bookstore.data.SaleRepository;
import bookstore.data.SubCategoryRepository;
import bookstore.model.Book;
import bookstore.model.Category;
import bookstore.model.Favourite;
import bookstore.model.Image;
import bookstore.model.Rating;
import bookstore.model.Sale;
import bookstore.model.SubCategory;
import bookstore.model.User;
import bookstore.model.UserPrincipal;
import bookstore.service.BookResponse;
import lombok.RequiredArgsConstructor;

@RestController
@Controller
@RequestMapping("/book")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://127.0.0.1:5173")
public class BookController {
	private final BookRepository bookRepo;
	private final SubCategoryRepository subCateRepo;
	private final SaleRepository saleRepo;
	private final RatingRepository ratingRepo;
	private final FavouriteRepository favouriteRepo;
	private final ImageRepository imageRepo;
	private String folderPath = this.getClass().getResource("/static/images/").getFile();
	
	private void getRatingByBookId(BookResponse bookResponse, int id) {
		List<Rating> ratings = ratingRepo.findAllByBookId(id);
		Map<Integer, Integer> ratingCount = new HashMap<Integer, Integer>();
		int totalRate = ratings.size();
		for (int i = 0; i < ratings.size(); i++) {
			switch(ratings.get(i).getStars()) {
			case 1:
				ratingCount.put(1, ratingCount.getOrDefault(1, 0) + 1);
				break;
			case 2:
				ratingCount.put(2, ratingCount.getOrDefault(2, 0) + 1);
				break;
			case 3:
				ratingCount.put(3, ratingCount.getOrDefault(3, 0) + 1);
				break;
			case 4:
				ratingCount.put(4, ratingCount.getOrDefault(4, 0) + 1);
				break;
			case 5:
				ratingCount.put(5, ratingCount.getOrDefault(5, 0) + 1);
				break;
			default:
				break;
			}
		}
		float averageStar = 0;
		if (totalRate != 0) {
			averageStar = (ratingCount.getOrDefault(1, 0) + ratingCount.getOrDefault(2, 0)*2 + ratingCount.getOrDefault(3, 0)*3 + ratingCount.getOrDefault(4, 0)*4 + ratingCount.getOrDefault(5, 0)*5) / totalRate;				
		} 
		bookResponse.setAverageRating(averageStar);
		bookResponse.setTotalRate(totalRate);
	}
	
	@GetMapping()
	public Page<BookResponse> getAllBook(@RequestParam Map<String, String> params) {
		PageRequest page = PageRequest.of(0, 12);
		if (params.containsKey("pageSize")) {
			page = PageRequest.of(0, Integer.parseInt(params.get("pageSize")));
		}
		if (params.containsKey("page")) {
			page = page.withPage(Integer.parseInt(params.get("page")));
		}
		Page<Book> listBook;
		List<BookResponse> listBookResponse = new ArrayList<BookResponse>();
		List<Sale> saleList = saleRepo.findByEndDateIsNull();
		List<Integer> saleCates = new ArrayList<Integer>();
		if (!saleList.isEmpty()) {
			Sale sale = saleList.get(0);
			if (sale.getCategory().getSubCategory().isEmpty()) {
				saleCates.add(sale.getCategory().getId());
			} else {
				Category parent = sale.getCategory();
				parent.getSubCategory().forEach((subCate) -> {
					saleCates.add(subCate.getId());
				});
			}
		}
		if (params.containsKey("sort")) {
			if (params.get("sort").equals("titled")) {
				page = page.withSort(Sort.by("title").descending());
			}
			if (params.get("sort").equals("titlea")) {
				page = page.withSort(Sort.by("title").ascending());
			}
			if (params.get("sort").equals("priced")) {
				page = page.withSort(Sort.by("price").descending());
			}
			if (params.get("sort").equals("pricea")) {
				page = page.withSort(Sort.by("price").ascending());
			}
		}
		if (params.containsKey("title")) {
			listBook = bookRepo.findAllBookByTitleContainingAndDeletedAtIsNull(params.get("title"), page);
		} else {			
			listBook = bookRepo.findAllBookByDeletedAtIsNull(page);
		}
		listBook.forEach(book -> {
			BookResponse bookResponse = new BookResponse();
			bookResponse.setAuthor(book.getAuthor());
			bookResponse.setCategory(book.getCategory().getCategory());
			bookResponse.setDeletedAt(book.getDeletedAt());
			bookResponse.setId(book.getId());
			bookResponse.setPrice(book.getPrice());
			bookResponse.setTitle(book.getTitle());
			bookResponse.setDescription(book.getDescription());	
			bookResponse.setImages(book.getImages());
			bookResponse.setActualPrice(book.getPrice());
			if (!saleCates.isEmpty()) {
				if (saleCates.contains(book.getCategory().getId())) {
					Sale sale = saleList.get(0);
					bookResponse.setActualPrice(Float.parseFloat(String.format("%.2f", book.getPrice()*(100 - sale.getSalePercent())/100)));
				}
			}
			getRatingByBookId(bookResponse, book.getId());
			listBookResponse.add(bookResponse);
		});
		Page<BookResponse> pageResponse = new PageImpl<>(listBookResponse, page, listBook.getTotalElements());
		return pageResponse;
	}
	
	@GetMapping("/admin")
	public Page<BookResponse> getAllBookAdmin(@RequestParam Map<String, String> params) {
		PageRequest page = PageRequest.of(0, 12);
		if (params.containsKey("pageSize")) {
			page = PageRequest.of(0, Integer.parseInt(params.get("pageSize")));
		}
		if (params.containsKey("page")) {
			page = page.withPage(Integer.parseInt(params.get("page")));
		}
		Page<Book> listBook;
		List<BookResponse> listBookResponse = new ArrayList<BookResponse>();
		List<Sale> saleList = saleRepo.findByEndDateIsNull();
		List<Integer> saleCates = new ArrayList<Integer>();
		if (!saleList.isEmpty()) {
			Sale sale = saleList.get(0);
			if (sale.getCategory().getSubCategory().isEmpty()) {
				saleCates.add(sale.getCategory().getId());
			} else {
				Category parent = sale.getCategory();
				parent.getSubCategory().forEach((subCate) -> {
					saleCates.add(subCate.getId());
				});
			}
		}
		if (params.containsKey("sort")) {
			if (params.get("sort").equals("titled")) {
				page = page.withSort(Sort.by("title").descending());
			}
			if (params.get("sort").equals("titlea")) {
				page = page.withSort(Sort.by("title").ascending());
			}
			if (params.get("sort").equals("priced")) {
				page = page.withSort(Sort.by("price").descending());
			}
			if (params.get("sort").equals("pricea")) {
				page = page.withSort(Sort.by("price").ascending());
			}
			if (params.get("sort").equals("deletedAtd")) {
				page = page.withSort(Sort.by("deletedAt").descending());
			}
			if (params.get("sort").equals("deletedAta")) {
				page = page.withSort(Sort.by("deletedAt").ascending());
			}
		}
		if (params.containsKey("title")) {
			listBook = bookRepo.findAllBookByTitleContaining(params.get("title"), page);
		} else {			
			listBook = bookRepo.findAll(page);
		}
		listBook.forEach(book -> {
			BookResponse bookResponse = new BookResponse();
			bookResponse.setAuthor(book.getAuthor());
			bookResponse.setCategory(book.getCategory().getCategory());
			bookResponse.setDeletedAt(book.getDeletedAt());
			bookResponse.setId(book.getId());
			bookResponse.setPrice(book.getPrice());
			bookResponse.setTitle(book.getTitle());
			bookResponse.setDescription(book.getDescription());	
			bookResponse.setImages(book.getImages());
			bookResponse.setActualPrice(book.getPrice());
			if (!saleCates.isEmpty()) {
				if (saleCates.contains(book.getCategory().getId())) {
					Sale sale = saleList.get(0);
					bookResponse.setActualPrice(Float.parseFloat(String.format("%.2f", book.getPrice()*(100 - sale.getSalePercent())/100)));
				}
			}
			listBookResponse.add(bookResponse);
		});
		Page<BookResponse> pageResponse = new PageImpl<>(listBookResponse, page, listBook.getTotalElements());
		return pageResponse;
	}
	
	@GetMapping("/count")
	public long getBookCount() {
		return bookRepo.count();
	}
	
	@GetMapping("/category/{categoryId}")
	public Page<BookResponse> getBookByCategory(@PathVariable int categoryId,@RequestParam Map<String, String> params) {
		PageRequest page = PageRequest.of(0, 12);
		List<Sale> saleList = saleRepo.findByEndDateIsNull();
		if (params.containsKey("sort")) {
			if (params.get("sort").equals("titled")) {
				page = page.withSort(Sort.by("title").descending());
			}
			if (params.get("sort").equals("titlea")) {
				page = page.withSort(Sort.by("title").ascending());
			}
			if (params.get("sort").equals("priced")) {
				page = page.withSort(Sort.by("price").descending());
			}
			if (params.get("sort").equals("pricea")) {
				page = page.withSort(Sort.by("price").ascending());
			}
		}
		Page<Book> listBook = bookRepo.findAllBookByCategoryIdAndDeletedAtIsNull(categoryId, page);
		List<BookResponse> listBookResponse = new ArrayList<BookResponse>();
		boolean[] isSale = {false};
		if (!saleList.isEmpty()) {
			Sale sale = saleList.get(0);
			if (categoryId == sale.getCategory().getId())
				isSale[0] = true;
			else {
				sale.getCategory().getSubCategory().forEach(element -> {
					if (element.getId() == categoryId) {
						isSale[0] = true;
					}
				});
			}
		} 
		listBook.forEach(book -> {
			BookResponse bookResponse = new BookResponse();
			bookResponse.setAuthor(book.getAuthor());
			bookResponse.setCategory(book.getCategory().getCategory());
			bookResponse.setDeletedAt(book.getDeletedAt());
			bookResponse.setId(book.getId());
			bookResponse.setPrice(book.getPrice());
			bookResponse.setDescription(book.getDescription());
			bookResponse.setTitle(book.getTitle());
			bookResponse.setImages(book.getImages());
			bookResponse.setActualPrice(book.getPrice());
			if (isSale[0]) {
				bookResponse.setActualPrice(Float.parseFloat(String.format("%.2f", book.getPrice()*(100 - saleList.get(0).getSalePercent())/100)));
				
			} 
			getRatingByBookId(bookResponse, book.getId());
			listBookResponse.add(bookResponse);
		});
		Page<BookResponse> pageResponse = new PageImpl<>(listBookResponse, page, listBook.getTotalElements());
		return pageResponse;
	}
	
	@GetMapping("/{id}")
	public BookResponse getBookById(@PathVariable int id) {
		Optional<Book> bookOptional = bookRepo.findById(id);
		List<Sale> saleList = saleRepo.findByEndDateIsNull();
		if (bookOptional.isPresent()) {
			Book book = bookOptional.get();
			BookResponse bookResponse = new BookResponse();
			bookResponse.setAuthor(book.getAuthor());
			bookResponse.setCategory(book.getCategory().getCategory());
			bookResponse.setDeletedAt(book.getDeletedAt());
			bookResponse.setId(book.getId());
			bookResponse.setPrice(book.getPrice());
			bookResponse.setDescription(book.getDescription());
			bookResponse.setTitle(book.getTitle());
			bookResponse.setImages(book.getImages());
			bookResponse.setActualPrice(book.getPrice());
			if (!saleList.isEmpty()) {
				Sale sale = saleList.get(0);
				if (book.getCategory().getId() == sale.getCategory().getId())
					bookResponse.setActualPrice(Float.parseFloat(String.format("%.2f", book.getPrice()*(100 - sale.getSalePercent())/100)));
				else {
					sale.getCategory().getSubCategory().forEach(element -> {
						if (element.getId() == book.getCategory().getId()) {
							bookResponse.setActualPrice(Float.parseFloat(String.format("%.2f", book.getPrice()*(100 - sale.getSalePercent())/100)));
						}
					});
				}
			} 

			getRatingByBookId(bookResponse, book.getId());
			return bookResponse;
		} else {
			return null;
		}
	}
	
	@GetMapping("/wishlist/{id}")
	public Boolean getIsInWistListBook(@PathVariable int id) {
		if (!(SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof String)) {
//			Authentication authen = SecurityContextHolder.getContext().getAuthentication();
			UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			User user = userPrincipal.getUser();
			Optional<Book> bookOptional = bookRepo.findById(id);
			if (bookOptional.isPresent()) {
				Favourite favourite = favouriteRepo.findByUserIdAndBookId(user.getId(), bookOptional.get().getId());
				if (favourite != null) {
					return true;
				}
			}
		} 
		return false;
	}
	
	@PostMapping()
	public ResponseEntity<Book> createBook(@RequestParam("title") String title, @RequestParam("category") int categoryId, @RequestParam("author") String author, @RequestParam("description") String description, @RequestParam("price") String price, @RequestPart("images") List<MultipartFile> images) throws IOException  {
		Book book = new Book();
		Optional<SubCategory> category = subCateRepo.findById(categoryId);
		if (category.isPresent()) {
			book.setCategory(category.get());
			book.setTitle(title);
			book.setAuthor(author);
			book.setDescription(description);
			book.setPrice(Float.parseFloat(price));
		} else {
			return new ResponseEntity<Book>(book, HttpStatus.BAD_REQUEST);
		}
		Book newBook = bookRepo.save(book);
		images.forEach(image -> {
			File directory = new File(folderPath);
			if (!directory.exists()) {
				directory.mkdirs();
			}
			
			Path path = Paths.get(directory.getAbsolutePath() + "/" + LocalDate.now() + image.getOriginalFilename());
			try {
				Files.copy(image.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
				Image imageModel = new Image();
				imageModel.setBook(newBook);
				imageModel.setImageLocation("/images/" + path.getFileName());
				imageRepo.save(imageModel);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}			
		});
		return new ResponseEntity<Book>(newBook, HttpStatus.CREATED);
	}
	
	@PutMapping("/{id}") 
	public ResponseEntity<String> updateBook(@RequestBody Map<String, String> request, @PathVariable int id) {
		Optional<Book> optinalBook = bookRepo.findById(id);
		if (optinalBook.isEmpty()) {
			return new ResponseEntity<String> ("couldn't find the book associated", HttpStatus.BAD_REQUEST);
		} else {
			Book book = optinalBook.get();
			book.setAuthor(request.get("author"));
			book.setTitle(request.get("title"));
			book.setDescription(request.get("description"));
			Optional<SubCategory> category = subCateRepo.findById(Integer.parseInt(request.get("category")));
			if (category.isPresent()) {
				book.setCategory(category.get());
			}
			book.setPrice(Float.parseFloat(request.get("price")));
			bookRepo.save(book);
			return new ResponseEntity<String> ("update success", HttpStatus.OK);
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteBook(@PathVariable int id) {
		bookRepo.deleteBookById(Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant()), id);
		return new ResponseEntity<String> ("delete success", HttpStatus.NO_CONTENT);
	}
	

	@PatchMapping("/{id}")
	public ResponseEntity<String> restoreBook(@PathVariable int id) {
		bookRepo.restoreBookById(id);
		return new ResponseEntity<String> ("restore success", HttpStatus.OK);
	}
}