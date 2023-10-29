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
}

export { UIController };
