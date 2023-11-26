package bookstore.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import bookstore.model.City;
import bookstore.model.CityID;

public interface CityRepository extends JpaRepository<City, CityID>{
	@Query("select c from City c where c.province.provinceName = ?1")
	List<City> findAllByProvinceName(String provinceName);
}
