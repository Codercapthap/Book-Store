package bookstore.model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PreRemove;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Getter
@Setter
@Transactional
public class Book {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
	@JoinColumn(name = "category_id")
	@JsonManagedReference
	private SubCategory category = new SubCategory();
	
	@NotBlank(message = "title is required")
	private String title;
	@NotBlank(message = "author is required")
	private String author;
	@NotNull(message = "price is required")
	@Min(value = 0, message = "price must be greater than 0")
	private float price;
	private String description;
	private Date deletedAt;
	
	@JsonBackReference
//	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "book")
	private List<Favourite> favourites;
	
	@JsonInclude
	@JsonManagedReference
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "book")
	private List<Image> images;

//	@JsonManagedReference
	@JsonBackReference
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "book")
	private List<OrderInformation> orderInfos;
	
	@JsonIgnore
	@JsonManagedReference
	@OneToMany(mappedBy = "book")
	private List<Rating> ratings;
	
	@PreRemove
	public void deleteBook() {
		this.deletedAt = new Date();
	}
}
