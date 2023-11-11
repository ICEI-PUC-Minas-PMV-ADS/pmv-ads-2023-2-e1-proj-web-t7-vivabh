import { formatDate, retryQuerySelector } from '../helpers.js';
import { categoryRepository } from '../repositories/categoriesRepository.js';
import { eventsRepository } from '../repositories/eventsRepository.js';
import { userRepository } from '../repositories/usersRepository.js';

export class EventsController {
	constructor() {
		this.eventsRepository = eventsRepository;
		this.categoriesRepository = categoryRepository;
		this.userRepository = userRepository;
	}

	async getEvents() {
		return this.eventsRepository.getAll();
	}

	async getByCategory(category) {
		return this.eventsRepository.getByCategory(category);
	}

	async getEventsByOwner(owner) {
		return this.eventsRepository.getByOwner(owner);
	}

	async getEvent(id) {
		return this.eventsRepository.get(id);
	}

	async createEvent(event) {
		const category = this.categoriesRepository.getByName(event.category);
		const owner = this.userRepository.getCurrentUser();
		let newEvent = {
			...event,
			category: category.name,
			owner,
		};

		newEvent = this.eventsRepository.add(newEvent);
		if (!newEvent) return false;

		return newEvent;
	}

	async updateEvent(event) {
		this.eventsRepository.update(event.id, event);
		return event;
	}

	async deleteEvent(id) {
		this.eventsRepository.delete(id);
		return id;
	}

	getCategories() {
		const categories = this.categoriesRepository.getAll();
		return categories.map((category) => category.name);
	}

	getClassifications() {
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

	async handleFormSubmission(event, form) {
		event.preventDefault();

		const getInputValue = (name) =>
			document.querySelector(`input[name="${name}"]`).value;
		const getSelectValue = (name) =>
			document.querySelector(`select[name="${name}"]`).value;

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
			alert('Evento criado com sucesso!');
			localStorage.removeItem('preview-image');
			window.location.href = '/admin';
			return;
		}

		alert('Preencha todos os campos!');
	}

	createOptions(selectName, data) {
		const options = data.map(
			(item) => `<option value="${item}">${item}</option>`
		);
		retryQuerySelector(`select[name="${selectName}"]`, (select) => {
			select.innerHTML += options.join('');
		});
	}

	async initNewEventForm() {
		retryQuerySelector('#new-event-form', async (form) => {
			form.addEventListener('submit', async (event) => {
				await this.handleFormSubmission(event, form);
			});
		});

		retryQuerySelector(
			'#new-event-form .image-container input[type=file]#image',
			(el) => {
				el.addEventListener('change', () => {
					this.previewImage();
				});
			}
		);

		const classifications = this.getClassifications();
		const categories = this.getCategories();

		this.createOptions('classification', classifications);
		this.createOptions('category', categories);
	}

	createEditButton(event) {
		const editButton = document.createElement('button');
		editButton.className = 'edit';
		editButton.innerHTML = `<img class='button' src='assets/icons/edit.svg' ='Editar evento' />`;
		editButton.addEventListener('click', () => {
			window.location.href = `/editar-evento?id=${event.id}`;
		});
		return editButton;
	}

	createDeleteButton(event) {
		const deleteButton = document.createElement('button');
		deleteButton.className = 'delete';
		deleteButton.innerHTML = `
      <img class='button' src='assets/icons/trash.svg' alt='Deletar evento' />
    `;
		deleteButton.addEventListener('click', async () => {
			const confirm = window.confirm(
				'Você tem certeza que deseja deletar este evento?'
			);
			if (!confirm) return;
			await this.deleteEvent(event.id);
			this.populateEventsAdminPanel();
		});
		return deleteButton;
	}

	async populateEventsContainer(element, events, isAdminPanel = false) {
		const fragment = document.createDocumentFragment();
		events.forEach((event) => {
			const { month, day } = formatDate(event.date);
			const eventContainer = document.createElement('div');
			eventContainer.className = 'event';

			eventContainer.innerHTML = `
        <div class='image-container'>
          <img loading="lazy" src='${event.image}' alt='${event.name}' />
        </div>
        <div class='info'>
          <div class='date'>
            <p class='month'>${month}</p>
            <p class='day'>${day}</p>
          </div>
          <div class='content'>
            <h2>${event.name}</h2>
            <p class='description'>descricao ${event.description}</p>
          </div>
        </div>
      `;

			if (isAdminPanel) {
				const buttonsContainer = document.createElement('div');
				buttonsContainer.className = 'buttons-container';
				buttonsContainer.appendChild(this.createEditButton(event));
				buttonsContainer.appendChild(this.createDeleteButton(event));
				eventContainer.appendChild(buttonsContainer);
			}

			fragment.appendChild(eventContainer);
		});

		element.innerHTML = '';
		element.appendChild(fragment);
	}

	async populateEventsAdminPanel() {
		const events = await this.getEventsByOwner(
			this.userRepository.getCurrentUser()
		);
		retryQuerySelector('#admin-panel .events-cards', (element) => {
			this.populateEventsContainer(element, events, true);
		});
	}

	async populateEventsSearchContainer(filteredEvents = null) {
		retryQuerySelector('#eventsSearchContainer', async (element) => {
			const events = filteredEvents || (await this.getEvents());
			this.populateEventsContainer(element, events);
		});
	}

	async getFilteredEvents(options) {
		if (!options) return [];
		let events = [];

		if (options.category) {
			events = await this.getByCategory(options.category);
		}

		if (options.classification) {
			const allEvents = await this.getEvents();
			events = allEvents.filter(
				(event) => event.classification === options.classification
			);
		}

		return events;
	}

	handleFilterChange() {
		retryQuerySelector('#filterCategory', (element) => {
			element.addEventListener('change', async () => {
				const category = element.value;
				const options = {
					category,
				};
				const events = await this.getFilteredEvents(options);
				this.populateEventsSearchContainer(events);
			});
		});

		retryQuerySelector('#filterClassification', (element) => {
			element.addEventListener('change', async () => {
				const classification = element.value;
				const options = {
					classification,
				};
				const events = await this.getFilteredEvents(options);
				this.populateEventsSearchContainer(events);
			});
		});
	}

	async filterEventsWithQueryParams() {
		const currentURL = window.location.href;
		const urlParams = new URLSearchParams(currentURL.split('?')[1]);
		const category = urlParams.get('categoria');

		if (category) {
			retryQuerySelector('#filterCategory', (element) => {
				element.value = category;
			});

			const events = await this.getFilteredEvents({ category });
			this.populateEventsSearchContainer(events);
		}
	}
}

const eventsController = new EventsController();

export { eventsController };
