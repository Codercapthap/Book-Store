package bookstore.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bookstore.data.AccountRepository;
import bookstore.data.UserRepository;
import bookstore.model.User;
import bookstore.model.UserPrincipal;
import bookstore.security.CustomUserDetailService;
import bookstore.security.JwtIssuer;
import bookstore.service.LoginRequest;
import bookstore.service.LoginResponse;
import bookstore.service.RegisterRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@CrossOrigin(origins = "http://127.0.0.1:5173")
public class AuthController {
	private final JwtIssuer jwtIssuer;
	private final AuthenticationManager authenticationManager;
	private final CustomUserDetailService customUserDetailService;
	private final AccountRepository accountRepo;
	private final UserRepository userRepo;
	private final PasswordEncoder passwordEncoder;
	@PostMapping("/login")
	public LoginResponse Login(@RequestBody @Validated LoginRequest request) {
		var user = customUserDetailService.loadUserByUsername(request.getUsername());
		var a = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword(), user.getAuthorities());
		var authentication = authenticationManager.authenticate(a);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		var principal = (UserPrincipal)authentication.getPrincipal();
		var role = principal.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList().get(0);;
		var token = jwtIssuer.issue(principal.getUser().getId(), principal.getUsername(), role);
		return LoginResponse.builder().accessToken(token).build();
	}
	
	@PostMapping("/register")
	public ResponseEntity<Map<String, String>> Register(@RequestBody @Valid RegisterRequest request) {
        Map<String, String> message = new HashMap<>();
		if (accountRepo.findByUsername(request.getUsername()) != null) {
			message.put("message", "Username is existed!");
			return new ResponseEntity<Map<String, String>>(message, HttpStatus.BAD_REQUEST);
		}
		if (userRepo.findByEmail(request.getEmail()) != null) {
			message.put("message", "Email is existed!");
			return new ResponseEntity<Map<String, String>>(message, HttpStatus.BAD_REQUEST);
		}
		if (userRepo.findByPhone(request.getPhone()) != null) {
			message.put("message", "Phone Number is existed!");
			return new ResponseEntity<Map<String, String>>(message, HttpStatus.BAD_REQUEST);
		}
		User user = new User();
		user.setName(request.getName());
//		user.setBirthday(request.getBirthday());
		user.setEmail(request.getEmail());
//		user.setGender(request.isGender());
		user.setPhone(request.getPhone());
		User savedUser = userRepo.save(user);
		UserPrincipal principal = new UserPrincipal();
		principal.setUser(savedUser);
		principal.setPassword(passwordEncoder.encode(request.getPassword()));
		principal.setUsername(request.getUsername());
		accountRepo.save(principal);
		message.put("message", "register success!");
		return new ResponseEntity<Map<String, String>>(message, HttpStatus.CREATED);
	}
	
	@GetMapping("/logout")
	public String Logout(HttpServletRequest request, HttpServletResponse response) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth != null) {
			new SecurityContextLogoutHandler().logout(request, response, auth);
		}
		return "logout success!";
	}
}
