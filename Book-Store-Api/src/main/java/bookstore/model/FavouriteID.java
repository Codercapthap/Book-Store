package bookstore.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FavouriteID implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int bookId;
	private int userId;
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
	    if (obj == null)
	        return false;
	    if (getClass() != obj.getClass())
	        return false;
	    FavouriteID other = (FavouriteID) obj;
	    if (other.getBookId() == bookId && other.getUserId() == userId) {
	    	return true;
	    }
		return false;
	}
}
