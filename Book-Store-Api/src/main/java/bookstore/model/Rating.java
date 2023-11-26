package bookstore.model;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

import org.hibernate.validator.constraints.Range;

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
public class Rating {
	@EmbeddedId
	private RatingID id = new RatingID();
	
	@MapsId("bookId")
	@ManyToOne
	@JoinColumn(name = "book_id")
	@JsonManagedReference
	@NotNull(message = "book is required")
	private Book book;
	
	@MapsId("userId")
	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonManagedReference
	@NotNull(message = "user is required")
	private User user;
	
	@NotNull(message = "comment is required")
	private String comment;
	@NotNull(message = "star is required")
	@Range(min = 1, max = 5, message = "number of star must be between 1 and 5")
	private int stars;
	private Date createdAt = Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant());
}
