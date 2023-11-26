package bookstore.service;

import java.util.List;

import bookstore.model.Book;
import bookstore.model.Image;
import bookstore.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CartInformationResponse {
	private User user;
	private Book book;
	private List<Image> images;
	private int quantity;
	private float actualPrice;
}
