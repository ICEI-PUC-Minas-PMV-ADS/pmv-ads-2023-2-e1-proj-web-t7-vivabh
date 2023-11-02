import { handleLocation } from './router';
import { UIController } from './controllers/uiController';
import { EventsController } from './controllers/eventsController';

const eventsController = new EventsController();
handleLocation();
const uiController = new UIController();

document.addEventListener('DOMContentLoaded', () => {
	if (window.location.pathname === '/events/new') {
		setTimeout(() => {
			eventsController.initNewEventForm();
		}, 2000);
	}
	uiController.initDrawer();
});
