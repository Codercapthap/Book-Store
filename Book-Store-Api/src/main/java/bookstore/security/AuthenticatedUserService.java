package bookstore.security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import bookstore.model.UserPrincipal;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticatedUserService {
	  public boolean hasId(int id){          
	      UserPrincipal user =  (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	      return user.getUser().getId() == id;
	   }
}
