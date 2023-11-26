package bookstore.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bookstore.data.BookRepository;
import bookstore.data.CartInformationRepository;
import bookstore.data.SaleRepository;
import bookstore.model.Book;
import bookstore.model.CartInformation;
import bookstore.model.Sale;
import bookstore.model.User;
import bookstore.model.UserPrincipal;
import bookstore.service.CartInformationResponse;
import lombok.RequiredArgsConstructor;

@RestController
@Controller
@RequiredArgsConstructor
@RequestMapping("/cart")
@CrossOrigin(origins = "http://127.0.0.1:5173")
public class CartInformationController {
	private final CartInformationRepository cartRepo;
	private final BookRepository bookRepo;
	private final SaleRepository saleRepo;
	@GetMapping("/{userId}")
	public List<CartInformationResponse> getCartByUserId(@PathVariable int userId) {
		List<CartInformation> cartList = cartRepo.findAllByUserId(userId);
		List<CartInformationResponse> cartInfoResponseList = new ArrayList<CartInformationResponse>();
		List<Sale> saleList = saleRepo.findByEndDateIsNull();
		if (!saleList.isEmpty()) {
			Sale sale = saleList.get(0);
			int salingCategoryId = sale.getCategory().getId();
			cartList.forEach(cartInfo -> {
				float actualPrice = cartInfo.getBook().getPrice();
				if (salingCategoryId == cartInfo.getBook().getCategory().getId()) {
					actualPrice = Float.parseFloat(String.format("%.2f", cartInfo.getBook().getPrice()*(100 - sale.getSalePercent())/100));
				}
				CartInformationResponse cartInfoResponse = new CartInformationResponse(cartInfo.getUser(), cartInfo.getBook(), cartInfo.getBook().getImages() , cartInfo.getQuantity(), actualPrice);
				cartInfoResponseList.add(cartInfoResponse);
			});	
		} else {
			cartList.forEach(cartInfo -> {
				CartInformationResponse cartInfoResponse = new CartInformationResponse(cartInfo.getUser(), cartInfo.getBook(), cartInfo.getBook().getImages() , cartInfo.getQuantity(), cartInfo.getBook().getPrice());
				cartInfoResponseList.add(cartInfoResponse);
			});	
		}
		return cartInfoResponseList;
	}
	
	@GetMapping()
	public List<CartInformationResponse> getCartByUser() {
		UserPrincipal userPrincipal =  (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userPrincipal.getUser();
		List<CartInformation> cartList = cartRepo.findAllByUserId(user.getId());
		List<CartInformationResponse> cartInfoResponseList = new ArrayList<CartInformationResponse>();
		List<Sale> saleList = saleRepo.findByEndDateIsNull();
		if (!saleList.isEmpty()) {
			Sale sale = saleList.get(0);
			int salingCategoryId = sale.getCategory().getId();
			cartList.forEach(cartInfo -> {
				float actualPrice = cartInfo.getBook().getPrice();
				if (salingCategoryId == cartInfo.getBook().getCategory().getId()) {
					actualPrice = Float.parseFloat(String.format("%.2f", cartInfo.getBook().getPrice()*(100 - sale.getSalePercent())/100));
				}
				CartInformationResponse cartInfoResponse = new CartInformationResponse(cartInfo.getUser(), cartInfo.getBook(), cartInfo.getBook().getImages() ,cartInfo.getQuantity(), actualPrice);
				cartInfoResponseList.add(cartInfoResponse);
			});	
		} else {
			cartList.forEach(cartInfo -> {
				CartInformationResponse cartInfoResponse = new CartInformationResponse(cartInfo.getUser(), cartInfo.getBook(), cartInfo.getBook().getImages() , cartInfo.getQuantity(), cartInfo.getBook().getPrice());
				cartInfoResponseList.add(cartInfoResponse);
			});	
		}
		return cartInfoResponseList;
	}
	
	@PostMapping("/{bookId}")
	public ResponseEntity<String> addToCart(@PathVariable int bookId, @RequestBody Map<String, Integer> request) {
		CartInformation cartInfo = new CartInformation();
		if (request.containsKey("quantity")) {
			Optional<Book> book = bookRepo.findById(bookId);		
			if (book.isEmpty()) return new ResponseEntity<String> ("couldn't find the book", HttpStatus.BAD_REQUEST);
			cartInfo.setBook(book.get());
			UserPrincipal userPrincipal =  (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			User user = userPrincipal.getUser();
			CartInformation searchingCart = cartRepo.findByUserIdAndBookId(user.getId(), bookId);
			if (searchingCart != null) {
				searchingCart.setQuantity(request.get("quantity"));
				cartRepo.save(searchingCart);
				return new ResponseEntity<String> ("create success", HttpStatus.CREATED);
			}
			cartInfo.setUser(user);
			cartInfo.setQuantity(request.get("quantity"));
			cartRepo.save(cartInfo);
			return new ResponseEntity<String> ("create success", HttpStatus.CREATED);
		} else {
			return new ResponseEntity<String> ("The request must contain bookId and quantity", HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping("/{bookId}")
	public ResponseEntity<String> editQuantity(@PathVariable("bookId") int bookId, @RequestBody Map<String, Integer> request) {
		UserPrincipal userPrincipal =  (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		int userId = userPrincipal.getUser().getId();
		CartInformation cartInfo = cartRepo.findByUserIdAndBookId(userId, bookId);
		if (request.containsKey("quantity")) {
			cartInfo.setQuantity(request.get("quantity"));			
		}
		cartRepo.save(cartInfo);
		return new ResponseEntity<String> ("modify success", HttpStatus.OK);
	}
	
	@DeleteMapping("/{bookId}")
	public ResponseEntity<String> deleteCartInfo(@PathVariable("bookId") int bookId) {
		UserPrincipal userPrincipal =  (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		int userId = userPrincipal.getUser().getId();
		cartRepo.removeCartInformationByUserIdAndBookId(userId, bookId);
		return new ResponseEntity<String> ("delete success", HttpStatus.NO_CONTENT);
	}
}
