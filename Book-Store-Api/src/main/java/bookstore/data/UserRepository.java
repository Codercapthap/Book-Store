package bookstore.data;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import bookstore.model.User;

public interface UserRepository extends CrudRepository<User, Integer>{
	User findByEmail(String email);
	User findByPhone(String phone);
	Page<User> findAll(Pageable page);
	Page<User> findByGender(boolean gender, Pageable page);
	Page<User> findByGenderAndNameContainingOrGenderAndEmailContaining(boolean gender, String name, boolean genderr, String email, Pageable page);
	Page<User> findByNameContainingOrEmailContaining(String name, String email, Pageable page);
}
