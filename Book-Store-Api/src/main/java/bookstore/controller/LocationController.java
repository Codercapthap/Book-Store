package bookstore.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bookstore.data.CityRepository;
import bookstore.data.ProvinceRepository;
import bookstore.data.WardRepository;
import bookstore.model.City;
import bookstore.model.Province;
import bookstore.model.Ward;
import bookstore.service.CityResponse;
import bookstore.service.WardResponse;
import lombok.RequiredArgsConstructor;

@RequestMapping("/location")
@RestController
@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "http://127.0.0.1:5173")
public class LocationController {
	private final ProvinceRepository provinceRepo;
	private final CityRepository cityRepo;
	private final WardRepository wardRepo;
//	private final LocationRepository locationRepo;
	@GetMapping("/province")
	public List<Province> getAllProvince() {
		List<Province> provinceList = provinceRepo.findAll();
		return provinceList;
	}
	
	@GetMapping("/city/{provinceName}")
	public List<CityResponse> getAllCityByProvinceName(@PathVariable String provinceName) {
		List<City> cityList = cityRepo.findAllByProvinceName(provinceName);
		List<CityResponse> response = new ArrayList<CityResponse>();
		cityList.forEach(city -> {
			response.add(new CityResponse(city.getId().getCityName(), city.getId().getProvinceName()));
		});
		return response;
	}
	
	@GetMapping("/ward/{provinceName}/{cityName}")
	public List<WardResponse> getAllWardByCity(@PathVariable String provinceName, @PathVariable String cityName){
		List<Ward> wardList = wardRepo.findAllByProvinceNameAndCityName(provinceName, cityName);
		List<WardResponse> response = new ArrayList<WardResponse>();
		wardList.forEach(ward -> {
			response.add(new WardResponse(ward.getId().getWardName(), ward.getId().getCityId().getCityName(), ward.getId().getCityId().getProvinceName()));
		});
		return response;
	}
	
//	@GetMapping()
//	public List<Location> getAllLocationByUserId() {
//		UserPrincipal userPrincipal =  (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//		User user = userPrincipal.getUser();
//		List<Location> locationList = locationRepo.findAllByUserId(user.getId());
//		return locationList;
//	}
//	
//	@PostMapping()
//	public ResponseEntity<String> createLocation(@RequestBody Map<String, String> request) {
//		Location location = new Location();
//		UserPrincipal userPrincipal =  (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//		User user = userPrincipal.getUser();
//		location.setUser(user);
//		if (request.containsKey("wardName") && request.containsKey("cityName") && request.containsKey("provinceName") && request.containsKey("detail")){
//			Ward ward = wardRepo.findByProvinceNameAndCityNameAndWardName(request.get("provinceName"), request.get("cityName"), request.get("wardName"));
//			location.setWard(ward);
//			location.setDetail(request.get("detail"));
//		}
//		locationRepo.save(location);
//		return new ResponseEntity<String> ("create success", HttpStatus.CREATED);
//	}
//	
//	@DeleteMapping("/{id}")
//	public ResponseEntity<String> deleteLocation(@PathVariable int id) {
//		locationRepo.deleteById(id);
//		return new ResponseEntity<String>("delete success", HttpStatus.NO_CONTENT);
//	}
}
