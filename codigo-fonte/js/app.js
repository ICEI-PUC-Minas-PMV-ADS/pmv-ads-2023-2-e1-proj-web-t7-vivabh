import { handleLocation, routes } from './router';
import { createInitialData } from './initialData';
import { uiController } from './controllers/uiController';
import { eventsController } from './controllers/eventsController';

handleLocation();

window.onload = () => {
	createInitialData();
};

const IsNewEventPage = () => {
	return (
		window.location.pathname ===
		Object.keys(routes).find((key) => routes[key] === '/pages/events/new.html')
	);
};

const IsHomePage = () => {
	return (
		window.location.pathname ===
		Object.keys(routes).find((key) => routes[key] === '/pages/home.html')
	);
};

const IsEventsPage = () => {
	return (
		window.location.pathname ===
		Object.keys(routes).find(
			(key) => routes[key] === '/pages/events/index.html'
		)
	);
};

document.addEventListener('DOMContentLoaded', () => {
	if (IsNewEventPage()) {
		eventsController.initNewEventForm();
	}

	if (IsEventsPage()) {
		uiController.populateFilterCategoriesSelect();
		eventsController.handleFilterChange();
		eventsController.populateEventsSearchContainer();
		eventsController.filterEventsWithQueryParams();
	}

	if (IsHomePage()) {
		uiController.populateCategoriesNav();
	}

	uiController.initDrawer();
});
