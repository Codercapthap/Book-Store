package bookstore.service;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginResponse {
	private final String accessToken;
}
