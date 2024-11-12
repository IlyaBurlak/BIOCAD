const devices = [
    { name: 'pH метр Mettler Toledo International, Inc. SevenCompact S220T', status: 'Свободен', icon: '/img/tableImg/pH.svg' ,  bellIcon: '/img/tableImg/bell/ActiveBell.svg'},
    { name: 'Спектрофотометр Varian, Cary 50 Bio', status: 'Свободен', icon: '/img/tableImg/Spectr.svg', bellIcon: 'img/tableImg/bell/ActiveBell.svg'},
];

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



        const iconImg = document.createElement('img');
        iconImg.src = device.icon;
        iconCell.appendChild(iconImg);

        const bellIcon = document.createElement('img');
        bellIcon.src = device.bellIcon
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
            device.selectedStatus = newStatus;
        });
        statusCell.appendChild(statusSelect);

        row.appendChild(iconCell);
        row.appendChild(nameCell);
        row.appendChild(statusCell);
        tableBody.appendChild(row);
    });
}

renderDevices(devices);