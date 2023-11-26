package bookstore.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartInformationID implements Serializable {/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int userId;
	private int bookId;
}
