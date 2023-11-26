package bookstore.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import bookstore.data.AccountRepository;
import bookstore.data.UserRepository;
import bookstore.model.User;
import bookstore.model.UserPrincipal;
import bookstore.service.AccountResponse;
import bookstore.service.UserResponse;
import lombok.RequiredArgsConstructor;

@Controller
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://127.0.0.1:5173")
public class UserController {
	private final UserRepository userRepo;
	private final AccountRepository accountRepository;
//	private final AuthenticatedUserService  authenticatedUserService;
	private final PasswordEncoder passwordEncoder;
//	private String folderPath = this.getClass().getResource("/static/images/").getFile();

	@GetMapping("/current")
	public UserResponse userById() {
		UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder
				.getContext().getAuthentication()
				.getPrincipal();
		User user = userPrincipal.getUser();
		UserResponse response = new UserResponse(user,
				user.getUserDetail().getRole());
		return response;
	}

	@GetMapping("/count")
	public long getUserCount() {
		return userRepo.count();
	}

	@GetMapping("/{id}")
	public Optional<User> userById(
			@PathVariable("id") int id) {
		return userRepo.findById(id);
	}

	@GetMapping()
	public Iterable<User> getUsers(
			@RequestParam Map<String, String> params) {
		boolean type = params.get("type")
				.equalsIgnoreCase("1");
		PageRequest page = PageRequest.of(0, 12,
				Sort.unsorted());
		if (params.get("sort").equals("name")) {
			page = PageRequest.of(0, 12,
					type ? Sort.by("name").ascending()
							: Sort.by("name").descending());
		}
		if (params.get("sort").equals("birthday")) {
			page = PageRequest.of(0, 12, type
					? Sort.by("birthday").ascending()
					: Sort.by("birthday").descending());
		}
		if (params.containsKey("gender")) {
			boolean gender = false;
			if (params.get("gender")
					.equalsIgnoreCase("1")) {
				gender = true;
			}
			if (params.containsKey("query")) {
				return userRepo
						.findByGenderAndNameContainingOrGenderAndEmailContaining(
								gender, params.get("query"),
								gender, params.get("query"),
								page);
			}
			return userRepo.findByGender(gender, page);
		} else {
			if (params.containsKey("query")) {
				return userRepo.findByNameContainingOrEmailContaining(
						params.get("query"),
						params.get("query"), page);
			}
			return userRepo.findAll(page);
		}
	}

	@GetMapping("/account")
	public Page<AccountResponse> getAllAccount(
			@RequestParam Map<String, String> params) {
		PageRequest page = PageRequest.of(0, 12);
		if (params.containsKey("page")) {
			page = page.withPage(
					Integer.parseInt(params.get("page")));
		}
		Page<User> listUser;
		List<AccountResponse> listAccountResponse = new ArrayList<
				AccountResponse>();
		if (params.containsKey("sort")) {
			if (params.get("sort").equals("named")) {
				page = page.withSort(
						Sort.by("name").descending());
			}
			if (params.get("sort").equals("namea")) {
				page = page.withSort(
						Sort.by("name").ascending());
			}
			if (params.get("sort").equals("birthdayd")) {
				page = page.withSort(
						Sort.by("birthday").descending());
			}
			if (params.get("sort").equals("birthdaya")) {
				page = page.withSort(
						Sort.by("birthday").ascending());
			}
		}
		if (params.containsKey("gender")) {
			if (params.containsKey("query")) {
				listUser = userRepo
						.findByGenderAndNameContainingOrGenderAndEmailContaining(
								Boolean.parseBoolean(params
										.get("gender")),
								params.get("query"),
								Boolean.parseBoolean(params
										.get("gender")),
								params.get("query"), page);
			} else {
				listUser = userRepo.findByGender(
						Boolean.parseBoolean(
								params.get("gender")),
						page);
			}
		} else {
			if (params.containsKey("query")) {
				listUser = userRepo
						.findByNameContainingOrEmailContaining(
								params.get("query"),
								params.get("query"), page);
			} else {
				listUser = userRepo.findAll(page);
			}
		}
		listUser.forEach(user -> {
			AccountResponse accountResponse = new AccountResponse(
					user, user.getUserDetail());
			listAccountResponse.add(accountResponse);
		});
		Page<AccountResponse> pageResponse = new PageImpl<>(
				listAccountResponse, page,
				listUser.getTotalElements());
		return pageResponse;
	}

//	@GetMapping("/account")
//	public List<AccountResponse> getAccounts(@RequestParam Map<String, String> params)
//	{
//		if (params.containsKey("name") ) {
//			boolean name = Boolean.parseBoolean(params.get("name"));
//			PageRequest page = PageRequest.of(0, 12, name ? Sort.by("name").ascending() : Sort.by("name").descending());			
//			Page<User> users = userRepo.findAll(page);
//			List<AccountResponse> response = new ArrayList<AccountResponse>();
//			users.forEach(user -> {
//				response.add(new AccountResponse(user, user.getUserDetail()));
//			});
//			return response;
//		}
//		if (params.containsKey("birthday") ) {
//			boolean birthday = Boolean.parseBoolean(params.get("birthday"));
//			PageRequest page = PageRequest.of(0, 12, birthday ? Sort.by("birthday").ascending() : Sort.by("birthday").descending());			
//			Page<User> users = userRepo.findAll(page);
//			List<AccountResponse> response  = new ArrayList<AccountResponse>();
//			users.forEach(user -> {
//				response.add(new AccountResponse(user, user.getUserDetail()));
//			});
//			return response;
//		}
//		if (params.containsKey("gender") ) {
//			boolean gender = false;
//			if (params.get("gender").equalsIgnoreCase("1")) {
//				gender = true;
//			}
//			PageRequest page = PageRequest.of(0, 12);
//			Page<User> users = userRepo.findByGender(gender, page);
//			List<AccountResponse> response = new ArrayList<AccountResponse>();
//			users.forEach(user -> {
//				response.add(new AccountResponse(user, user.getUserDetail()));
//			});
//			return response;
//		}
//		List<AccountResponse> response = new ArrayList<AccountResponse>();
//		PageRequest page = PageRequest.of(0, 12);
//		Page<User> users = userRepo.findAll(page);
//		users.forEach(user -> {
//			response.add(new AccountResponse(user, user.getUserDetail()));
//		});
//		return response;
//	}

//	@PatchMapping("/avatar")
//	public ResponseEntity<String> addAvatar(@RequestParam MultipartFile image) {
//		String filePathforDb = LocalDate.now() + image.getOriginalFilename();
//		String filePath=folderPath + filePathforDb;
//		UserPrincipal userPrincipal =  (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//		User user = userPrincipal.getUser();
//		if (!user.getAvatar().equals("/images/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg")) {
//			String imagePath = user.getAvatar().substring(7);
//			File deleteFile = new File(folderPath + imagePath);
//			deleteFile.delete();
//		}
//		try {
//			image.transferTo(new File(filePath));
//			user.setAvatar("/images/" + filePathforDb);
//			userRepo.save(user);
//		} catch (IllegalStateException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} catch(Exception e) {
//			e.printStackTrace();
//		}
//		return new ResponseEntity<String>("add avatar success", HttpStatus.OK);
//	}

	@PutMapping("/update")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<User> updateUser(
			@RequestBody Map<String, String> request)
			throws ParseException {
		UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder
				.getContext().getAuthentication()
				.getPrincipal();
		User user = userPrincipal.getUser();
		User newUser = new User();
		newUser.setBirthday(
				new SimpleDateFormat("yyyy-MM-dd")
						.parse(request.get("birthday")));
		newUser.setEmail(request.get("email"));
		newUser.setGender(Boolean
				.parseBoolean(request.get("gender")));
		newUser.setName(request.get("name"));
		newUser.setPhone(request.get("phone"));
		newUser.setId(user.getId());
		User savedUser = userRepo.save(newUser);
		return ResponseEntity.ok(savedUser);
	}

	@SuppressWarnings("unchecked")
	@DeleteMapping("/delete/{id}")
	@PreAuthorize("@authenticatedUserService.hasId(#id)")
	public ResponseEntity<Map<String, String>> deleteUser(
			@PathVariable("id") int id) {
		accountRepository.deleteById(Date.from(LocalDate
				.now().atStartOfDay(ZoneId.systemDefault())
				.toInstant()), id);
		return new ResponseEntity<Map<String, String>>(
				(Map<String, String>) new HashMap<>()
						.put("message", "delete success!"),
				HttpStatus.NO_CONTENT);
	}

	@SuppressWarnings("unchecked")
	@PatchMapping("/block/{id}")
	public ResponseEntity<Map<String, String>> blockUser(
			@PathVariable("id") int id) {
		UserPrincipal account = accountRepository
				.findById(id);
		if (account.getStatus().equals("blocked")) {
			accountRepository.unblockById(id);
			return new ResponseEntity<Map<String, String>>(
					(Map<String, String>) new HashMap<>()
							.put("message",
									"unblock success!"),
					HttpStatus.OK);
		}
		accountRepository.blockById(Date.from(LocalDate
				.now().atStartOfDay(ZoneId.systemDefault())
				.toInstant()), id);
		return new ResponseEntity<Map<String, String>>(
				(Map<String, String>) new HashMap<>()
						.put("message", "block success!"),
				HttpStatus.NO_CONTENT);
	}

	@PatchMapping("/password")
	public ResponseEntity<String> updatePasswordUser(
			@RequestBody Map<String, String> requestBody) {
		UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder
				.getContext().getAuthentication()
				.getPrincipal();
		User user = userPrincipal.getUser();
		UserPrincipal account = accountRepository
				.findById(user.getId());
		if (passwordEncoder.matches(
				requestBody.get("oldPassword"),
				account.getPassword())) {
			account.setPassword(passwordEncoder.encode(
					requestBody.get("newPassword")));
			accountRepository.save(account);
			return new ResponseEntity<String>(
					"update success!", HttpStatus.OK);
		}
		return new ResponseEntity<String>(
				"old password is wrong!",
				HttpStatus.BAD_REQUEST);
	}
}
