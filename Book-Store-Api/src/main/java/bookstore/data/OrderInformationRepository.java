package bookstore.data;

import org.springframework.data.jpa.repository.JpaRepository;

import bookstore.model.OrderInformation;
import bookstore.model.OrderInformationID;

public interface OrderInformationRepository extends JpaRepository<OrderInformation, OrderInformationID>{

}
