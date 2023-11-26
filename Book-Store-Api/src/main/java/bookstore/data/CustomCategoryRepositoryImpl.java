package bookstore.data;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CustomCategoryRepositoryImpl implements CustomCategoryRepository{
	private final CategoryRepository categoryRepo;
	private final SubCategoryRepository subCategoryRepo;
	private final BookRepository bookRepo;
    @PersistenceContext
    private EntityManager entityManager;

	@Override
	@Transactional
	public void deleteById(Date deletedAt, int id) {
		// TODO Auto-generated method stub
		List<Integer> subCategoryList = subCategoryRepo.findByParent(id);
		System.out.println(subCategoryList);
		bookRepo.deleteBookByCategoryList(deletedAt, subCategoryList);
		categoryRepo.deleteSubCategoryById(deletedAt, id);
		categoryRepo.deleteCategoryById(deletedAt, id);
	}
	
	@Override
	@Transactional
	public void restoreById(int id) {
		// TODO Auto-generated method stub
		List<Integer> subCategoryList = subCategoryRepo.findByParent(id);
		bookRepo.restoreBookByCategoryList(subCategoryList);
		categoryRepo.restoreSubCategoryById(id);
		categoryRepo.restoreCategoryById(id);
	}
}
