const serversEl = document.getElementById('servers');

const servers = [
	{
		name: 'Cringe Studios',
		url: 'https://zap.status.cringe-studios.com/api/status'
	},
	{
		name: 'Keller',
		url: 'https://keller.status.cringe-studios.com/api/status'
	},
	{
		name: 'Graphite',
		url: 'https://graphite.status.cringe-studios.com/api/status'
	},
];

function createElements() {
	for (let server of servers) {
		const serverEl = document.createElement('div');
		serverEl.id = server.name;
		serverEl.classList.add('server');

		const serverHead = document.createElement('div');
		serverHead.classList.add('head');

		const title = document.createElement('b');
		title.innerText = server.name;
		serverHead.appendChild(title);

		const lastUpdated = document.createElement('span');
		lastUpdated.classList.add('last-updated');
		lastUpdated.innerText = 'Last Updated: Never';
		serverHead.appendChild(lastUpdated);

		serverEl.appendChild(serverHead);

		const loading = document.createElement('div');
		loading.classList.add('loading');
		serverEl.appendChild(loading);

		serversEl.appendChild(serverEl);
		console.log(serversEl);
	}
}

function updateStatus(serverData) {
	console.log(serverData);

	const serverEl = document.getElementById(serverData.server);
	const loading = serverEl.querySelector('.loading');
	const lastUpdated = serverEl.querySelector('.last-updated');
	lastUpdated.innerText = 'Last Updated: ' + new Date(serverData.unixTime).toLocaleString();

	const oldServicesDiv = serverEl.querySelector('.services');
	if (oldServicesDiv != null) oldServicesDiv.remove();

	const servicesDiv = document.createElement('div');
	servicesDiv.classList.add('services');

	if (loading != null) loading.remove();

	while (servicesDiv.firstChild) servicesDiv.firstChild.remove();

	if (serverData.services == null) {
		servicesDiv.append('Unreachable');
		serverEl.appendChild(servicesDiv);
		return;
	}

	for (let service of serverData.services) {
		const serviceEl = document.createElement('div');
		serviceEl.classList.add('service');
		serviceEl.classList.add(service.ok ? 'ok' : 'error');

		const statusDot = document.createElement('div');
		statusDot.classList.add('status');
		serviceEl.appendChild(statusDot);

		const serviceName = document.createElement('span');
		serviceName.innerText = service.name;
		serviceEl.appendChild(serviceName);

		servicesDiv.appendChild(serviceEl);
	}

	serverEl.appendChild(servicesDiv);
}

async function fetchStatus(server) {
	try {
		let response = await fetch(server.url);
		let json = await response.json();

		updateStatus({ ...json, server: server.name });
	} catch (e) {
		updateStatus({ server: server.name, unixTime: new Date().getTime() });
	}
}

function fetchAllStatus() {
	for (let server of servers) {
		fetchStatus(server);
	}
}

createElements();

setInterval(() => {
	fetchAllStatus();
}, 10000);
fetchAllStatus();
