import { categoryRepository } from './repositories/categoriesRepository';
import { faker } from '@faker-js/faker';
import { eventsRepository } from './repositories/eventsRepository';
import { Event } from './model/Event';

export const createInitialData = () => {
	if (!localStorage.getItem('categories')) {
		const categories = [
			{
				name: 'Cultura',
				icon: `assets/categorias/cultura.png`,
			},
			{
				name: 'Esportes',
				icon: `assets/categorias/esportes.png`,
			},
			{
				name: 'Festas',
				icon: `assets/categorias/festas.png`,
			},
			{
				name: 'Shows',
				icon: `assets/categorias/shows.png`,
			},
		];

		categories.forEach((category) => {
			categoryRepository.add({ ...category });
		});
	}

	if (!localStorage.getItem('events')) {
		new Array(20).fill().forEach((_, index) => {
			const category = categoryRepository.getAll()[index % 4];

			const event = {
				id: index,
				name: faker.lorem.words(2),
				description: faker.lorem.words({ min: 10, max: 200 }),
				date: faker.date.future().getDate(),
				time: faker.date.future().getTime(),
				address: faker.location.streetAddress(),
				image: faker.image.url(),
				category: category,
				classification: faker.lorem.words(1),
				quantity: index % 10,
			};

			eventsRepository.add(event);
		});
	}
};
