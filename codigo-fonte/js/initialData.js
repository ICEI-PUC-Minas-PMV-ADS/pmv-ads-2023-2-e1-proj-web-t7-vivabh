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
				name: 'PAUL MCCARTNEY - BH',
				description: `Não perca esta rara oportunidade de testemunhar a lenda viva da música, Sir Paul McCartney, em uma noite extraordinária em Belo Horizonte. Este evento histórico promete ser uma experiência inesquecível, onde você terá a chance única de vivenciar a genialidade musical de um dos maiores artistas da história.
<br>
<br>
				Prepare-se para uma apresentação que abrange décadas de sucesso, desde os dias icônicos dos Beatles até suas músicas solo mais recentes. Paul McCartney, com sua voz lendária e talento incomparável, levará o público a uma jornada musical cativante.
<br>
<br>
				Além do espetáculo musical inigualável, o evento oferecerá uma produção visual espetacular, com efeitos de luz e palco que complementarão perfeitamente a atmosfera mágica. Desfrute de uma noite sob as estrelas, imerso na energia vibrante e no legado duradouro deste ícone da música.
<br>
<br>
				Garanta seu lugar nesta noite especial, onde a história da música ganha vida. Não perca a chance de fazer parte deste momento único e presenciar Paul McCartney ao vivo em Belo Horizonte. Uma experiência que ficará gravada na memória de todos os fãs e amantes da música.
					`,
				date: new Date(2023, 11, 3),
				time: 1609459200000,
				address: 'Arena Mrv, Rua Cristina Maria de Assis, 202 - Califórnia',
				image: '/assets/eventos/evento-show1.jpg',
				category: categoryRepository.getAll()[3],
				classification: '12 anos',
				quantity: 100,
				owner: userRepository.getByEmail('marcos@puc.com'),
			},
			{
				id: 2,
				name: 'Cruzeiro x Vasco',
				description: `
				Cruzeiro x Vasco - Jogo válido pela 33ª rodada do Brasileirão.

<br><br>

Dois gigantes do futebol brasileiro, Cruzeiro e Vasco, se encontrarão em campo para um confronto emocionante na 33ª rodada do Campeonato Brasileiro. Ambas as equipes estão determinadas a conquistar a vitória e somar pontos cruciais na tabela de classificação.

<br><br>

Os jogos entre Cruzeiro e Vasco sempre foram marcados por rivalidade, lances espetaculares e reviravoltas surpreendentes. Este não será diferente, prometendo uma partida repleta de emoções do início ao fim. Prepare-se para assistir a jogadas incríveis, dribles habilidosos e gols que ficarão na memória dos torcedores.

<br><br>

Além da rivalidade em campo, a atmosfera nos estádios estará carregada de emoção, com as torcidas empurrando seus times rumo à vitória. Se você é um verdadeiro apaixonado por futebol, não pode perder esse duelo entre dois clubes com histórias gloriosas e legados no esporte nacional.

<br><br>

Portanto, marque na sua agenda, reúna os amigos e a família, e venha torcer pelo seu time do coração. Esteja preparado para viver cada lance, vibrar com os gols e celebrar a paixão pelo futebol brasileiro. Cruzeiro x Vasco na 33ª rodada do Brasileirão é mais do que um jogo, é um espetáculo esportivo que promete ficar na memória de todos os amantes do futebol. Não fique de fora dessa experiência única!

				`,
				date: new Date(2023, 10, 22),
				time: 1610745600000, // January 15, 2023, 00:00:00 UTC
				address: 'Mineirão, Av. Antônio Abrahão Caram, 1001 - São José',
				image: '/assets/eventos/evento-esportel1.jpeg',
				category: categoryRepository.getAll()[1],
				classification: 'Livre',
				quantity: 50,
				owner: userRepository.getByEmail('marcos@puc.com'),
			},
			{
				id: 3,
				name: 'BAILE MACABRO',
				description: `
				'BAILE MACABRO'

<br><br>

Prepare-se para uma experiência única: o "Baile Macabro" está chegando! Este não é apenas um evento, mas sim um rolezinho à fantasia que tomará conta da moradia da UFMG. Uma celebração de arrepiar, repleta de diversão, música e surpresas.

<br><br>

Coloque sua fantasia mais criativa, reúna seus amigos e venha fazer parte desse evento memorável. O "Baile Macabro" promete uma noite cheia de animação, onde a fantasia é a protagonista e a diversão não tem limites.

<br><br>

Dance ao som de músicas envolventes, participe de concursos de fantasias e desfrute de uma atmosfera única, repleta de energia positiva. Esteja preparado para momentos inesquecíveis e para criar memórias que durarão para sempre.

<br><br>

Não perca a oportunidade de participar do "Baile Macabro" na moradia da UFMG. A diversão está garantida, e a única regra é se deixar levar pela magia dessa noite especial. Venha viver essa experiência incrível e faça parte de um evento que promete ser o destaque da temporada!
				`,
				date: new Date(2023, 10, 25),
				time: 1607433600000, // December 8, 2023, 00:00:00 UTC
				address: 'Moradia I, Av. Fleming 394, Ouro preto',
				image: '/assets/eventos/evento-festas1.jfif',
				category: categoryRepository.getAll()[2],
				classification: '18 anos',
				quantity: 80,
				owner: userRepository.getByEmail('marcos@puc.com'),
			},
			{
				id: 4,
				name: 'ANAVITÓRIA & ORQUESTRA OURO PRETO',
				description:
					'Show espetacular da dupla Ana Clara Caetano e Vitória Falcão.',
				date: new Date(2023, 11, 22),
				time: 1611081600000, // December 22, 2023, 00:00:00 UTC
				address: 'Palácio das Artes, Av. Afonso Pena, 1537 - Centro',
				image: '/assets/eventos/evento-show2.webp',
				category: categoryRepository.getAll()[3],
				classification: '16 anos',
				quantity: 120,
				owner: userRepository.getByEmail('marcos@puc.com'),
			},
			{
				id: 5,
				name: 'Mostra de Curtas 3D - Realidade Virtual',
				description:
					'Arte digital francesa chega a BH com filmes em realidade virtual e instalação.',
				date: new Date(2023, 10, 26),
				time: 1611664000000, // December 29, 2023, 00:00:00 UTC
				address: 'Palácio das Artes, Av. Afonso Pena, 1537 - Centro',
				image: '/assets/eventos/evento-cultural1.jpg',
				category: categoryRepository.getAll()[0],
				classification: 'Livre',
				quantity: 150,
				owner: userRepository.getByEmail('marcos@puc.com'),
			},
			{
				id: 6,
				name: '“Nossa Modernidade”',
				description:
					'Exposição: “Nossa Modernidade” em homenagem a Yara Tupynambá',
				date: new Date(2024, 0, 5),
				time: 1641369600000, // January 5, 2024, 00:00:00 UTC
				address:
					'Errol Flynn Galeria de Arte - Rua Curitiba, 1862 - Bairro Lourdes',
				image: '/assets/eventos/evento-cultural2.webp',
				category: categoryRepository.getAll()[0],
				classification: 'Livre',
				quantity: 60,
				owner: userRepository.getByEmail('marcos@puc.com'),
			},
			{
				id: 7,
				name: 'Atlético-MG x Grêmio',
				description: 'Jogo válido pela 35º rodada do Brasileirão.',
				date: new Date(2023, 10, 26),
				time: 1641974400000, // January 12, 2024, 00:00:00 UTC
				address: 'Arena Mrv, Rua Cristina Maria de Assis, 202 - Califórnia',
				image: '/assets/eventos/evento-esportel2.jpg',
				category: categoryRepository.getAll()[1],
				classification: 'Livre',
				quantity: 100,
				owner: userRepository.getByEmail('marcos@puc.com'),
			},
			{
				id: 8,
				name: 'MADEIRADA FANTASIA 172',
				description:
					'Rolezinho da odonto da UFMG, a madeirada tá chegando para te proporcionar aquela festa universitária de respeito',
				date: new Date(2023, 10, 17),
				time: 1642579200000, // January 19, 2024, 00:00:00 UTC
				address: 'Espaço Master, Rua Cláudio Joaquim Antunes, 343 Braúnas',
				image: '/assets/eventos/evento-festas2.jfif',
				category: categoryRepository.getAll()[2],
				classification: '14 anos',
				quantity: 90,
				owner: userRepository.getByEmail('marcos@puc.com'),
			},
			{
				id: 9,
				name: 'BACO EM BH',
				description:
					'Um dos principais nomes da cena musical contemporânea brasileira, Baco Exu do Blues se apresenta no Arena Hall, em Belo Horizonte',
				date: new Date(2023, 11, 22),
				time: 1643184000000,
				address: 'Arena Hall - Av. Nossa Sra. do Carmo,230',
				image: '/assets/eventos/evento-showl3.webp',
				category: categoryRepository.getAll()[3],
				classification: '18 anos',
				quantity: 80,
				owner: userRepository.getByEmail('marcos@puc.com'),
			},
		];

		events.forEach((event) => {
			eventsRepository.add(event);
		});
	}
};
