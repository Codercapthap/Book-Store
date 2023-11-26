package bookstore.controller;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import bookstore.data.BookRepository;
import bookstore.data.ImageRepository;
import bookstore.model.Book;
import bookstore.model.Image;
import lombok.RequiredArgsConstructor;

@RestController
@Controller
@RequiredArgsConstructor
@RequestMapping("/image")
@CrossOrigin(origins = "http://127.0.0.1:5173")
public class ImageController {
	private final ImageRepository imageRepo;
	private final BookRepository bookRepo;
	private String folderPath = this.getClass().getResource("/static/images/").getFile();
	@PostMapping("/{bookId}")
	public ResponseEntity<String> createImages(@PathVariable int bookId, @RequestParam List<MultipartFile> images) {
		images.forEach(image -> {
			String filePathforDb = LocalDate.now() + image.getOriginalFilename();
			String filePath=folderPath + filePathforDb;
			try {
				image.transferTo(new File(filePath));
				Optional<Book> book = bookRepo.findById(bookId);
				Image imageEntity = new Image();
				imageEntity.setImageLocation("/images/" + filePathforDb);
				imageEntity.setBook(book.get());
				imageRepo.save(imageEntity);
			} catch (IllegalStateException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch(Exception e) {
				e.printStackTrace();
			}
		});
		return new ResponseEntity<String> ("hello", HttpStatus.CREATED);
	}
	
	@DeleteMapping("/{imageId}")
	public ResponseEntity<String> deleteImage(@PathVariable int imageId) {
		Optional<Image> imageOptional = imageRepo.findById(imageId);
		if (imageOptional.isPresent()) {
			Image image = imageOptional.get();
			String imagePath = image.getImageLocation().substring(7);
			File deleteFile = new File(folderPath + imagePath);
			deleteFile.delete();
			imageRepo.deleteById(imageId);
			return new ResponseEntity<String> ("delete success", HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<String> ("couldn't find the image!", HttpStatus.BAD_REQUEST);
		}
	}
}
