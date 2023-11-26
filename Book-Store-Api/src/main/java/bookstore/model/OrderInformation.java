package bookstore.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@Entity
public class OrderInformation {
	@EmbeddedId
	private OrderInformationID id = new OrderInformationID();
	
	@MapsId("bookId")
	@ManyToOne
	@JoinColumn(name = "book_id")
//	@JsonBackReference
	@NotNull(message = "book is required")
//	@JsonInclude
	@JsonManagedReference
	private Book book;
	
	@MapsId("orderId")
	@ManyToOne
	@JoinColumn(name = "order_id")
	@JsonBackReference
	@NotNull(message = "order is required")
	@JsonIgnore
	private Order order;
	
	@NotNull(message = "price is required")
	@Min(value = 0, message = "price must be larger than 0")
	private double price;
	@NotNull(message = "actual price is required")
	@Min(value = 0, message = "actual price must be larger than 0")
	private double actualPrice;
	
	@NotNull(message = "quantity is required")
	@Min(value = 1, message = "quantity must be at least 1")
	private int quantity;
}
