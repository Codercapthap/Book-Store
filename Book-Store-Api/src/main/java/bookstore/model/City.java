package bookstore.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Setter
@Getter
public class City {
	@EmbeddedId
	private CityID id = new CityID();
//	@Id
//	private String cityName;
	
	@MapsId("provinceName")
//	@Id
	@ManyToOne
	@JoinColumn(name="province_name", referencedColumnName = "province_name")
	@JsonManagedReference
	@JsonIgnore
	@NotNull(message = "province is required")
	private Province province;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "city")
	@JsonBackReference
	private List<Ward> wards;
}
