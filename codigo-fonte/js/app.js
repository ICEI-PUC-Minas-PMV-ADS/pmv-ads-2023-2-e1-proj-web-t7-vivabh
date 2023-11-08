import { createInitialData } from './initialData';
import { uiController } from './controllers/uiController';
import { eventsController } from './controllers/eventsController';

export const routes = {
	'/': '/views/home.html',
	'/login': '/views/login.html',
	'/register': '/views/register.html',
	'/eventos/novo': '/views/events/new.html',
	'/eventos': '/views/events/index.html',
};

const callControllerByRoute = (pathName) => {
	if (pathName === '/eventos/novo') {
		eventsController.initNewEventForm();
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
		uiController.initDrawer();
	});
};

initializeApp();
