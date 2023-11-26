package bookstore.service;

import bookstore.model.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class CategoryAdminResponse {
		private Category category;
		private Category parent;
}
