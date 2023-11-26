package bookstore.data;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import bookstore.model.UserPrincipal;

public interface AccountRepository extends JpaRepository<UserPrincipal, Integer>{
	UserPrincipal findByUsername(String username);
	UserPrincipal findById(int id);
	@Modifying
	@Transactional
	@Query("update Account a set a.status = 'deleted', a.deletedAt = ?1 where id = ?2")
	int deleteById(Date date,int id);
	@Modifying
	@Transactional
	@Query("update Account a set a.status = 'blocked', a.deletedAt = ?1 where id = ?2")
	int blockById(Date date,int id);
	@Modifying
	@Transactional
	@Query("update Account a set a.status = 'active', a.deletedAt = null where id = ?1")
	int unblockById(int id);
//	Page<UserPrincipal> findAll(Pageable page);
//	Page<AccountResponse> findByGender(boolean gender, Pageable page);
}