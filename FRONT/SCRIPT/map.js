var map = L.map('map').setView([49.894066, 2.295753], 13); 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

function addMarker(lat, lng) {
    var marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup("Marker Location").openPopup();
    map.setView([lat, lng], 13); 
}

document.getElementById('addMarkerBtn').addEventListener('click', function() {
    var lat = parseFloat(document.getElementById('latitude').value);
    var lng = parseFloat(document.getElementById('longitude').value);
      
    if (!isNaN(lat) && !isNaN(lng)) {
    addMarker(lat, lng);
    } else {
    alert("Please enter valid latitude and longitude values.");
    }
});

async function getCoordinates() {
    try {
        const response = await fetch('http://192.168.65.77:3000/getCoordinates', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {
            addMarker(data.latitude, data.longitude);
        } else {
            console.log('Erreur lors de la récupération des coordonnées', response);
        }
    } catch (e) {
        console.log("Erreur lors de l'envoi de la requête\nErreur : ", e);
    }
}

/*while(true) {
    getCoordinates()
    setTimeout(5000);
}*/
getCoordinates()