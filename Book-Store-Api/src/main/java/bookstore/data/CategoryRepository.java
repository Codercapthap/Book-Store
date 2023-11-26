package bookstore.data;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import bookstore.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
	Page<Category> findAll(Pageable page);
	List<Category> findAllCategoryByDeletedAtIsNull();
	List<Category> findAllByParentIsNullAndDeletedAtIsNull();
	List<Category> findAllByParentIsNotNullAndDeletedAtIsNull();
	List<Category> findAllByParentIsNull();
	List<Category> findAllByParentIsNotNull();
	@Modifying
	@Query("update Category set deletedAt = ?1 where id = ?2")
	void deleteCategoryById(Date deletedAt, int id);
	@Modifying
	@Query("update Category set deletedAt = ?1 where id in (select distinct c.id from Category c join SubCategory s on c.id = s.id where s.parent.id = ?2)")
	void deleteSubCategoryById(Date deletedAt, int id);
	@Modifying
	@Query("update Category set deletedAt = null where id = ?1")
	void restoreCategoryById(int id);
	@Modifying
	@Query("update Category set deletedAt = null where id in (select distinct c.id from Category c join SubCategory s on c.id = s.id where s.parent.id = ?1)")
	void restoreSubCategoryById(int id);
}
