package bookstore.model;


import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
@Entity(name = "Users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@NotBlank(message="name is required")
	private String name;
//	private String avatar = "/images/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";
	@NotBlank(message="email is required")
	@Pattern(regexp = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@" 
        + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$", message = "email is not valid")
	private String email;
	@NotBlank(message="phone number is required")
	@Pattern(regexp = "^(03|05|07|08|09)+([0-9]{8})$", message="phone number is not valid")
	private String phone;
	private boolean gender;
	private Date birthday;
	@JsonIgnore
	@OneToOne(cascade = CascadeType.ALL, mappedBy = "user")
    private UserPrincipal userDetail;
	@JsonBackReference
//	@JsonInclude
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "user")
	private List<Favourite> favourites;
//	@JsonBackReference
//	@JsonInclude
//	@OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
//	private List<Location> locations;
	
	@JsonBackReference
	@JsonIgnore
	@OneToMany(mappedBy = "user")
	private List<Rating> ratings;
}
