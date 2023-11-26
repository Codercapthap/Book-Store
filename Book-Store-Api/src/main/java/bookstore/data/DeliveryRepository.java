package bookstore.data;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import bookstore.model.Delivery;
import jakarta.transaction.Transactional;

public interface DeliveryRepository extends JpaRepository<Delivery, Integer>{
	@Modifying
	@Transactional
	@Query("update Delivery d set d.deletedAt = ?1 where d.id = ?2")
	void deleteById(Date date, int id);
	@Modifying
	@Transactional
	@Query("update Delivery d set d.deletedAt = null where d.id = ?1")
	void restoreById(int id);
	List<Delivery> findAllByDeletedAtIsNull();
}
