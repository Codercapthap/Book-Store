package bookstore.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@Entity
public class Province {
	@Id
	@Column(name = "province_name")
	@NotNull(message = "province name is required")
	private String provinceName;
	@NotNull(message = "weight is required")
	private int weight;
	@NotBlank(message = "zip is required")
	private String zip;
	
	@JsonBackReference
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "province")
	private List<City> cities;
}
