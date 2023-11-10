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
			<li class='category'>
				<a href="/eventos?categoria=${category.name}" onclick="route()">
				 <img src="${category.icon}" alt="${category.name}" />
				<h3>${category.name}</h3>
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

	headerChangeWhenLogin() {
		const currentUser = JSON.parse(localStorage.getItem('currentUser'));

		if (currentUser) {
			retryQuerySelector('#main-header .nav-menu', (element) => {
				element.innerHTML = `<h5>Olá, ${currentUser.name}!</h5> <a href="/admin" onclick="route()">Seus eventos</a>`;
			});
			retryQuerySelector('#main-header .drawer-menu', (element) => {
				element.innerHTML = `<h5>Olá, ${currentUser.name}!</h5> <a href="/admin" onclick="route()">Seus eventos</a>`;
			});
		}
	}
}

const uiController = new UIController();
export { UIController, uiController };
