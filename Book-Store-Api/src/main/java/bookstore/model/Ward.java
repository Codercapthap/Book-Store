package bookstore.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
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
public class Ward {
	@EmbeddedId
	private WardID id;
//	@Id
//	private String wardName;
	@MapsId("cityID")
//	@Id
	@JoinColumns({
		@JoinColumn(name = "province_name", referencedColumnName = "province_name"),
		@JoinColumn(name = "city_name", referencedColumnName = "city_name")
	})
	@ManyToOne
	@JsonManagedReference
	@JsonIgnore
	@NotNull(message = "city is required")
	private City city;
}
