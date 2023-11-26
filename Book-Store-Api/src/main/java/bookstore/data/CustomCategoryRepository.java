package bookstore.data;

import java.util.Date;

import org.springframework.stereotype.Repository;

@Repository
public interface CustomCategoryRepository {
	void deleteById(Date deletedAt, int id);
	void restoreById(int id);
}
