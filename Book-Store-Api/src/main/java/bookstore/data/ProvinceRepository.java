package bookstore.data;

import org.springframework.data.jpa.repository.JpaRepository;

import bookstore.model.Province;

public interface ProvinceRepository extends JpaRepository<Province, String>{

}
