const possibleStatuses = ['Свободен', 'В работе', 'В ремонте'];

const deviceTable = document.getElementById('deviceTable');
const tableBody = deviceTable.querySelector('tbody');

function renderDevices(devicesData) {
    tableBody.innerHTML = '';

    devicesData.forEach(device => {
        const row = document.createElement('tr');
        const iconCell = document.createElement('td');
        const nameCell = document.createElement('td');
        const statusCell = document.createElement('td');
        const bellCell = document.createElement('td');

        iconCell.className = 'icon-cell';
        bellCell.className = 'bell-cell';


        const iconImg = document.createElement('img');
        iconImg.src = device.icon;
        iconCell.appendChild(iconImg);

        const bellIcon = document.createElement('img');
        bellIcon.src = device.bellIcon;
        bellCell.appendChild(bellIcon);

        nameCell.textContent = device.name;

        const statusSelect = document.createElement('select');
        possibleStatuses.forEach(status => {
            const option = document.createElement('option');
            option.value = status;
            option.text = status;
            if (status === device.status) {
                option.selected = true;
            }
            statusSelect.appendChild(option);
        });

        statusSelect.addEventListener('change', (event) => {
            const newStatus = event.target.value;
            device.status = newStatus;
        });
        statusCell.appendChild(statusSelect);

        row.appendChild(iconCell);
        row.appendChild(nameCell);
        row.appendChild(statusCell);
        row.appendChild(bellCell);
        tableBody.appendChild(row);
    });
}

async function loadDevices() {
    try {
        const response = await fetch('/src/DataBase/FavoriteDevices.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const devices = await response.json();
        renderDevices(devices);
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }
}

loadDevices();
