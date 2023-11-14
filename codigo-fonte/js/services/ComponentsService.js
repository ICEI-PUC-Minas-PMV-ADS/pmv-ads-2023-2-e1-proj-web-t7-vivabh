import { formatDate, shortenText } from '../helpers';

class ComponentsService {
	createSeeDeailsButtonComponent(event) {
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

	createOptionsComponent(data) {
		return data.map((item) => `<option value="${item}">${item}</option>`);
	}

	createDeleteButtonComponent(event) {
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

	createEditButtonComponent(event) {
		const editButton = document.createElement('button');
		editButton.className = 'edit';
		editButton.innerHTML = `<img class='button' src='assets/icons/edit.svg' ='Editar evento' />`;
		editButton.addEventListener('click', () => {
			window.location.href = `/admin/eventos/editar?id=${event.id}`;
		});
		return editButton;
	}

	createEventDetailsComponent(event) {
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
	createEventsContainer(events, isAdminPanel = false) {
		const fragment = document.createDocumentFragment();
		events.forEach((event) => {
			const { month, day } = formatDate(event.date);
			const anchor = document.createElement('a');
			anchor.className = 'event-anchor';
			anchor.href = `/eventos/detalhes?id=${event.id}`;

			const eventContainer = document.createElement('div');
			eventContainer.className = 'event';

			const description = shortenText(event.description, 65);

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
				buttonsContainer.appendChild(this.createEditButtonComponent(event));
				buttonsContainer.appendChild(this.createDeleteButtonComponent(event));
				buttonsContainer.appendChild(
					this.createSeeDeailsButtonComponent(event)
				);
				eventContainer.appendChild(buttonsContainer);
				fragment.appendChild(eventContainer);
				return;
			}

			anchor.appendChild(eventContainer);

			fragment.appendChild(anchor);
		});

		return fragment;
	}
	buildSuggestedEvents(suggestedEvents) {
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

			const description = shortenText(event.description, 30);

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
		});
		return suggestedEventsContainer;
	}
}

const componentsService = new ComponentsService();

export { componentsService };
