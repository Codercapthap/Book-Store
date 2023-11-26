package bookstore.data;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import bookstore.model.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {
	public Page<Order> findAllByUserId(int userId, Pageable Page);
}
