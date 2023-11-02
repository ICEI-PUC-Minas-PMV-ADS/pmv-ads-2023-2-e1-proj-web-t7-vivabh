export const route = (event) => {
	event = event || window.event;
	event.preventDefault();
	window.history.pushState(
		{},
		'',
		event.target.href || event.currentTarget.href
	);
	handleLocation();
};

const routes = {
	404: '/pages/404.html',
	'/': '/pages/home.html',
	'/login': '/pages/login.html',
	'/register': '/pages/register.html',
	'/eventos/novo': '/pages/events/new.html',
	'/eventos': '/pages/events/index.html',
};

export const handleLocation = async () => {
	const path = window.location.pathname;
	const route = routes[path] || routes[404];
	const html = await fetch(route).then((data) => data.text());
	document.getElementById('app').innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
