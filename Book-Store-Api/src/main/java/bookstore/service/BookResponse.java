package bookstore.service;

import java.util.Date;
import java.util.List;

import bookstore.model.Category;
import bookstore.model.Image;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookResponse {
	private int id;
	private Category category = new Category();
	private String title;
	private String author;
	private float price;
	private float actualPrice;
	private String description;
	private List<Image> images;
	private Date deletedAt;
	private double averageRating;
	private int totalRate;
}
