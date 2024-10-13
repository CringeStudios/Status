const statusEl = document.getElementById('services');
const lastUpdatedEl = document.getElementById('last-updated');

const servers = [
	{
		name: 'Cringe Studios',
		url: 'https://amogus.cringe-studios.com/api/status'
	},
	{
		name: 'Another Server',
		url: 'https://keller.status.cringe-studios.com/api/status'
	},
	// Add more server configurations here
];

function updateStatus(serverData) {
	lastUpdatedEl.textContent = new Date(serverData.time).toLocaleString();

	const serverSection = document.createElement('div');
	serverSection.classList.add('server-section');

	if (serverData.services == null) {
		serverSection.innerHTML = `<h2>${serverData.server} unavailable</h2>`;
		statusEl.appendChild(serverSection);
		return;
	}

	serverSection.innerHTML = `<h2>${serverData.server}</h2>`;

	const servicesList = document.createElement('ul');
	serverData.services.forEach(service => {
		const serviceItem = document.createElement('li');
		serviceItem.classList.add('service');
		serviceItem.classList.add(service.ok ? 'ok' : 'error');

		const statusDot = document.createElement('div');
		statusDot.classList.add('status');
		serviceItem.appendChild(statusDot);

		const serviceName = document.createElement('span');
		serviceName.classList.add('name');
		serviceName.textContent = service.name;
		serviceItem.appendChild(serviceName);

		servicesList.appendChild(serviceItem);
	});

	serverSection.appendChild(servicesList);
	statusEl.appendChild(serverSection);
}

async function fetchStatus(server) {
	try {
		let response = await fetch(server.url);
		let json = await response.json();

		updateStatus({ ...json, server: server.name });
	} catch (e) {
		updateStatus({ server: server.name });
	}
}

for (let server of servers) {
	fetchStatus(server);
}
