//package bookstore.model;
//
//import com.fasterxml.jackson.annotation.JsonManagedReference;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.JoinColumns;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.OneToOne;
//import jakarta.validation.constraints.NotBlank;
//import jakarta.validation.constraints.NotNull;
//import lombok.Data;
//import lombok.Getter;
//import lombok.Setter;
//
//@Entity
//@Data
//@Setter
//@Getter
//public class Location {
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private int id;
//	
//	@ManyToOne
//	@JsonManagedReference
//	@JoinColumn(name = "user_id", referencedColumnName = "id")
//	@NotNull(message = "user is required")
//	private User user;
//	
//	@OneToOne
//	@JoinColumns(value = {
//		@JoinColumn(name = "province_name", referencedColumnName = "province_name"),
//		@JoinColumn(name = "city_name", referencedColumnName = "city_name"),
//		@JoinColumn(name = "ward_name", referencedColumnName = "wardName")
//	})
//	@NotNull(message = "ward is required")
//	private Ward ward;
//
//	@NotBlank(message = "detail is required")
//	private String detail;
//}
