package bookstore.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Favourite{
	@EmbeddedId
	private FavouriteID id = new FavouriteID();
	@MapsId("bookId")
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name="book_id", nullable = false)
	@JsonManagedReference
//	@JsonIgnore
	@NotNull(message = "book is required")
	private Book book;
	@MapsId("userId")
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name="user_id", nullable = false)
	@JsonManagedReference
	@NotNull(message = "user is required")
	private User user; 
	
//	private transient boolean persisted;
//
//    @Override
//    @Transient
//    public boolean isNew() {
//        return !persisted;
//    }
//
//    @PostPersist
//    @PostLoad
//    public void setPersisted() {
//        this.persisted = true;
//    }
}
