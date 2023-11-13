import { formatDate, retryQuerySelector } from '../helpers.js';
import { categoryRepository } from '../repositories/categoriesRepository.js';
import { eventsRepository } from '../repositories/eventsRepository.js';
import { userRepository } from '../repositories/usersRepository.js';

export class EventsController {
	constructor() {
		this.eventsRepository = eventsRepository;
		this.categoriesRepository = categoryRepository;
		this.userRepository = userRepository;
		this.options = {};
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

	getIdFromQueryParams() {
		const currentURL = window.location.href;
		const urlParams = new URLSearchParams(currentURL.split('?')[1]);
		const id = urlParams.get('id');
		return id;
	}

	async updateEvent(event) {
		const id = this.getIdFromQueryParams();
		this.eventsRepository.update(id, event);
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

	previewImage(isEdit = false) {
		const fileInputSelection = isEdit ? '#edit-event-form' : '#new-event-form';
		const fileInput = document.querySelector(
			`${fileInputSelection} .image-container input[type=file]#image`
		);
		const imagePreview = document.querySelector(
			`${fileInputSelection} .image-container #image-preview`
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
			window.location.href = `/admin/eventos/editar?id=${event.id}`;
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

	async getEventFromQueryParams() {
		const currentURL = window.location.href;
		const urlParams = new URLSearchParams(currentURL.split('?')[1]);
		const id = urlParams.get('id');
		const event = await this.getEvent(id);

		if (!event) {
			alert('Evento não encontrado!');
			window.location.href = '/eventos';
			return;
		}

		return event;
	}

	async handleEditFormSubmission(event, _form) {
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

		const updatedEvent = {
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

		const result = await this.updateEvent(updatedEvent);

		if (result) {
			alert('Evento atualizado com sucesso!');
			localStorage.removeItem('preview-image');
			window.location.href = '/admin';
			return;
		}

		alert('Preencha todos os campos!');
	}

	async populateEditForm() {
		const event = await this.getEventFromQueryParams();
		retryQuerySelector('#edit-event-form', (form) => {
			form.addEventListener('submit', async (event) => {
				await this.handleEditFormSubmission(event, form);
			});
		});

		retryQuerySelector(
			'#edit-event-form .image-container input[type=file]#image',
			(el) => {
				el.addEventListener('change', () => {
					this.previewImage(true);
				});
			}
		);

		const classifications = this.getClassifications();

		this.createOptions('classification', classifications);

		retryQuerySelector('#edit-event-form', (form) => {
			form.name.value = event.name;
			form.description.value = event.description;
			form.date.value = event.date;
			form.category.value = event.category.name;
			form.time.value = event.time;
			form.address.value = event.address;
			form.quantity.value = event.quantity;
			form.classification.value = event.classification;
		});

		retryQuerySelector(
			'#edit-event-form .image-container #image-preview',
			(el) => {
				el.src = event.image;
			}
		);
	}

	buildEventDetails(event) {
		const { month, day } = formatDate(event.date);
		return `<div class="card">
		<img class="card-img-top" src="${event.image}" alt="Imagem do evento ${event.name}" />
		<div class="card-body">
			<h5 class="card-title">${event.name}</h5>
			<p class="card-text">Data: ${day} de ${month}</p>
			<p class="card-text">
			 ${event.description}
			</p>
			<p class="card-text">
				<small class="text-muted">Localização: ${event.address}</small>
			</p>
		</div>
	</div>
</div>

`;
	}

	async getSuggestedEventsFromSameCategory(event) {
		const events = await this.getByCategory(event.category.name);
		return events.filter((item) => item.id !== event.id).slice(0, 3);
	}

	shortenText(text, maxLength) {
		if (text.length <= maxLength) {
			return text;
		} else {
			return text.substring(0, maxLength - 3) + '...';
		}
	}

	buildSuggestedEvents(suggestedEvents, element) {
		const suggestedEventsContainer = document.createElement('div');

		suggestedEventsContainer.className = 'custom-container mt-4';

		suggestedEventsContainer.innerHTML = `
					<h2 class="custom-heading">Eventos Sugeridos</h2>
					<div class="custom-row">
					</div>
				`;

		const suggestedEventsRow =
			suggestedEventsContainer.querySelector('.custom-row');

		suggestedEvents.forEach((event) => {
			const { month, day } = formatDate(event.date);
			const anchor = document.createElement('a');
			anchor.href = `/eventos/detalhes?id=${event.id}`;

			const eventContainer = document.createElement('div');
			eventContainer.className = 'custom-col';

			const description = this.shortenText(event.description, 30);

			eventContainer.innerHTML = `
						<div class='custom-card'>
							<img loading="lazy" class='img-custom-card' src='${event.image}' alt='${event.name}' />
							<div class='custom-card-body'>
								<h5 class='custom-card-title'>${event.name}</h5>
								<p class='custom-card-text'>Data: ${day} de ${month}</p>
								<p class='custom-card-text'>
									${description}
								</p>
							</div>
						</div>
					`;

			anchor.appendChild(eventContainer);

			suggestedEventsRow.appendChild(anchor);

			suggestedEventsContainer.appendChild(suggestedEventsRow);

			element.appendChild(suggestedEventsContainer);
		});
	}

	populateEventDetails() {
		retryQuerySelector('#eventDetails', async (element) => {
			element.innerHTML = '';
			const event = await this.getEventFromQueryParams();

			const content = this.buildEventDetails(event);

			element.innerHTML = content;

			const suggestedEvents = await this.getSuggestedEventsFromSameCategory(
				event
			);

			if (suggestedEvents.length === 0) return;

			this.buildSuggestedEvents(suggestedEvents, element);
		});
	}

	async populateEventsContainer(element, events, isAdminPanel = false) {
		const fragment = document.createDocumentFragment();
		events.forEach((event) => {
			const { month, day } = formatDate(event.date);
			const anchor = document.createElement('a');
			anchor.className = 'event-anchor';
			anchor.href = `/eventos/detalhes?id=${event.id}`;

			const eventContainer = document.createElement('div');
			eventContainer.className = 'event';

			const description = this.shortenText(event.description, 65);

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
            <p class='description'> ${description}</p>
          </div>
        </div>

      `;

			if (isAdminPanel) {
				const buttonsContainer = document.createElement('div');
				buttonsContainer.className = 'buttons-container';
				buttonsContainer.appendChild(this.createEditButton(event));
				buttonsContainer.appendChild(this.createDeleteButton(event));
				buttonsContainer.appendChild(this.createSeeDeailsButton(event));
				eventContainer.appendChild(buttonsContainer);
				fragment.appendChild(eventContainer);
				return;
			}

			anchor.appendChild(eventContainer);

			fragment.appendChild(anchor);
		});

		element.innerHTML = '';
		element.appendChild(fragment);
	}

	createSeeDeailsButton(event) {
		const seeDetailsButton = document.createElement('button');
		seeDetailsButton.className = 'see-details';
		seeDetailsButton.innerHTML = `
						<img class='button' src='assets/icons/eye.svg' alt='Ver detalhes do evento' />
					`;
		seeDetailsButton.addEventListener('click', () => {
			window.location.href = `/eventos/detalhes?id=${event.id}`;
		});

		return seeDetailsButton;
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
		let events = await this.getEvents();
		if (!options) return events;

		if (options.category) {
			events = events.filter(
				(event) => event.category.name === options.category
			);
		}

		if (options.classification) {
			events = events.filter(
				(event) => event.classification === options.classification
			);
		}
		return events;
	}

	handleFilterChange() {
		const filterElements = [
			{ id: '#filterCategory', key: 'category' },
			{ id: '#filterClassification', key: 'classification' },
		];

		filterElements.forEach(({ id, key }) => {
			retryQuerySelector(id, (element) => {
				element.addEventListener('change', async () => {
					this.options = {
						...this.options,
						[key]: element.value,
					};
					await this.getFilteredEventsAndPopulateContainer();
				});
			});
		});
	}

	async getFilteredEventsAndPopulateContainer() {
		const events = await this.getFilteredEvents(this.options);
		this.populateEventsSearchContainer(events);
	}

	async filterEventsWithQueryParams() {
		const currentURL = window.location.href;
		const urlParams = new URLSearchParams(currentURL.split('?')[1]);
		const category = urlParams.get('categoria');

		if (category) {
			retryQuerySelector('#filterCategory', (element) => {
				element.value = category;
			});

			this.options = {
				...this.options,
				category,
			};

			await this.getFilteredEventsAndPopulateContainer();
		}
	}
}

const eventsController = new EventsController();

export { eventsController };
