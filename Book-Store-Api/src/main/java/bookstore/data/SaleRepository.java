package bookstore.data;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import bookstore.model.Sale;
import jakarta.transaction.Transactional;

@Repository
@EnableJpaRepositories
public interface SaleRepository extends JpaRepository<Sale, Integer>{
	@Query("select s from Sale s")
	Page<Sale> findAll(PageRequest page);
	Page<Sale> findAllByEndDateIsNotNull(PageRequest page);
	List<Sale> findByEndDateIsNull();
	@Modifying
	@Transactional
	@Query("update Sale set endDate = ?1 where id = ?2")
	void inActivateSaleById(Date date, int id);
}
