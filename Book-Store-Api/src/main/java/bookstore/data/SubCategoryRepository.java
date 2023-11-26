package bookstore.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import bookstore.model.Category;
import bookstore.model.SubCategory;

public interface SubCategoryRepository extends JpaRepository<SubCategory, Integer> {
	@Query("select distinct c.id from Category c join SubCategory s on c.id = s.id where s.parent.id = ?1")
	List<Integer> findByParent(int parentId);
	@Query("select c from Category c join SubCategory s on c.id = s.parent.id where s.category.id = ?1")
	Category findBySubCategory(int categoryId);
}
