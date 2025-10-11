// ========================================
// 🌍 CHRONOWORLD - Versione Funzionante
// ========================================

console.log('🚀 ChronoWorld Starting...');

// Variabili globali
let map;
let allData = null;
let currentYear = 1914;
let currentLayer = null;
let capitalMarkers = [];
let countryLabels = [];
let showLabels = true;
let showCapitals = true;

// ========================================
// INIZIALIZZAZIONE MAPPA
// ========================================

function initMap() {
    console.log('📍 Inizializzazione mappa...');
    
    map = L.map('map', {
        center: [30, 10],
        zoom: 3,
        minZoom: 2,
        maxZoom: 18
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
    
    console.log('✅ Mappa inizializzata');
}

// ========================================
// CARICAMENTO DATASET - CSHAPES 2.0
// ========================================

async function loadCShapesDataset() {
    showLoading('Caricamento CShapes 2.0...');
    
    const possiblePaths = [
        '../../data/CShapes-2.0.geojson',
        '../data/CShapes-2.0.geojson',
        'data/CShapes-2.0.geojson',
        '/data/CShapes-2.0.geojson'
    ];
    
    console.log('📂 Ricerca file CShapes...');
    
    for (const path of possiblePaths) {
        try {
            console.log(`🔍 Tentativo: ${path}`);
            
            const response = await fetch(path);
            console.log(`   📡 HTTP ${response.status} ${response.statusText}`);
            
            if (!response.ok) {
                continue;
            }
            
            console.log(`✅ FILE TROVATO: ${path}`);
            console.log('⏳ Parsing JSON...');
            
            const data = await response.json();
            
            console.log(`✅ JSON parsato`);
            console.log(`   📦 Features totali: ${data.features.length}`);
            
            allData = data;
            
            // Prima feature per debug
            const first = data.features[0];
            console.log('🔬 Sample properties:', Object.keys(first.properties));
            
            filterAndDisplayYear(currentYear);
            hideLoading();
            return;
            
        } catch (error) {
            console.log(`   ❌ Errore: ${error.message}`);
            continue;
        }
    }
    
    // Nessun percorso funzionante
    console.error('❌ FILE NON TROVATO');
    hideLoading();
    alert('Impossibile caricare CShapes-2.0.geojson\n\nVerifica:\n1. File in ChronoWorld/data/\n2. Live Server attivo\n3. Console (F12) per dettagli');
}

// ========================================
// FILTRAGGIO ANNO - CSHAPES 2.0
// ========================================

function filterAndDisplayYear(year) {
    if (!allData) {
        console.error('❌ Dataset non caricato');
        return;
    }
    
    console.log(`📅 Filtraggio anno ${year}...`);
    showLoading(`Filtraggio anno ${year}...`);
    
    // Rimuovi layer precedente
    if (currentLayer) {
        map.removeLayer(currentLayer);
    }
    
    // Rimuovi marker
    capitalMarkers.forEach(m => map.removeLayer(m));
    capitalMarkers = [];
    
    // Rimuovi label
    countryLabels.forEach(l => map.removeLayer(l));
    countryLabels = [];
    
    // FILTRA PER ANNO usando GWSYEAR e GWEYEAR
    const filtered = allData.features.filter(f => {
        const props = f.properties;
        const start = props.GWSYEAR || props.gwsyear || 0;
        const end = props.GWEYEAR || props.gweyear || 9999;
        return start <= year && end >= year;
    });
    
    console.log(`✅ Anno ${year}: ${filtered.length} stati`);
    
    if (filtered.length === 0) {
        console.warn('⚠️ Nessuno stato trovato per questo anno');
        hideLoading();
        return;
    }
    
    // VISUALIZZA
    currentLayer = L.geoJSON({
        type: 'FeatureCollection',
        features: filtered
    }, {
        style: function(feature) {
            const colors = [
                '#3498db', '#2ecc71', '#e74c3c', '#f39c12', 
                '#9b59b6', '#1abc9c', '#e67e22', '#34495e'
            ];
            const code = feature.properties.GWCODE || feature.properties.gwcode || 0;
            const colorIndex = code % colors.length;
            
            return {
                fillColor: colors[colorIndex],
                weight: 1.5,
                opacity: 1,
                color: '#2c3e50',
                fillOpacity: 0.7
            };
        },
        onEachFeature: function(feature, layer) {
            const props = feature.properties;
            const name = props.CNTRY_NAME || props.cntry_name || props.NAME || 'Unknown';
            const code = props.GWCODE || props.gwcode || 'N/A';
            const cap = props.CAPNAME || props.capname || 'N/A';
            
            layer.bindPopup(`
                <div class="country-popup">
                    <h4>${name}</h4>
                    <p><strong>Codice GW:</strong> ${code}</p>
                    <p><strong>Capitale:</strong> ${cap}</p>
                    <p><strong>Anno:</strong> ${year}</p>
                </div>
            `);
            
            // Hover
            layer.on('mouseover', function(e) {
                e.target.setStyle({
                    weight: 3,
                    color: '#e74c3c',
                    fillOpacity: 0.9
                });
            });
            
            layer.on('mouseout', function(e) {
                currentLayer.resetStyle(e.target);
            });
            
            // Click
            layer.on('click', function() {
                showCountryDetails(props);
            });
        }
    }).addTo(map);
    
    console.log('✅ Layer aggiunto');
    
    // Capitali
    if (showCapitals) {
        addCapitalMarkers(filtered);
    }
    
    // Labels
    if (showLabels) {
        addCountryLabels(filtered);
    }
    
    // Stats
    updateStatistics(filtered);
    
    hideLoading();
}

// ========================================
// CAPITALI
// ========================================

function addCapitalMarkers(features) {
    let added = 0;
    
    features.forEach(f => {
        const p = f.properties;
        const lat = p.CAPLAT || p.caplat;
        const lon = p.CAPLONG || p.caplong;
        const name = p.CAPNAME || p.capname;
        
        if (lat && lon && name) {
            const marker = L.circleMarker([lat, lon], {
                radius: 5,
                fillColor: '#e74c3c',
                color: '#fff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(map);
            
            marker.bindTooltip(name, {
                permanent: false,
                direction: 'top',
                className: 'capital-tooltip'
            });
            
            capitalMarkers.push(marker);
            added++;
        }
    });
    
    console.log(`✅ ${added} capitali aggiunte`);
}

// ========================================
// LABELS
// ========================================

function addCountryLabels(features) {
    let added = 0;
    
    features.forEach(f => {
        if (f.geometry) {
            let coords;
            
            if (f.geometry.type === 'MultiPolygon') {
                coords = f.geometry.coordinates[0][0];
            } else if (f.geometry.type === 'Polygon') {
                coords = f.geometry.coordinates[0];
            }
            
            if (coords && coords.length > 0) {
                const avgLon = coords.reduce((sum, c) => sum + c[0], 0) / coords.length;
                const avgLat = coords.reduce((sum, c) => sum + c[1], 0) / coords.length;
                
                const name = f.properties.NAME || 
                           f.properties.name || 
                           f.properties.CNTRY_NAME || 
                           f.properties.cntry_name || '';
                
                if (name) {
                    const label = L.marker([avgLat, avgLon], {
                        icon: L.divIcon({
                            className: 'country-label',
                            html: name,
                            iconSize: [100, 20]
                        })
                    }).addTo(map);
                    
                    countryLabels.push(label);
                    added++;
                }
            }
        }
    });
    
    console.log(`✅ ${added} etichette aggiunte`);
}

// ========================================
// DETTAGLI PAESE
// ========================================

function showCountryDetails(props) {
    const div = document.getElementById('territory-details');
    if (!div) return;
    
    const name = props.CNTRY_NAME || props.cntry_name || props.NAME || 'Sconosciuto';
    const code = props.GWCODE || props.gwcode || 'N/A';
    const iso = props.ISO1AL3 || props.iso1al3 || 'N/A';
    const cap = props.CAPNAME || props.capname || 'N/A';
    const lat = props.CAPLAT || props.caplat || 0;
    const lon = props.CAPLONG || props.caplong || 0;
    const start = props.GWSYEAR || props.gwsyear || '?';
    const end = props.GWEYEAR || props.gweyear || '?';
    const area = props.AREA || props.area || 0;
    
    div.innerHTML = `
        <h4>${name}</h4>
        <hr>
        <p><strong>Codice GW:</strong> ${code}</p>
        <p><strong>ISO:</strong> ${iso}</p>
        <p><strong>Capitale:</strong> ${cap}</p>
        <p><strong>Coordinate:</strong> ${lat ? lat.toFixed(2) : 'N/A'}°N, ${lon ? lon.toFixed(2) : 'N/A'}°E</p>
        <p><strong>Periodo:</strong> ${start} - ${end}</p>
        <p><strong>Area:</strong> ${formatArea(area)} km²</p>
    `;
}

// ========================================
// STATISTICHE
// ========================================

function updateStatistics(features) {
    const total = features.length;
    const area = features.reduce((sum, f) => sum + (f.properties.AREA || f.properties.area || 0), 0);
    const caps = features.filter(f => f.properties.CAPNAME || f.properties.capname).length;
    
    const stateCount = document.getElementById('state-count');
    const totalArea = document.getElementById('total-area');
    const capCount = document.getElementById('capital-count');
    const currYear = document.getElementById('current-year');
    
    if (stateCount) stateCount.textContent = total;
    if (totalArea) totalArea.textContent = formatArea(area);
    if (capCount) capCount.textContent = caps;
    if (currYear) currYear.textContent = currentYear;
}

// ========================================
// UTILITY
// ========================================

function formatArea(area) {
    if (!area || area === 0) return 'N/A';
    return new Intl.NumberFormat('it-IT', {
        maximumFractionDigits: 0
    }).format(area);
}

function showLoading(text = 'Caricamento...') {
    const overlay = document.getElementById('loading-overlay');
    const textEl = document.getElementById('loading-text');
    if (overlay) overlay.style.display = 'flex';
    if (textEl) textEl.textContent = text;
}

function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = 'none';
}

// ========================================
// EVENT LISTENERS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎬 DOM Ready');
    
    initMap();
    loadCShapesDataset();
    
    // Dropdown anno
    const yearSelect = document.getElementById('year-select');
    if (yearSelect) {
        yearSelect.addEventListener('change', function(e) {
            currentYear = parseInt(e.target.value);
            const slider = document.getElementById('year-slider');
            const display = document.getElementById('slider-year');
            if (slider) slider.value = currentYear;
            if (display) display.textContent = currentYear;
            filterAndDisplayYear(currentYear);
        });
    }
    
    // Slider
    const yearSlider = document.getElementById('year-slider');
    if (yearSlider) {
        let timeout;
        yearSlider.addEventListener('input', function(e) {
            currentYear = parseInt(e.target.value);
            const display = document.getElementById('slider-year');
            if (display) display.textContent = currentYear;
            
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (yearSelect) {
                    const options = Array.from(yearSelect.options);
                    const closest = options.reduce((p, c) => {
                        return Math.abs(parseInt(c.value) - currentYear) < Math.abs(parseInt(p.value) - currentYear) ? c : p;
                    });
                    yearSelect.value = closest.value;
                }
                filterAndDisplayYear(currentYear);
            }, 300);
        });
    }
    
    // Toggle labels
    const showLabelsCheck = document.getElementById('show-labels');
    if (showLabelsCheck) {
        showLabelsCheck.addEventListener('change', function(e) {
            showLabels = e.target.checked;
            
            if (showLabels && allData) {
                const features = allData.features.filter(f => {
                    const start = f.properties.GWSYEAR || f.properties.gwsyear || 0;
                    const end = f.properties.GWEYEAR || f.properties.gweyear || 9999;
                    return start <= currentYear && end >= currentYear;
                });
                addCountryLabels(features);
            } else {
                countryLabels.forEach(l => map.removeLayer(l));
                countryLabels = [];
            }
        });
    }
    
    // Toggle capitals
    const showCapsCheck = document.getElementById('show-capitals');
    if (showCapsCheck) {
        showCapsCheck.addEventListener('change', function(e) {
            showCapitals = e.target.checked;
            
            if (showCapitals && allData) {
                const features = allData.features.filter(f => {
                    const start = f.properties.GWSYEAR || f.properties.gwsyear || 0;
                    const end = f.properties.GWEYEAR || f.properties.gweyear || 9999;
                    return start <= currentYear && end >= currentYear;
                });
                addCapitalMarkers(features);
            } else {
                capitalMarkers.forEach(m => map.removeLayer(m));
                capitalMarkers = [];
            }
        });
    }
});

console.log('✅ Script caricato');
