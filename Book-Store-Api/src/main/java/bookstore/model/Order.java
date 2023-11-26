package bookstore.model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity(name = "Orders")
@Getter
@Setter
public class Order {
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JsonBackReference
	@JoinColumn(name = "user_id")
	private User user;
	
	@OneToOne
	@JoinColumn(name = "delivery_id")
	private Delivery delivery;
	
	@NotNull(message = "date is required")
	private Date orderDate;
	@NotNull(message = "location is required")
	@NotBlank(message = "location is required")
	private String location;
	@NotNull(message = "delivery price is required")
	@Min(value = 0, message = "delivery price must be larger than 0")
	private double deliveryPrice;
	@Min(value = 0, message = "total price must be larger than 0")
	private double totalPrice;
	
	@JsonManagedReference
	@OneToMany(mappedBy = "order")
	@JsonInclude
	private List<OrderInformation> orderInfo;
}
