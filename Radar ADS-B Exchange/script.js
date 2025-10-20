let map;
function inicializarMapa() {
    map = L.map('map').setView([-22.9, -43.2], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '0 OpenStreetMap contributors'
    }).addTo(map);
}
function buscarAvioes() {

    const dadosFalsos = [
        { latitude: -22.9, longitude: -43.2, callsign: 'GOL123', country: 'Brasil' }, 
        { latitude: -23.5, longitude: -46.6, callsign: 'LATAM456', country: 'Brasil' },
        { latitude: -19.9, longitude: -43.9, callsign: 'AZUL789', country: 'Brasil' } 
    ];
    map.eachLayer(layer => {
        if (layer instanceof L.marker) map.removeLayer(layer);
    });
    dadosFalsos.forEach(aviao => {
        L.marker([aviao.latitude, aviao.longitude])
        .addTo(map)
        .bindPopup(`<strong>${aviao.callsign}</strong><br>Origem: ${aviao.country}`);
    });
}
window.onload = inicializarMapa;