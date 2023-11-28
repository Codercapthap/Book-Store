package bookstore.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
	private final JwtAuthenticationFilter jwtAuthenticationFilter;
	private final CustomUserDetailService customUserDetailService;

	@Bean
	public SecurityFilterChain applicationSecurity(
			HttpSecurity http) throws Exception {
		http.addFilterBefore(jwtAuthenticationFilter,
				UsernamePasswordAuthenticationFilter.class);

		http.sessionManagement(management -> management
				.sessionCreationPolicy(
						SessionCreationPolicy.STATELESS))
				.formLogin(formLogin -> formLogin.disable())
				.securityMatcher("/**")
				.cors(Customizer.withDefaults())
				.csrf(csrf -> csrf.disable())
				.authorizeHttpRequests(registry -> {
					try {
						registry.requestMatchers(
								HttpMethod.GET, "/", "/book",
								"/count", "book/category/*",
								"/category/sub/{id}",
								"book/{id}",
								"category/{categoryId}",
								"category/sub", "/images/*",
								"category/parent",
								"/rating/{bookId}",
								"/rating/stat/{bookId}", "/sale")
								.permitAll().requestMatchers(HttpMethod.POST, 
								"/auth/login",
								"/auth/register").permitAll()
								.requestMatchers(
										HttpMethod.POST,
										"/book",
										"/category",
										"/delivery",
										"/image/{bookId}", "/sale")
								.hasAuthority("ADMIN")
								.requestMatchers(
										HttpMethod.GET,
										"book/admin",
										"category/admin",
										"category/admin/parent", "/sale/admin", "/user", "/user/account")
								.hasAuthority("ADMIN")
								.requestMatchers(
										HttpMethod.PUT,
										"/book/{id}",
										"/category/{id}",
										"/delivery/{id}", "/sale/{id}")
								.hasAuthority("ADMIN")
								.requestMatchers(
										HttpMethod.DELETE,
										"/book/{id}",
										"/category/{id}",
										"/delivery/{id}",
										"/image/{bookId}", "/sale/{id}")
								.hasAuthority("ADMIN")
								.requestMatchers(
										HttpMethod.PATCH,
										"/book/{id}",
										"/category/image/{id}",
										"/category/restore/{id}",
										"/delivery/{id}", "/user/block/{id}")
								.hasAuthority("ADMIN")
								.anyRequest()
								.authenticated();
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}

				});
		return http.build();

	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationManager authenticationManager(
			HttpSecurity http) throws Exception {
		return http
				.getSharedObject(
						AuthenticationManagerBuilder.class)
				.userDetailsService(customUserDetailService)
				.passwordEncoder(passwordEncoder()).and()
				.build();
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(
					CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins(
						"http://127.0.0.1:5173", "http://localhost:5173");
			}
		};
	}

}
