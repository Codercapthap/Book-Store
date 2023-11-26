package bookstore.model;

import java.io.Serializable;

import org.hibernate.annotations.Columns;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class WardID implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Columns(columns ={
		@Column(name = "province_name"),
		@Column(name = "city_name")
	})
	private CityID cityId;
	private String wardName;
}
