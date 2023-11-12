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
			const navs = ['nav-menu', 'drawer-menu'];

			navs.forEach((nav) => {
				retryQuerySelector(`#main-header .${nav}`, (element) => {
					element.innerHTML = `<h5 class='helloUser'>Olá, ${currentUser.name}!</h5> <a class='logout' href="/">Sair</a> <a href="/admin" onclick="route()">Seus eventos</a>`;
				});
			});

			navs.forEach((nav) => {
				retryQuerySelector(`#main-header .${nav} .logout`, (element) => {
					element.addEventListener('click', () => {
						localStorage.removeItem('currentUser');
					});
				});
			});
		}
	}
}

const uiController = new UIController();
export { UIController, uiController };
