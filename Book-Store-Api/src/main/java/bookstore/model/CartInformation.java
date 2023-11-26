package bookstore.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Setter
@Getter
public class CartInformation {
	@EmbeddedId
	private CartInformationID id = new CartInformationID();
	@MapsId("userId")
	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonManagedReference
	@NotNull(message = "user must not be null")
	private User user;
	
	@MapsId("bookId")
	@ManyToOne
	@JoinColumn(name = "book_id")
	@JsonManagedReference
	@NotNull(message = "book must not be null")
	private Book book;
	
	private int quantity;
}
