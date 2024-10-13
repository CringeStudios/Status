const statusEl = document.getElementById('services');
const lastUpdatedEl = document.getElementById('last-updated');

const servers = [
	{
		name: 'Cringe Studios',
		url: 'https://amogus.cringe-studios.com/api/status'
	},
	{
		name: 'Another Server',
		url: 'https://another-server.com/api/status'
	},
	// Add more server configurations here
];

function updateStatus(data) {
	lastUpdatedEl.textContent = new Date(data.time).toLocaleString();

	statusEl.innerHTML = '';

	// Group services by server
	const groupedServices = data.services.reduce((acc, service) => {
		const serverName = service.server || 'Unknown';
		if (!acc[serverName]) {
			acc[serverName] = [];
		}
		acc[serverName].push(service);
		return acc;
	}, {});

	// Create server sections and service items
	for (const serverName in groupedServices) {
		const serverSection = document.createElement('div');
		serverSection.classList.add('server-section');
		serverSection.innerHTML = `<h2>${serverName}</h2>`;

		const servicesList = document.createElement('ul');
		groupedServices[serverName].forEach(service => {
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
}

// Assuming the API response now includes a "server" property for each service
Promise.all(servers.map(server => fetch(server.url).then(response => response.json()).then(data => ({ ...data, server: server.name }))))
	.then(responses => {
		const mergedData = responses.reduce((acc, data) => {
			acc.time = data.time;
			acc.services = [...acc.services, ...data.services];
			return acc;
		}, { services: [] });
		updateStatus(mergedData);
	})
	.catch(error => console.error('Error fetching status:', error));
