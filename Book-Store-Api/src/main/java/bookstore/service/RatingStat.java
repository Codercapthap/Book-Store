package bookstore.service;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
//@NoArgsConstructor
public class RatingStat {
	private Map<Integer, Integer> ratingCount;
	private float averageStar;
	private int totalRate;
}
