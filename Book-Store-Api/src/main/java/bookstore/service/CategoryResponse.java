package bookstore.service;

import java.util.List;

import bookstore.model.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CategoryResponse {
	private Category category;
	private List<Category> subCategory;
}
