import { CategoryRepository } from '../repositories/categoriesRepository';

class CategoryController {
	constructor() {
		this.categoryRepository = new CategoryRepository();
	}

	getAllCategories() {
		return this.categoryRepository.getAllCategories();
	}

	getCategoryById(id) {
		return this.categoryRepository.getCategoryById(id);
	}

	addCategory(category) {
		return this.categoryRepository.addCategory(category);
	}

	updateCategory(category) {
		return this.categoryRepository.updateCategory(category);
	}

	deleteCategory(id) {
		return this.categoryRepository.deleteCategory(id);
	}
}

export { CategoryController };
