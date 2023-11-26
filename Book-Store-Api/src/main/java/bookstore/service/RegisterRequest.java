package bookstore.service;

import java.util.Date;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RegisterRequest {
	@NotBlank(message="name is required")
	private String name;
	private String username;
	private String email;
	private String phone;
	private boolean gender;
	private Date birthday;
	@Size(min = 8, message = "password must be at least 8 character")
	private String password;
}
