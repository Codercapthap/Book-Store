package bookstore.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bookstore.data.BookRepository;
import bookstore.data.FavouriteRepository;
import bookstore.data.SaleRepository;
import bookstore.data.UserRepository;
import bookstore.model.Book;
import bookstore.model.Category;
import bookstore.model.Favourite;
import bookstore.model.Sale;
import bookstore.model.User;
import bookstore.model.UserPrincipal;
import bookstore.service.BookResponse;
import lombok.RequiredArgsConstructor;

@Controller
@RestController
@RequestMapping("/favourite")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://127.0.0.1:5173")
public class FavouriteController {
	private final FavouriteRepository favouriteRepo;
	private final BookRepository bookRepo;
	private final UserRepository userRepo;
	private final SaleRepository saleRepo;
	@GetMapping()
	public Page<BookResponse> getFavouriteBookByUserId(@RequestParam Map<String, String> params) {
		PageRequest page = PageRequest.of(0, 12);
		if (params.containsKey("page")) {
			page = page.withPage(Integer.parseInt(params.get("page")));
		}
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
		List<BookResponse> listBookResponse = new ArrayList<BookResponse>();
		UserPrincipal user =  (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	    int userId = user.getUser().getId();
		Page<Book> books = bookRepo.findAllByDeletedAtIsNullAndUserId(userId, page);
		books.forEach(book -> {
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
		Page<BookResponse> pageResponse = new PageImpl<>(listBookResponse, page, books.getTotalElements());
		return pageResponse;
	}
	
	@PostMapping("/")
	public ResponseEntity<String> createFavourite(@RequestBody Map<String, String> request) {
		int bookId = Integer.parseInt(request.get("bookId"));
		UserPrincipal userPrincipal =  (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Optional<User> user = userRepo.findById(userPrincipal.getUser().getId());
		Optional<Book> book = bookRepo.findById(bookId);
		if (user.isEmpty()) return new ResponseEntity<String>("user not found", HttpStatus.BAD_REQUEST);
		if (book.isEmpty()) return new ResponseEntity<String>("book not found", HttpStatus.BAD_REQUEST);
		Favourite favourite = new Favourite();
		favourite.setBook(book.get());
		favourite.setUser(user.get());
		favouriteRepo.save(favourite);
		return new ResponseEntity<String>("create success", HttpStatus.CREATED);
	}
	

	@DeleteMapping("/{bookId}")
//	@ResponseStatus(HttpStatus.NO_CONTENT)
	public String deleteFavouriteByBookId(@PathVariable int bookId) {
		UserPrincipal user =  (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	    int userId = user.getUser().getId();
	    favouriteRepo.removeFavouriteByUserIdAndBookId(userId, bookId);
		return "delete success";
	}
}
