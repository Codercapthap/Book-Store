package bookstore.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
public class OrderInformationID implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int bookId;
	private int orderId;
}
