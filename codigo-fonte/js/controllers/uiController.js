import { retryQuerySelector } from '../helpers';
import { categoryRepository } from '../repositories/categoriesRepository';

class UIController {
	constructor() {
		this.drawer = null;
		this.hamburgerIcon = null;
		this.close = null;
	}

	initDrawer() {
		this.hamburgerIcon = document.getElementById('hamburger-icon');
		this.drawer = document.querySelector('.drawer');
		this.close = document.querySelector('.close');

		this.close.addEventListener('click', () => {
			this.toggleDrawer();
		});

		this.hamburgerIcon.addEventListener('click', () => {
			this.toggleDrawer();
		});
	}

	toggleDrawer() {
		this.drawer.classList.toggle('active');
	}

	populateCategoriesNav() {
		const categories = categoryRepository.getAll();
		retryQuerySelector('#categoriesNav', (element) => {
			const navItems = categories
				.map(
					(category) => `
			<li>
				<a href="/eventos?categoria=${category.name}">
				 <img src="${category.icon}" alt="${category.name}" />
				</a>
			</li>
		`
				)
				.join('');
			element.innerHTML += navItems;
		});
	}

	populateFilterCategoriesSelect() {
		const categories = categoryRepository.getAll();
		const categoriesOptions = categories.map(
			(category) => `<option value="${category.name}">${category.name}</option>`
		);
		const options = [
			...categoriesOptions,
			'<option disabled selected>Categoria</option>',
		].join('');

		retryQuerySelector('#filterCategory', (element) => {
			element.innerHTML = options;
		});
	}
}

const uiController = new UIController();
export { UIController, uiController };
