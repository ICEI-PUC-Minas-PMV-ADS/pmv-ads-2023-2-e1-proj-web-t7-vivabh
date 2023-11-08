import { Event } from '../model/Event.js';
import { v4 as uuidv4 } from 'uuid';

export class EventsRepository {
	constructor() {
		this.events = JSON.parse(localStorage.getItem('events')) || [];
	}

	saveEvents() {
		localStorage.setItem('events', JSON.stringify(this.events));
	}

	add(event) {
		const id = uuidv4();

		const newEvent = new Event(
			id,
			event.name,
			event.description,
			event.date,
			event.time,
			event.address,
			event.image,
			event.category,
			event.classification,
			event.quantity
		);

		if (!newEvent.validateRequiredFields()) return false;

		this.events.push(newEvent);
		this.saveEvents();
		return newEvent;
	}

	getAll() {
		return this.events;
	}

	get(id) {
		return this.events.find((event) => event.getId() === id);
	}

	update(id, updatedEvent) {
		const eventToUpdate = this.get(id);
		const fieldsToUpdate = [
			'name',
			'description',
			'date',
			'time',
			'address',
			'image',
			'category',
			'classification',
			'quantity',
		];

		if (eventToUpdate) {
			for (const field of fieldsToUpdate) {
				eventToUpdate[field] = updatedEvent[field] || eventToUpdate[field];
			}

			this.saveEvents();
		}
	}

	delete(id) {
		this.events = this.events.filter((event) => event.getId() !== id);
		this.saveEvents();
	}

	getCategories() {
		return ['Shows', 'Festas', 'Esporte', 'Cultural'];
	}

	getClassifications() {
		return ['Livre', '10 anos', '12 anos', '14 anos', '16 anos', '18 anos'];
	}
}

const eventsRepository = new EventsRepository();

export { eventsRepository };
