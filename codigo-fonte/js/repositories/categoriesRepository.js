import { Category } from '../model/Category.js';
import { v4 as uuidv4 } from 'uuid';

export class CategoryRepository {
	constructor() {
		this.categories = JSON.parse(localStorage.getItem('categories')) || [];
	}

	saveCateogires() {
		localStorage.setItem('categories', JSON.stringify(this.categories));
	}

	add(category) {
		const id = uuidv4();
		const newCategory = new Category(id, category.name, category.icon);

		if (!newCategory.validateRequiredFields()) return false;

		this.categories.push(newCategory);
		this.saveCateogires();
		return newCategory;
	}

	getAll() {
		return this.categories;
	}

	getByName(name) {
		return this.categories.find((category) => category.name === name);
	}

	get(id) {
		return this.categories.find((category) => category.getId() === id);
	}

	update(id, updatedCategory) {
		const categoryToUpdate = this.get(id);
		const fieldsToUpdate = ['name', 'icon'];

		if (categoryToUpdate) {
			for (const field of fieldsToUpdate) {
				categoryToUpdate[field] =
					updatedCategory[field] || categoryToUpdate[field];
			}

			this.saveCateogires();
		}
	}

	delete(id) {
		this.categories = this.categories.filter(
			(category) => category.getId() !== id
		);
		this.saveCateogires();
	}
}
const categoryRepository = new CategoryRepository();

export { categoryRepository };
