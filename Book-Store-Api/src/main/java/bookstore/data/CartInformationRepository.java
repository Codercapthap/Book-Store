package bookstore.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import bookstore.model.CartInformation;
import bookstore.model.CartInformationID;
import jakarta.transaction.Transactional;

public interface CartInformationRepository extends JpaRepository<CartInformation, CartInformationID>{
	public List<CartInformation> findAllByUserId(int userId);
	public CartInformation findByUserIdAndBookId(int userId, int bookId);
	@Query("select c from CartInformation c where c.id.userId = ?1 and c.id.bookId in (?2)")
	public List<CartInformation> findCartInformationByUserIdAndBookId(int userId, List<Integer> cartInfoIds);
	@Modifying
	@Transactional
	@Query("delete from CartInformation c where c.id.userId=?1 and c.id.bookId=?2")
	public int removeCartInformationByUserIdAndBookId(int userId, int bookId);
}
