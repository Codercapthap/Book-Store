package bookstore.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import bookstore.data.CategoryRepository;
import bookstore.data.CustomCategoryRepository;
import bookstore.data.SubCategoryRepository;
import bookstore.model.Category;
import bookstore.model.SubCategory;
import bookstore.service.CategoryAdminResponse;
import bookstore.service.CategoryResponse;
import lombok.RequiredArgsConstructor;

@RestController
@Controller
@RequestMapping(value = "/category")
@RequiredArgsConstructor
//@CrossOrigin(origins = "*")
public class CategoryController {
	private final CategoryRepository categoryRepo;
	private final SubCategoryRepository subCategoryRepo;
	private final CustomCategoryRepository customSubCategoryRepo;
	private String folderPath = this.getClass().getResource("/static/images/").getFile();
	
//	@GetMapping()
//	public List<CategoryResponse> getAllCategory() {
//		List<Category> cates = categoryRepo.findAllCategoryByDeletedAtIsNull();
//		List<CategoryResponse> cateResponses = new ArrayList<CategoryResponse>();
//		cates.forEach(cate -> {
//			if (!cate.getSubCategory().isEmpty()) {
//				cateResponses.add(new CategoryResponse(cate, null));
//				cate.getSubCategory().forEach(subCate -> {
//					cateResponses.add(new CategoryResponse(subCate.getCategory(), subCate.getParent()));
//				});
//			} 
//		});
//		return cateResponses;
//	}
	
	@GetMapping("/admin")
	public List<CategoryAdminResponse> getAllCategoryForAdmin() {
		List<Category> cates = categoryRepo.findAll();
//		List<Category> cates2 = new ArrayList<Category>();
		List<CategoryAdminResponse> cateResponses = new ArrayList<CategoryAdminResponse>();
		cates.forEach(cate -> {
//			if (cate.getParent() == null) {
//				cateResponses.add(new CategoryResponse(cate, null));
//				cates2.add(cate);
//				cate.getSubCategory().forEach(subCate -> {
			if (cate.getParent() != null) {
				cateResponses.add(new CategoryAdminResponse(cate, cate.getParent().getParent()));				
			}
			
			else cateResponses.add(new CategoryAdminResponse(cate, null));
//
//					cates2.add(subCate.getCategory());
//				});
//			} 
		});
//		List<Category> cates3 = cates.stream()
//				  .filter(cate -> !cates2.contains(cate))
//				  .collect(Collectors.toList());
//		
//		cates3.forEach(cateRemain -> {
//			cateResponses.add(new CategoryResponse(cateRemain, null));
//		});
		return cateResponses;
	}
	
	@GetMapping("/sub/{id}")
	public Category getSubCategoryById(@PathVariable int id) {
		Optional<Category> categoryOptional = categoryRepo.findById(id);
		if (categoryOptional.isPresent()) {
			return categoryOptional.get();
		} else return null;
	}
	
	@GetMapping("/admin/parent")
	public List<Category> getParentCategoryAdmin() {
		List<Category> cates = categoryRepo.findAllByParentIsNull();
		return cates;
	}
	
	@GetMapping("/parent")
	public List<CategoryResponse> getParentCategory() {
		List<Category> cates = categoryRepo.findAllByParentIsNullAndDeletedAtIsNull();
		List<CategoryResponse> response = new ArrayList<CategoryResponse>();
		cates.forEach(cate -> {
			List<Category> subCates = new ArrayList<Category>();
			cate.getSubCategory().forEach(subCate -> {
				subCates.add(subCate.getCategory());
			});
			CategoryResponse cateRes = new CategoryResponse(cate, subCates);
			response.add(cateRes);
		});
		return response;
	}
	
	@GetMapping("/sub")
	public List<Category> getSubCategory() {
		List<Category> cates = categoryRepo.findAllByParentIsNotNullAndDeletedAtIsNull();
		return cates;
	}
	
//	@PostMapping()
//	public ResponseEntity<String> createCategory(@RequestBody Map<String, String> request) {
//		Category category = new Category();
//		if (request.containsKey("name")) {
//			category.setName(request.get("name"));
//		}
//		Category savedCategory = categoryRepo.save(category);
//		if (request.containsKey("parent")) {
//			int parentId = Integer.parseInt(request.get("parent"));
//			Optional<Category> parent = categoryRepo.findById(parentId);
//			if (parent.isPresent()) {
//				SubCategory subCate = new SubCategory();
//				subCate.setParent(parent.get());
//				subCate.setCategory(savedCategory);
//				subCategoryRepo.save(subCate);
//			}
//		}
//		return new ResponseEntity<String> ("create success", HttpStatus.CREATED);
//	}
	
	@PostMapping()
    public ResponseEntity<Category> createCategory(@RequestParam("name") String name,
                                                    @RequestParam("image") MultipartFile image,
                                                    @RequestParam("parent") String parent) throws IOException {
        Category category = new Category();
        category.setName(name);
        
        File directory = new File(folderPath);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        Path path = Paths.get(directory.getAbsolutePath() + "/" + LocalDate.now() + image.getOriginalFilename());
        Files.copy(image.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

        category.setImage("/images/" + path.getFileName());

        Category savedCategory = categoryRepo.save(category);
        System.out.println(parent);
        if (!parent.isBlank()) {
			int parentId = Integer.parseInt(parent);
			Optional<Category> parentCate = categoryRepo.findById(parentId);
			if (parentCate.isPresent()) {
				SubCategory subCate = new SubCategory();
				subCate.setParent(parentCate.get());
				subCate.setCategory(savedCategory);
				subCategoryRepo.save(subCate);
			}
		}

        return ResponseEntity.ok(category);
    }
	
	@PutMapping("/{id}")
	public ResponseEntity<String> updateCategory(@PathVariable int id, 
			@RequestBody Map<String, String> request) {
		Optional<Category> categoryOptional = categoryRepo.findById(id);
		if (categoryOptional.isPresent()) {
			Category category = categoryOptional.get();
			if (request.containsKey("name")) {
				category.setName(request.get("name"));
			}
			if (request.containsKey("parent")) {
				Optional<SubCategory> subCateOptional = subCategoryRepo.findById(id);
				Optional<Category> parent = categoryRepo.findById(Integer.parseInt(request.get("parent")));
				if (parent.isPresent()) {
					if (subCateOptional.isPresent()) {
						SubCategory subCate = subCateOptional.get();
						subCate.setParent(parent.get());
						subCategoryRepo.save(subCate);
					} else {
						SubCategory subCate = new SubCategory();
						subCate.setCategory(category);
						subCate.setParent(parent.get());
						subCategoryRepo.save(subCate);
					}
				}
			}
			categoryRepo.save(category);
		}
		return new ResponseEntity<String> ("update success", HttpStatus.OK);
	}
	
	@PatchMapping("/image/{cateId}")
	public ResponseEntity<String> addAvatar(@RequestParam MultipartFile image, @PathVariable int cateId) throws IOException {
		Optional<Category> categoryOptional = categoryRepo.findById(cateId);
		if (categoryOptional.isPresent()) {
			Category category = categoryOptional.get();

			String imagePath = category.getImage().substring(7);
			File deleteFile = new File(folderPath + imagePath);
			deleteFile.delete();
			
			File directory = new File(folderPath);
			if (!directory.exists()) {
				directory.mkdirs();
			}

	        Path path = Paths.get(directory.getAbsolutePath() + "/" + LocalDate.now() + image.getOriginalFilename());
			Files.copy(image.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
			
			category.setImage("/images/" + path.getFileName());
			categoryRepo.save(category);
			return new ResponseEntity<String> ("update success", HttpStatus.OK);
		} else {
			return new ResponseEntity<String> ("couldn't find category", HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteCategory(@PathVariable int id) {
		Optional<Category> categoryOptional = categoryRepo.findById(id);
		if (categoryOptional.isPresent()) {
//			categoryRepo.deleteById(Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant()), id);
//			categoryRepo.deleteSubCategoryById(Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant()), id);
			Date now = Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant());
//			customSubCategoryRepo.deleteById(now, id);
			customSubCategoryRepo.deleteById(now, id);
			return new ResponseEntity<String> ("delete success", HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<String> ("couldn't find category", HttpStatus.BAD_REQUEST);
	}
	
	@PatchMapping("/restore/{id}")
	public ResponseEntity<String> restoreCategory(@PathVariable int id) {
		Optional<Category> categoryOptional = categoryRepo.findById(id);
		if (categoryOptional.isPresent()) {
//			categoryRepo.deleteById(id);
//			categoryRepo.deleteSubCategoryById(Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant()), id);
			customSubCategoryRepo.restoreById(id);
			return new ResponseEntity<String> ("restore success", HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<String> ("couldn't find category", HttpStatus.BAD_REQUEST);
	}
}
