// Inizializza la mappa
const map = L.map('map').setView([50, 10], 4);

// Tile layer con mappa storica (senza confini moderni)
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20,
    opacity: 0.6
}).addTo(map);

// Variabili globali
let currentLayer = null;
let currentYear = '1914';

// Mappa dei colori per ogni stato (generati dinamicamente)
const colorMap = new Map();
const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B88B', '#AAB7B8',
    '#52BE80', '#AF7AC5', '#5DADE2', '#F4D03F', '#EB984E'
];
let colorIndex = 0;

// Funzione per ottenere un colore univoco per ogni stato
function getColorForState(stateName) {
    if (!colorMap.has(stateName)) {
        colorMap.set(stateName, colors[colorIndex % colors.length]);
        colorIndex++;
    }
    return colorMap.get(stateName);
}

// Funzione per caricare e visualizzare i dati storici
async function loadHistoricalData(year) {
    try {
        // Mostra loading
        const mapDiv = document.getElementById('map');
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading';
        loadingDiv.innerHTML = '<div class="spinner"></div>Caricamento dati storici...';
        mapDiv.appendChild(loadingDiv);

        // Rimuovi il layer precedente
        if (currentLayer) {
            map.removeLayer(currentLayer);
        }

        // Carica il file GeoJSON
        const response = await fetch(`../../data/world_${year}.geojson`);
        if (!response.ok) {
            throw new Error(`Errore nel caricamento: ${response.status}`);
        }
        
        const geojsonData = await response.json();
        
        // Rimuovi loading
        mapDiv.removeChild(loadingDiv);

        // Aggiungi il layer GeoJSON alla mappa
        currentLayer = L.geoJSON(geojsonData, {
            style: function(feature) {
                const stateName = feature.properties.NAME;
                return {
                    fillColor: getColorForState(stateName),
                    weight: 2,
                    opacity: 1,
                    color: '#333',
                    fillOpacity: 0.6
                };
            },
            onEachFeature: function(feature, layer) {
                const props = feature.properties;
                const stateName = props.NAME || 'Sconosciuto';
                const subjectTo = props.SUBJECTO || 'Indipendente';
                const partOf = props.PARTOF || stateName;
                
                // Popup con informazioni
                layer.bindPopup(`
                    <h4>${stateName}</h4>
                    <p><strong>Subordinato a:</strong> ${subjectTo}</p>
                    <p><strong>Parte di:</strong> ${partOf}</p>
                    <p><strong>Anno:</strong> ${year}</p>
                `);
                
                // Hover effect
                layer.on('mouseover', function(e) {
                    e.target.setStyle({
                        weight: 3,
                        fillOpacity: 0.8
                    });
                });
                
                layer.on('mouseout', function(e) {
                    currentLayer.resetStyle(e.target);
                });
                
                // Click event
                layer.on('click', function() {
                    document.getElementById('territory-details').innerHTML = `
                        <p><strong>Nome:</strong> ${stateName}</p>
                        <p><strong>Subordinato a:</strong> ${subjectTo}</p>
                        <p><strong>Parte di:</strong> ${partOf}</p>
                        <p><strong>Anno:</strong> ${year}</p>
                        <p><strong>Precisione confini:</strong> ${props.BORDERPRECISION}/5</p>
                    `;
                });
            }
        }).addTo(map);

        // Aggiorna statistiche
        const stateCount = geojsonData.features.length;
        document.getElementById('state-count').textContent = stateCount;
        document.getElementById('current-year').textContent = year;
        
        console.log(`✅ Caricati ${stateCount} stati per l'anno ${year}`);
        
    } catch (error) {
        console.error('❌ Errore nel caricamento dei dati:', error);
        alert(`Errore nel caricamento dei dati per l'anno ${year}.\nAssicurati che il file world_${year}.geojson esista nella cartella data/`);
    }
}

// Event listener per il cambio anno
document.getElementById('year-select').addEventListener('change', function(e) {
    currentYear = e.target.value;
    loadHistoricalData(currentYear);
});

// Carica i dati iniziali
loadHistoricalData(currentYear);
