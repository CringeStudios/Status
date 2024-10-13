const statusEl = document.getElementById('services');
const lastUpdatedEl = document.getElementById('last-updated');

function updateStatus(data) {
	data = {
		"time": "Sun, 13 Oct 2024 17:39:53 CEST",
		"unixTime": 1728833993504,
		"services": [
			{
				"name": "Cringe Studios Server",
				"ok": true
			},
			{
				"name": "Cringe Studios Website 2",
				"ok": true
			},
			{
				"name": "Graphite Server",
				"ok": true
			},
			{
				"name": "Graphite Website",
				"ok": true
			},
			{
				"name": "Does not exist",
				"ok": false
			},
			{
				"name": "Does not exist 2",
				"ok": false
			}
		]
	};
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
