import { EventsRepository } from '../repositories/eventsRepository.js';

export class EventsController {
	constructor() {
		this.eventsRepository = new EventsRepository();
	}

	async getEvents() {
		return this.eventsRepository.getAll();
	}

	async getEvent(id) {
		return this.eventsRepository.get(id);
	}

	async createEvent(event) {
		return this.eventsRepository.add(event);
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
		return this.eventsRepository.getCategories();
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
		const id = Math.floor(Math.random() * 1000000);

		const newEvent = {
			id,
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
			window.location.href = '/events';
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

	initNewEventForm() {
		const form = document.getElementById('new-event-form');

		form.addEventListener('submit', (event) => {
			this.handleFormSubmission(event, form);
		});

		this.createClassificationOptions();
		this.createCategoryOptions();

		const imageInput = document.querySelector(
			'#new-event-form .image-container input[type=file]#image'
		);

		imageInput.addEventListener('change', () => {
			this.previewImage();
		});
	}
}
