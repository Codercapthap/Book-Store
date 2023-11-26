package bookstore.data;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import bookstore.model.Book;
import jakarta.transaction.Transactional;

public interface BookRepository extends JpaRepository<Book, Integer>{
	@Query("select b from Book b join Favourite f on b.id = f.id.bookId where f.id.userId = ?1 and f.book.deletedAt = null")
	public Page<Book> findAllByDeletedAtIsNullAndUserId(int userId, Pageable Page);
	public Page<Book> findAllBookByCategoryIdAndDeletedAtIsNull(int categoryId, Pageable Page);
	public Page<Book> findAllBookByTitleContainingAndDeletedAtIsNull(String title, Pageable Page);
	public Page<Book> findAllBookByTitleContaining(String title, Pageable Page);
	public Page<Book> findAllBookByDeletedAtIsNull(Pageable Page);
	@Modifying
	@Transactional
	@Query("update Book b set b.deletedAt = ?1 where id = ?2")
	public void deleteBookById(Date date, int id);
	@Modifying
	@Transactional
	@Query("update Book b set b.deletedAt = null where id = ?1")
	public void restoreBookById(int id);
	@Modifying
	@Transactional
	@Query("update Book b set b.deletedAt = ?1 where b.category.id in ?2")
	public void deleteBookByCategoryList(Date date, List<Integer> categoryIdList);
	@Modifying
	@Transactional
	@Query("update Book b set b.deletedAt = null where b.category.id in ?1")
	public void restoreBookByCategoryList(List<Integer> categoryIdList);
}
