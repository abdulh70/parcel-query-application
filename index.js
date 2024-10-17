document.addEventListener("DOMContentLoaded", () => {
    fetchParcels();
});

// Fetch parcels from the JSON server and display them in the table
function fetchParcels() {
    fetch('https://my-json-server.typicode.com/abdulh70/parcel-query-application/parcels')
        .then(response => response.json())
        .then(data => displayParcels(data))
        .catch(error => console.error('Error fetching parcels:', error));
}

// Display parcels in the table
function displayParcels(parcels) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ''; // Clear any existing data

    parcels.forEach(parcel => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${parcel.id}</td>
            <td>${parcel.owner}</td>
            <td>${parcel.location}</td>
            <td>${parcel.area}</td>
            <td>${parcel.value}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Search parcels based on input criteria
function searchParcels() {
    const query = document.getElementById('search-input').value.toLowerCase();
    fetch('https://my-json-server.typicode.com/abdulh70/parcel-query-application/parcels')
        .then(response => response.json())
        .then(data => {
            const filteredParcels = data.filter(parcel => 
                parcel.owner.toLowerCase().includes(query) ||
                parcel.location.toLowerCase().includes(query)
            );
            displayParcels(filteredParcels);
        })
        .catch(error => console.error('Error searching parcels:', error));
}