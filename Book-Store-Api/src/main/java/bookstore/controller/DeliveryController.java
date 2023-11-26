package bookstore.controller;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bookstore.data.DeliveryRepository;
import bookstore.data.ProvinceRepository;
import bookstore.model.Delivery;
import bookstore.model.Province;
import bookstore.service.DeliveryResponse;
import lombok.RequiredArgsConstructor;

@RestController
@Controller
@RequiredArgsConstructor
@RequestMapping("/delivery")
@CrossOrigin(origins = "http://127.0.0.1:5173")
public class DeliveryController {
	private final DeliveryRepository deliveryRepo;
	private final ProvinceRepository provinceRepo;

	@GetMapping
	public List<Delivery> getAllDelivery() {
		List<Delivery> deliveryList = deliveryRepo
				.findAll();
		return deliveryList;
	}

	@GetMapping("/price/{provinceName}")
	public ResponseEntity<
			List<DeliveryResponse>> getDeliveryPrice(
					@PathVariable String provinceName) {
		List<Delivery> deliveryList = deliveryRepo
				.findAllByDeletedAtIsNull();
		Optional<Province> provinceOptional = provinceRepo
				.findById(provinceName);
		List<DeliveryResponse> response = new ArrayList<
				DeliveryResponse>();
		if (provinceOptional.isPresent()) {
			Province province = provinceOptional.get();
			deliveryList.forEach(delivery -> {
				double price = delivery.getCoefficient()
						* province.getWeight()
						* delivery.getBase()
						+ delivery.getBase();
				DeliveryResponse deliveryResponse = new DeliveryResponse(
						delivery,
						String.format("%.2f", price));
				response.add(deliveryResponse);
			});
		}
		return ResponseEntity.ok(response);
	}

	@PostMapping
	public ResponseEntity<String> createDelivery(
			@RequestBody Map<String, String> request) {
		Delivery delivery = new Delivery();
		if (request.containsKey("method")) {
			delivery.setMethod(request.get("method"));
		}
		if (request.containsKey("base")) {
			delivery.setBase(Math.round(Float
					.parseFloat(request.get("base"))
					* 100.0) / 100.0);
		}
		if (request.containsKey("coefficient")) {
			delivery.setCoefficient(Math.round(Float
					.parseFloat(request.get("coefficient"))
					* 100.0) / 100.0);
		}
		deliveryRepo.save(delivery);
		return new ResponseEntity<String>("create success",
				HttpStatus.CREATED);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteDelivery(
			@PathVariable int id) {
		deliveryRepo.deleteById(Date.from(LocalDate.now()
				.atStartOfDay(ZoneId.systemDefault())
				.toInstant()), id);
		return new ResponseEntity<String>("delete success",
				HttpStatus.NO_CONTENT);
	}

	@PutMapping("/{id}")
	public ResponseEntity<String> updateDelivery(
			@PathVariable int id,
			@RequestBody Map<String, String> request) {
		Optional<Delivery> deliveryOptional = deliveryRepo
				.findById(id);
		if (deliveryOptional.isPresent()) {
			Delivery delivery = deliveryOptional.get();
			if (request.containsKey("method")) {
				delivery.setMethod(request.get("method"));
			}
			if (request.containsKey("coefficient")) {
				delivery.setCoefficient(
						Math.round(Float.parseFloat(
								request.get("coefficient"))
								* 100.0) / 100.0);
			}
			if (request.containsKey("base")) {
				delivery.setBase(
						Math.round(Float.parseFloat(
								request.get("base"))
								* 100.0) / 100.0);
			}
			deliveryRepo.save(delivery);
			return new ResponseEntity<String>(
					"update success", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>(
					"couldn't find the associated delivery",
					HttpStatus.BAD_REQUEST);
		}
	}

	@PatchMapping("/{id}")
	public ResponseEntity<String> restoreDelivery(
			@PathVariable int id) {
		deliveryRepo.restoreById(id);
		return new ResponseEntity<String>("restore success",
				HttpStatus.OK);
	}
}
