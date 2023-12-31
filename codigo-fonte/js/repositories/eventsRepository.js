import { Event } from '../model/Event';
import { categoryRepository } from './categoriesRepository';

export class EventsRepository {
	constructor() {
		this.events = JSON.parse(localStorage.getItem('events')) || [];
	}

	saveEvents() {
		localStorage.setItem('events', JSON.stringify(this.events));
	}

	add(event) {
		const newEvent = new Event(
			event.id,
			event.name,
			event.description,
			event.date,
			event.time,
			event.address,
			event.image,
			event.category,
			event.classification,
			event.quantity,
			event.owner
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
		return this.events.find((event) => String(event.id) === id);
	}

	getByName(name) {
		return this.events.find((event) => event.name === name);
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
				if (field === 'category') {
					updatedEvent[field] = categoryRepository.getByName(
						updatedEvent[field]
					);
				}
				eventToUpdate[field] = updatedEvent[field] || eventToUpdate[field];
			}

			this.events = this.events.map((event) =>
				event.id === eventToUpdate.id ? eventToUpdate : event
			);

			this.saveEvents();
		}
	}

	delete(id) {
		this.events = this.events.filter((event) => event.id !== id);
		this.saveEvents();
	}

	getByCategory(categoryName) {
		return this.events.filter((event) => event.category.name === categoryName);
	}
	getClassifications() {
		return ['Livre', '10 anos', '12 anos', '14 anos', '16 anos', '18 anos'];
	}

	getByOwner(owner) {
		return this.events.filter((event) => event.owner.id === owner.id);
	}
}

const eventsRepository = new EventsRepository();

export { eventsRepository };
