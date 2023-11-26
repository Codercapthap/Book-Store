package bookstore.data;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import bookstore.model.Rating;
import bookstore.model.RatingID;
import jakarta.transaction.Transactional;

public interface RatingRepository extends JpaRepository<Rating, RatingID> {
	public Page<Rating> findAllByBookId(PageRequest page, int bookId);
	public List<Rating> findAllByBookId(int bookId);
	public Optional<Rating> findByBookIdAndUserId(int bookId, int userId);
	@Query("delete from Rating r where r.id.bookId = ?1 and r.id.userId = ?2")
	@Modifying
	@Transactional
	public void deleteByBookIdAndUserId(int bookId, int userId);
}
