package bookstore.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import bookstore.model.Favourite;
import bookstore.model.FavouriteID;
import jakarta.transaction.Transactional;

public interface FavouriteRepository extends JpaRepository<Favourite, FavouriteID>{
	List<Favourite> findAllByUserId(int userId);
	@Modifying
	@Transactional
	@Query("delete from Favourite f where f.id.userId=?1 and f.id.bookId=?2")
	int removeFavouriteByUserIdAndBookId(int userId, int bookId);
	Favourite findByUserIdAndBookId(int userId, int bookId);
}
