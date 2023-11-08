import { categoryRepository } from './repositories/categoriesRepository';

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

export const createInitialData = () => {
	if (!localStorage.getItem('categories')) {
		categories.forEach((category) => {
			categoryRepository.add({ ...category });
		});
	}
};
