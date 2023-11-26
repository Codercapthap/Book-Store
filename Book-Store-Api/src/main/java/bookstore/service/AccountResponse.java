package bookstore.service;

import bookstore.model.User;
import bookstore.model.UserPrincipal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class AccountResponse {
//	private int id;
//	private String name;
//	private String avatar;
//	private String email;
//	private String phone;
//	private boolean gender;
//	private Date birthday;
//	private String username;
//	private String role;
//	private String status;
//	private String password;
//	private Date deletedAt;
	private User user;
	private UserPrincipal detail;
}