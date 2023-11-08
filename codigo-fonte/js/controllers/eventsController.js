import { retryQuerySelector } from '../helpers.js';
import { categoryRepository } from '../repositories/categoriesRepository.js';
import { eventsRepository } from '../repositories/eventsRepository.js';

export class EventsController {
	constructor() {
		this.eventsRepository = eventsRepository;
		this.categoriesRepository = categoryRepository;
	}

	async getEvents() {
		return this.eventsRepository.getAll();
	}

	async getByCategory(category) {
		return this.eventsRepository.getByCategory(category);
	}

	async getEvent(id) {
		return this.eventsRepository.get(id);
	}

	async createEvent(event) {
		const category = this.categoriesRepository.getByName(event.category);

		return this.eventsRepository.add({
			...event,
			category,
		});
	}

	async updateEvent(event) {
		this.eventsRepository.update(event.id, event);
		return event;
	}

	async deleteEvent(id) {
		this.eventsRepository.delete(id);
		return id;
	}

	async getCategories() {
		const categories = this.categoriesRepository.getAll();
		return categories.map((category) => category.name);
	}

	async getClassifications() {
		return this.eventsRepository.getClassifications();
	}

	previewImage() {
		const fileInput = document.querySelector(
			'#new-event-form .image-container input[type=file]#image'
		);
		const imagePreview = document.querySelector(
			'#new-event-form .image-container #image-preview'
		);

		if (fileInput.files && fileInput.files[0]) {
			const reader = new FileReader();
			reader.onload = function (e) {
				imagePreview.src = e.target.result;
				localStorage.setItem('preview-image', e.target.result);
			};
			reader.readAsDataURL(fileInput.files[0]);
		}
	}

	async returnImageFromFieldFile() {
		return localStorage.getItem('preview-image');
	}

	async handleFormSubmission(event, _form) {
		event.preventDefault();

		const name = document.querySelector('input[name="name"]').value;
		const description = document.querySelector(
			'textarea[name="description"]'
		).value;
		const date = document.querySelector('input[name="date"]').value;
		const image = await this.returnImageFromFieldFile();
		const category = document.querySelector('select[name="category"]').value;
		const time = document.querySelector('input[name="time"]').value;
		const address = document.querySelector('input[name="address"]').value;
		const quantity = document.querySelector('input[name="quantity"]').value;
		const classification = document.querySelector(
			'select[name="classification"]'
		).value;

		const newEvent = {
			name,
			description,
			date,
			image,
			category,
			time,
			address,
			quantity,
			classification,
		};

		const result = await this.createEvent(newEvent);

		if (result) {
			localStorage.removeItem('preview-image');
			window.location.href = '/eventos';
			return;
		}

		alert('Preencha todos os campos!');
	}

	async createClassificationOptions() {
		const classifications = await this.getClassifications();
		const select = document.querySelector('select[name="classification"]');
		const options = classifications.map((classification) => {
			return `<option value="${classification}">${classification}</option>`;
		});
		select.innerHTML += options.join('');
	}

	async createCategoryOptions() {
		const categories = await this.getCategories();
		const select = document.querySelector('select[name="category"]');
		const options = categories.map((category) => {
			return `<option value="${category}">${category}</option>`;
		});
		select.innerHTML += options.join('');
	}

	async initNewEventForm() {
		retryQuerySelector('#new-event-form', async (element) => {
			element.addEventListener('submit', async (event) => {
				await this.handleFormSubmission(event, element);
			});

			this.createClassificationOptions();
			await this.createCategoryOptions();

			const imageInput = document.querySelector(
				'#new-event-form .image-container input[type=file]#image'
			);

			imageInput.addEventListener('change', () => {
				this.previewImage();
			});
		});
	}

	async populateEventsSearchContainer(filteredEvents = null) {
		retryQuerySelector('#eventsSearchContainer', async (element) => {
			const events = filteredEvents || (await this.getEvents());
			element.innerHTML = '';
			const eventsHtml = events.map((event) => {
				return `
					<div class='event'>

						<div class='image-container'>

							<img src='${event.image}' alt='${event.name}' />

						</div>

						<div class='info'>

							<h2>nome ${event.name}</h2>

							<p>endereco ${event.address}</p>

							<p>data ${event.date}</p>

							<p>hora ${event.time}</p>

							<p>classificacao ${event.classification}</p>

							<p>quantidade ${event.quantity}</p>

							<p>categoria ${event.category.name}</p>

							<p class='description'>descricao ${event.description}</p>

						</div>

					</div>


					`;
			});

			element.innerHTML += eventsHtml.join('');
		});
	}

	async getFilteredEvents(options) {
		if (!options) return;
		let events = [];

		if (options.category) {
			events = (await this.getByCategory(options.category)) || [];
		}

		if (options.classification) {
			events = events.filter(
				(event) => event.classification === options.classification
			);
		}

		return events;
	}

	handleFilterChange() {
		retryQuerySelector('#filterCategory', (element) => {
			element.addEventListener('change', async () => {
				const category = element.value;

				let events = await this.getFilteredEvents({ category });

				this.populateEventsSearchContainer(events);
			});
		});
	}
}

const eventsController = new EventsController();

export { eventsController };
