package bookstore.data;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import bookstore.model.Image;
import jakarta.transaction.Transactional;

public interface ImageRepository extends CrudRepository<Image, Integer> {
	@Modifying
	@Transactional
	@Query("delete from Image where id = ?1")
	@Override
	void deleteById(Integer id);
}
