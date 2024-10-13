const statusEl = document.getElementById('services');
const lastUpdatedEl = document.getElementById('last-updated');

function updateStatus(data) {
	lastUpdatedEl.textContent = new Date(data.time).toLocaleString();

	statusEl.innerHTML = '';
	data.services.forEach(service => {
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

		statusEl.appendChild(serviceItem);
	});
}

fetch('https://amogus.cringe-studios.com/api/status')
	.then(response => response.json())
	.then(data => updateStatus(data))
	.catch(error => console.error('Error fetching status:', error));
