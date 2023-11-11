import { createInitialData } from './initialData';
import { uiController } from './controllers/uiController';
import { eventsController } from './controllers/eventsController';
import { userController } from './controllers/userController';

export const routes = {
	'/': '/views/home.html',
	'/login': '/views/login.html',
	'/criar-conta': '/views/register.html',
	'/admin/eventos/novo': '/views/admin/new-event.html',
	'/admin/eventos/editar': '/views/admin/edit-event.html',
	'/eventos': '/views/events/index.html',
	'/admin': '/views/admin/index.html',
};

const protectedRoutes = [
	'/admin/eventos/novo',
	'/admin',
	'/admin/eventos/editar',
];

const isAuthenticated = () => {
	return localStorage.getItem('currentUser');
};

const callControllerByRoute = (pathName) => {
	if (protectedRoutes.includes(pathName) && !isAuthenticated()) {
		window.location = '/login';
		return;
	}

	if (pathName === '/admin') {
		eventsController.populateEventsAdminPanel();
	}

	if (pathName === '/admin/eventos/novo') {
		eventsController.initNewEventForm();
	}

	if (pathName === '/criar-conta') {
		userController.initForm();
	}

	if (pathName === '/eventos') {
		uiController.populateFilterCategoriesSelect();
		eventsController.handleFilterChange();
		eventsController.populateEventsSearchContainer();
		eventsController.filterEventsWithQueryParams();
	}

	if (pathName === '/') {
		uiController.populateCategoriesNav();
	}

	if (pathName === '/login') {
		userController.initLoginForm();
	}
};

export const handleLocation = async () => {
	const path = window.location.pathname;
	const route = routes[path];
	if (!route) {
		window.location = '/';
	}
	callControllerByRoute(path);
	const html = await fetch(route).then((data) => data.text());
	document.getElementById('app').innerHTML = html;
};

export const route = (event) => {
	event = event || window.event;
	event.preventDefault();
	window.history.pushState(
		{},
		'',
		event.target.href || event.currentTarget.href
	);
	handleLocation();
};

const initializeApp = () => {
	handleLocation();

	window.onload = () => {
		createInitialData();
	};

	document.addEventListener('DOMContentLoaded', () => {
		uiController.headerChangeWhenLogin();
		uiController.initDrawer();
	});
};

initializeApp();
