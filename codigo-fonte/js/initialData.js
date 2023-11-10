import { categoryRepository } from './repositories/categoriesRepository';
import { eventsRepository } from './repositories/eventsRepository';
import { userRepository } from './repositories/usersRepository';

export const createInitialData = () => {
	if (!localStorage.getItem('users')) {
		userRepository.add({
			name: 'Marcos Andre',
			password: 'senha',
			email: 'marcos@puc.com',
			type: 'default',
		});
	}
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
		const events = [
			{
				id: 1,
				name: 'Concert in the Park',
				description: 'Enjoy live music in the open air.',
				date: new Date(2023, 11, 1),
				time: 1609459200000, // January 1, 2023, 00:00:00 UTC
				address: 'City Park, Main Street',
				image: 'assets/eventos/evento-show1.jpg',
				category: categoryRepository.getAll()[3],
				classification: 'Music Festival',
				quantity: 100,
				owner: userRepository.getByEmail('marcos@puc.com'),
			},
			{
				id: 2,
				name: 'Soccer Tournament',
				description: 'Local soccer tournament for all ages.',
				date: new Date(2023, 11, 15),
				time: 1610745600000, // January 15, 2023, 00:00:00 UTC
				address: 'Sports Complex, Oak Avenue',
				image: 'assets/eventos/evento-esportel1.jpg',
				category: categoryRepository.getAll()[1],
				classification: 'Sports Event',
				quantity: 50,
				owner: userRepository.getByEmail('marcos@puc.com'),
			},
			{
				id: 3,
				name: 'Food Festival',
				description: 'Explore a variety of delicious foods from local vendors.',
				date: new Date(2023, 11, 8),
				time: 1607433600000, // December 8, 2023, 00:00:00 UTC
				address: 'Downtown Square, Market Street',
				image: 'assets/eventos/evento-festas1.jpg',
				category: categoryRepository.getAll()[2],
				classification: 'Food Event',
				quantity: 80,
				owner: userRepository.getByEmail('marcos@puc.com'),
			},
			{
				id: 4,
				name: 'Tech Conference',
				description:
					'Learn about the latest trends in technology and innovation.',
				date: new Date(2023, 11, 22),
				time: 1611081600000, // December 22, 2023, 00:00:00 UTC
				address: 'Convention Center, Tech Avenue',
				image: 'assets/eventos/evento-show2.jpg',
				category: categoryRepository.getAll()[3],
				classification: 'Technology Conference',
				quantity: 120,
				owner: userRepository.getByEmail('marcos@puc.com'),
			},
			{
				id: 5,
				name: 'Outdoor Movie Night',
				description: 'Enjoy a movie under the stars with family and friends.',
				date: new Date(2023, 11, 29),
				time: 1611664000000, // December 29, 2023, 00:00:00 UTC
				address: 'Community Park, Sunset Boulevard',
				image: 'assets/eventos/evento-cultural1.jpg',
				category: categoryRepository.getAll()[0],
				classification: 'Movie Night',
				quantity: 150,
				owner: userRepository.getByEmail('marcos@puc.com'),
			},
			{
				id: 6,
				name: 'Art Exhibition',
				description: 'Experience a showcase of local and contemporary art.',
				date: new Date(2024, 0, 5),
				time: 1641369600000, // January 5, 2024, 00:00:00 UTC
				address: 'Art Gallery, Creative Street',
				image: 'assets/eventos/evento-cultural2.jpg',
				category: categoryRepository.getAll()[0],
				classification: 'Art Event',
				quantity: 60,
				owner: userRepository.getByEmail('marcos@puc.com'),
			},
			{
				id: 7,
				name: 'Fitness Challenge',
				description:
					'Join the community in a day of fitness challenges and activities.',
				date: new Date(2024, 0, 12),
				time: 1641974400000, // January 12, 2024, 00:00:00 UTC
				address: 'City Park, Fitness Square',
				image: 'assets/eventos/evento-esportel2.jpg',
				category: categoryRepository.getAll()[1],
				classification: 'Fitness Event',
				quantity: 100,
				owner: userRepository.getByEmail('marcos@puc.com'),
			},
			{
				id: 8,
				name: 'Book Fair',
				description: 'Discover a wide selection of books from various genres.',
				date: new Date(2024, 0, 19),
				time: 1642579200000, // January 19, 2024, 00:00:00 UTC
				address: 'Community Center, Reading Lane',
				image: 'assets/eventos/evento-festas2.jpg',
				category: categoryRepository.getAll()[2],
				classification: 'Literary Event',
				quantity: 90,
				owner: userRepository.getByEmail('marcos@puc.com'),
			},
			{
				id: 9,
				name: 'Gaming Tournament',
				description:
					'Compete in a gaming tournament featuring various video games.',
				date: new Date(2024, 0, 26),
				time: 1643184000000,
				address: 'Gaming Center, Arcade Street',
				image: 'assets/eventos/evento-esportel3.webp',
				category: categoryRepository.getAll()[3],
				classification: 'Gaming Event',
				quantity: 80,
				owner: userRepository.getByEmail('marcos@puc.com'),
			},
		];

		events.forEach((event) => {
			eventsRepository.add(event);
		});
	}
};
