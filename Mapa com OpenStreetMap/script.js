const map = L.map('map').setView([-23.55052, -46.633308], 13); // Coordenadas iniciais e nível de zoom

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
const marker = L.marker([-23.55052, -46.633308]).addTo(map)
    .bindPopup('São Paulo, Brasil')
    .openPopup();
L.Control.geocoder().addTo(map);
map.on('click', function(e) {
    const { lat, lng } = e.latlng;
    L.marker([lat, lng]).addTo(map)
        .bindPopup(`Coordenadas: ${lat.toFixed(5)}, ${lng.toFixed(5)}`)
        .openPopup();
}   
);
