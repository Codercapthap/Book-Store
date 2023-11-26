package bookstore.security;

import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import lombok.RequiredArgsConstructor;


@Component
@RequiredArgsConstructor
public class JwtIssuer {
	private final JwtProperties properties;
	public String issue(long userId, String username, String role) {
		return JWT.create()
				.withSubject(String.valueOf(userId))
				.withClaim("u", username)
				.withClaim("r", role)
				.sign(Algorithm.HMAC256(properties.getSecretKey()));
	}
}
