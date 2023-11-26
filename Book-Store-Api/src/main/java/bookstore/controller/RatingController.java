package bookstore.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bookstore.data.BookRepository;
import bookstore.data.RatingRepository;
import bookstore.model.Book;
import bookstore.model.Rating;
import bookstore.model.User;
import bookstore.model.UserPrincipal;
import bookstore.service.RatingStat;
import lombok.RequiredArgsConstructor;

@RestController
@Controller
@RequiredArgsConstructor
@RequestMapping("rating")
@CrossOrigin(origins = "http://127.0.0.1:5173")
public class RatingController {
	private final RatingRepository ratingRepo;
	private final BookRepository bookRepo;
	@GetMapping("/{bookId}")
	public Page<Rating> getRatingByBook(@PathVariable int bookId, @RequestParam Map<String, String> params) {
		PageRequest page = PageRequest.of(0, 12);
		if (params.containsKey("page")) {
			page = PageRequest.of(Integer.parseInt(params.get("page")), 12);
		} 
		Page<Rating> ratingList = ratingRepo.findAllByBookId(page, bookId);
		return ratingList;
	}
	
	@GetMapping("/stat/{bookId}")
	public RatingStat getRatingStat(@PathVariable int bookId) {
		List<Rating> ratings = ratingRepo.findAllByBookId(bookId);
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
		RatingStat ratingStat = new RatingStat(ratingCount, averageStar, totalRate);
		return ratingStat;
	}
	
	@PostMapping("/{bookId}")
	public ResponseEntity<String> createRating(@PathVariable int bookId, @RequestBody Map<String, String> request) {
		Rating rating = new Rating();
		UserPrincipal userPrincipal =  (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userPrincipal.getUser();
	    rating.setUser(user);
			Optional<Book> book = bookRepo.findById(bookId);
			if (book.isPresent()) {
				Optional<Rating> currentRating = ratingRepo.findByBookIdAndUserId(book.get().getId(), user.getId());
				if (currentRating.isPresent()) {
					return new ResponseEntity<String> ("you have already rating this book", HttpStatus.BAD_REQUEST);
				}
				rating.setBook(book.get());	
			}
		if (request.containsKey("comment")) {
			rating.setComment(request.get("comment"));
		}
		if (request.containsKey("stars")) {
			rating.setStars(Integer.parseInt(request.get("stars")));
		}
		ratingRepo.save(rating);
		return new ResponseEntity<String> ("create success", HttpStatus.CREATED);
	}

	@PutMapping("/{bookId}")
	public ResponseEntity<String> updateRating(@PathVariable int bookId, @RequestBody Map<String, String> request) {
		UserPrincipal userPrincipal =  (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userPrincipal.getUser();
				Optional<Rating> currentRating = ratingRepo.findByBookIdAndUserId(bookId, user.getId());
				if (currentRating.isPresent()) {
					Rating rating = currentRating.get();
					if (request.containsKey("comment")) {
						rating.setComment(request.get("comment"));
					} 
					if (request.containsKey("stars")) {
						rating.setStars(Integer.parseInt(request.get("stars")));
					}
					ratingRepo.save(rating);
					return new ResponseEntity<String> ("update success", HttpStatus.OK);
				}
				else {
					return new ResponseEntity<String> ("couldn't find the associate rating", HttpStatus.BAD_REQUEST);
				}
			}
	
	@DeleteMapping("/{bookId}")
	public ResponseEntity<String> deleteRating(@PathVariable int bookId) {
		UserPrincipal userPrincipal =  (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userPrincipal.getUser();
		Optional<Rating> currentRating = ratingRepo.findByBookIdAndUserId(bookId, user.getId());
		if (currentRating.isPresent()) {
			Rating rating = currentRating.get();
			ratingRepo.deleteByBookIdAndUserId(rating.getId().getBookId(), user.getId());
			return new ResponseEntity<String> ("delete success", HttpStatus.NO_CONTENT);
		}
		else {
			return new ResponseEntity<String> ("couldn't find the associate rating", HttpStatus.BAD_REQUEST);
		}
	}
}
