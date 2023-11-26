package bookstore;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path="/", produces="application/json")
@CrossOrigin(origins="http://localhost:8080")
@RequiredArgsConstructor
public class HomeController {
	@GetMapping("/")
	public String home() {
		return "Welcome to bookstore api, author: Nguyen Bach Khiem";
	}
	
	@GetMapping("/secure")
	public String secure() {
		return "this is secure api";
	}
	
	@GetMapping("/secure/admin")
	public String admin(Authentication authentication) {
		return "this is admin api";
	}
}
