package bookstore.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import bookstore.model.Ward;
import bookstore.model.WardID;

public interface WardRepository extends JpaRepository<Ward, WardID> {
	@Query("select w from Ward w where w.city.province.provinceName = ?1 and w.city.id.cityName = ?2")
	List<Ward> findAllByProvinceNameAndCityName(String provinceName, String cityName);
	@Query("select w from Ward w where w.city.province.provinceName = ?1 and w.city.id.cityName = ?2 and w.id.wardName = ?3")
	Ward findByProvinceNameAndCityNameAndWardName(String provinceName, String cityName, String wardName);
}
