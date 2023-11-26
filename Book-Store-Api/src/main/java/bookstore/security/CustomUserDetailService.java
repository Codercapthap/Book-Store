package bookstore.security;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import bookstore.data.AccountRepository;
import bookstore.model.UserPrincipal;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
	private final AccountRepository userRepo;

	@Override
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException {
		var user = userRepo.findByUsername(username);
		var a = List.of(new SimpleGrantedAuthority(user.getRole()));
		return UserPrincipal.builder()
					.user(user.getUser())
					.username(user.getUsername())
					.authorities(a)
					.role(user.getRole())
					.password(user.getPassword())
					.status(user.getStatus())
					.build();
//		List.of(new SimpleGrantedAuthority(user.getRole()))
	
	}

}
