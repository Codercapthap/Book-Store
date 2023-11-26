package bookstore.controller;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bookstore.data.CategoryRepository;
import bookstore.data.SaleRepository;
import bookstore.model.Category;
import bookstore.model.Sale;
import lombok.RequiredArgsConstructor;

@RestController
@Controller
@RequiredArgsConstructor
@RequestMapping("/sale")
@CrossOrigin(origins = "http://127.0.0.1:5173")
public class SaleController {
	private final SaleRepository saleRepo;
	private final CategoryRepository cateRepo;

	@GetMapping()
	public List<Sale> getAllSale(
			@RequestParam Map<String, String> params) {
		return saleRepo.findByEndDateIsNull();
	}
	
	@GetMapping("/admin")
	public Page<Sale> getAllSaleAdmin(
			@RequestParam Map<String, String> params) {
		PageRequest page = PageRequest.of(0, 12,
				Sort.by("endDate").ascending());

		if (params.containsKey("page")) {
			page = page.withPage(Integer.parseInt(params.get("page")));
		}
		return saleRepo.findAll(page);
	}

	@PostMapping
	public ResponseEntity<String> createSale(
			@RequestBody Map<String, String> request) {
		List<Sale> currentSale = saleRepo
				.findByEndDateIsNull();
		if (currentSale.isEmpty()) {

			if (request.containsKey("percent")
					&& request.containsKey("category")) {
				Sale sale = new Sale();
				Optional<Category> category = cateRepo
						.findById(Integer.parseInt(
								request.get("category")));
				if (category.isPresent()) {
					sale.setCategory(category.get());
				}
				sale.setSalePercent(Integer
						.parseInt(request.get("percent")));
				saleRepo.save(sale);
				return new ResponseEntity<String>(
						"Create success",
						HttpStatus.CREATED);
			} else {
				return new ResponseEntity<String>(
						"A sale must have percent and category",
						HttpStatus.BAD_REQUEST);
			}
		} else {
			return new ResponseEntity<String>(
					"Only 1 sale can exist in a moment",
					HttpStatus.BAD_REQUEST);

		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<String> updateSale(
			@RequestBody Map<String, String> request,
			@PathVariable int id) {
		Optional<Sale> saleOptional = saleRepo.findById(id);
		if (saleOptional.isPresent()) {
			Sale sale = saleOptional.get();
			if (request.containsKey("percent")) {
				sale.setSalePercent(Integer
						.parseInt(request.get("percent")));
			}
			if (request.containsKey("category")) {
				Optional<Category> category = cateRepo
						.findById(Integer.parseInt(
								request.get("category")));
				if (category.isPresent()) {
					sale.setCategory(category.get());
				}
			}
			saleRepo.save(sale);
			return new ResponseEntity<String>(
					"update success", HttpStatus.OK);
		}
		return new ResponseEntity<String>(
				"couldn't find associate sale",
				HttpStatus.BAD_REQUEST);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> inActivateSale(
			@PathVariable int id) {
		saleRepo.inActivateSaleById(Date.from(LocalDate
				.now().atStartOfDay(ZoneId.systemDefault())
				.toInstant()), id);
		return new ResponseEntity<String>(
				"inactivate success",
				HttpStatus.NO_CONTENT);
	}
}
