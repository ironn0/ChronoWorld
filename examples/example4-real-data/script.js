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
let labelsLayer = null;
let currentYear = '1914';
let showLabels = true;

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

// Funzione per calcolare il centroide di un poligono
function getPolygonCenter(coordinates) {
    let lats = [];
    let lngs = [];
    
    // Gestisce sia Polygon che MultiPolygon
    function extractCoords(coords, depth = 0) {
        if (depth === 2) {
            coords.forEach(point => {
                lngs.push(point[0]);
                lats.push(point[1]);
            });
        } else {
            coords.forEach(c => extractCoords(c, depth + 1));
        }
    }
    
    extractCoords(coordinates);
    
    const avgLat = lats.reduce((a, b) => a + b, 0) / lats.length;
    const avgLng = lngs.reduce((a, b) => a + b, 0) / lngs.length;
    
    return [avgLat, avgLng];
}

// Funzione per calcolare l'area approssimativa (per dimensionare le etichette)
function getApproximateArea(coordinates) {
    let area = 0;
    
    function calculatePolygonArea(coords) {
        if (!coords || coords.length < 3) return 0;
        let sum = 0;
        for (let i = 0; i < coords.length - 1; i++) {
            sum += (coords[i][0] * coords[i + 1][1] - coords[i + 1][0] * coords[i][1]);
        }
        return Math.abs(sum / 2);
    }
    
    function processCoords(coords, depth = 0) {
        if (depth === 2) {
            area += calculatePolygonArea(coords);
        } else {
            coords.forEach(c => processCoords(c, depth + 1));
        }
    }
    
    processCoords(coordinates);
    return area;
}

// Funzione per creare le etichette dei paesi
function createLabels(geojsonData) {
    // Rimuovi le etichette precedenti
    if (labelsLayer) {
        map.removeLayer(labelsLayer);
    }
    
    if (!showLabels) return;
    
    const markers = [];
    
    geojsonData.features.forEach(feature => {
        const name = feature.properties.NAME || feature.properties.ABBREVN || 'Unknown';
        const geometry = feature.geometry;
        
        if (!geometry || !geometry.coordinates) return;
        
        try {
            const center = getPolygonCenter(geometry.coordinates);
            const area = getApproximateArea(geometry.coordinates);
            
            // Determina la dimensione dell'etichetta in base all'area
            let labelClass = 'country-label';
            if (area < 10) {
                labelClass += ' small';
            } else if (area > 500) {
                labelClass += ' large';
            }
            
            // Abbrevia nomi molto lunghi
            let displayName = name;
            if (name.length > 20) {
                displayName = feature.properties.ABBREVN || name.substring(0, 17) + '...';
            }
            
            const label = L.marker(center, {
                icon: L.divIcon({
                    className: labelClass,
                    html: displayName,
                    iconSize: null
                }),
                interactive: false
            });
            
            markers.push(label);
        } catch (error) {
            console.warn(`Impossibile creare etichetta per ${name}:`, error);
        }
    });
    
    labelsLayer = L.layerGroup(markers).addTo(map);
    console.log(`✅ Creato ${markers.length} etichette`);
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
        
        // Crea le etichette dei paesi
        createLabels(geojsonData);
        
        console.log(`✅ Caricati ${stateCount} stati per l'anno ${year}`);
        
    } catch (error) {
        console.error('❌ Errore nel caricamento dei dati:', error);
        
        // Mostra messaggio più user-friendly
        const errorMsg = document.createElement('div');
        errorMsg.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #f8d7da; color: #721c24; padding: 20px; border-radius: 8px; border: 2px solid #f5c6cb; z-index: 9999; max-width: 500px;';
        errorMsg.innerHTML = `
            <h3>⚠️ Dati non disponibili</h3>
            <p>Il file <strong>world_${year}.geojson</strong> non è stato trovato.</p>
            <p>Anni disponibili: 1900, 1914</p>
            <button onclick="this.parentElement.remove()" style="margin-top: 10px; padding: 8px 16px; cursor: pointer;">Chiudi</button>
        `;
        document.body.appendChild(errorMsg);
    }
}

// Event listener per il cambio anno
document.getElementById('year-select').addEventListener('change', function(e) {
    currentYear = e.target.value;
    loadHistoricalData(currentYear);
});

// Event listener per mostrare/nascondere etichette
document.getElementById('show-labels').addEventListener('change', function(e) {
    showLabels = e.target.checked;
    
    if (showLabels) {
        // Ricarica i dati per ricreare le etichette
        loadHistoricalData(currentYear);
    } else {
        // Rimuovi le etichette
        if (labelsLayer) {
            map.removeLayer(labelsLayer);
            labelsLayer = null;
        }
    }
});

// Carica i dati iniziali
loadHistoricalData(currentYear);
