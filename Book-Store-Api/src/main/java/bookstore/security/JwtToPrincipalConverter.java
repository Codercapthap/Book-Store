package bookstore.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.auth0.jwt.interfaces.DecodedJWT;

import bookstore.data.AccountRepository;
import bookstore.model.UserPrincipal;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtToPrincipalConverter {
	private final AccountRepository userRepo;
	public UserPrincipal convert(DecodedJWT jwt) {
		return UserPrincipal.builder().user(userRepo.findById(Integer.parseInt(jwt.getSubject())).getUser())
					.username(jwt.getClaim("u").asString())
					.role(jwt.getClaim("r").asString())
					.authorities(extractAuthoritiesFromClaim(jwt))
					.build();
	}

	private Collection<
			? extends GrantedAuthority> extractAuthoritiesFromClaim(
					DecodedJWT jwt) {
		var claim = jwt.getClaim("u");
		if (claim.isNull() || claim.isMissing()) return List.of();
		var user = userRepo.findByUsername(claim.asString());
		return List.of(new SimpleGrantedAuthority(user.getRole()));
	}
}
