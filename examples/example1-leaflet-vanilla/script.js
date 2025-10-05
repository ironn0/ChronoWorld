// Dati storici con confini poligonali (coordinate GeoJSON semplificate)
const historicalData = {
    1800: {
        territories: [
            {
                name: "Impero Austriaco",
                polygon: [
                    [48.5, 22.0], [49.0, 18.0], [48.2, 16.4], [47.5, 13.0],
                    [46.5, 13.5], [46.0, 15.0], [45.5, 14.0], [45.0, 15.5],
                    [46.0, 17.0], [47.0, 19.0], [47.5, 21.0], [48.5, 22.0]
                ],
                color: "#FFD700",
                info: "L'Impero Austriaco era una delle grandi potenze europee, governato dagli Asburgo."
            },
            {
                name: "Francia Napoleonica",
                polygon: [
                    [51.0, 2.5], [50.5, -1.5], [48.5, -4.5], [47.0, -2.0],
                    [43.5, -1.0], [43.0, 3.0], [42.5, 7.0], [44.0, 8.5],
                    [45.5, 7.0], [47.5, 7.5], [49.0, 6.0], [50.0, 4.0], [51.0, 2.5]
                ],
                color: "#0055A4",
                info: "Sotto Napoleone, la Francia dominava gran parte dell'Europa continentale."
            },
            {
                name: "Regno di Prussia",
                polygon: [
                    [54.5, 14.0], [54.0, 9.0], [52.0, 7.0], [51.5, 10.0],
                    [50.5, 12.0], [51.0, 14.5], [52.5, 15.0], [54.0, 14.5], [54.5, 14.0]
                ],
                color: "#000000",
                info: "La Prussia era un potente regno tedesco, precursore dell'unificazione tedesca."
            }
        ]
    },
    1914: {
        territories: [
            {
                name: "Impero Austro-Ungarico",
                polygon: [
                    [49.0, 22.5], [49.5, 17.0], [48.2, 16.4], [47.0, 12.5],
                    [46.0, 13.0], [45.5, 14.5], [44.5, 18.0], [45.0, 20.5],
                    [46.5, 22.0], [48.0, 23.5], [49.0, 22.5]
                ],
                color: "#FFD700",
                info: "L'Impero Austro-Ungarico alla vigilia della Prima Guerra Mondiale."
            },
            {
                name: "Impero Tedesco",
                polygon: [
                    [55.0, 9.0], [54.5, 14.0], [53.0, 14.5], [50.5, 15.0],
                    [48.0, 13.0], [47.5, 10.0], [47.5, 7.5], [49.0, 6.0],
                    [51.0, 6.0], [53.5, 7.0], [55.0, 9.0]
                ],
                color: "#000000",
                info: "L'Impero Tedesco unificato sotto i Hohenzollern, potenza industriale europea."
            },
            {
                name: "Francia",
                polygon: [
                    [51.0, 2.5], [50.5, -1.5], [48.5, -4.5], [47.0, -2.0],
                    [43.5, -1.0], [43.0, 3.0], [42.5, 7.0], [44.0, 8.5],
                    [45.5, 7.0], [47.5, 7.5], [49.0, 6.0], [50.0, 4.0], [51.0, 2.5]
                ],
                color: "#0055A4",
                info: "La Terza Repubblica Francese, rivale della Germania dopo la guerra del 1870."
            },
            {
                name: "Impero Russo",
                polygon: [
                    [70.0, 30.0], [65.0, 180.0], [50.0, 180.0], [45.0, 150.0],
                    [44.0, 40.0], [47.0, 28.0], [52.0, 25.0], [60.0, 28.0], [70.0, 30.0]
                ],
                color: "#DA291C",
                info: "L'Impero Russo governato dagli zar Romanov, esteso dall'Europa all'Asia."
            },
            {
                name: "Regno Unito",
                polygon: [
                    [60.5, -1.0], [59.0, -3.0], [57.5, -7.0], [55.0, -6.0],
                    [53.5, -5.0], [51.5, -5.5], [50.0, -5.0], [50.5, 1.5],
                    [52.0, 2.0], [54.0, 0.0], [56.0, -2.0], [58.0, -3.0], [60.5, -1.0]
                ],
                color: "#C8102E",
                info: "Il Regno Unito al culmine del suo impero coloniale."
            }
        ]
    },
    1945: {
        territories: [
            {
                name: "Germania Occupata",
                polygon: [
                    [55.0, 9.0], [54.5, 14.0], [53.0, 14.5], [50.5, 15.0],
                    [48.0, 13.0], [47.5, 10.0], [47.5, 7.5], [49.0, 6.0],
                    [51.0, 6.0], [53.5, 7.0], [55.0, 9.0]
                ],
                color: "#808080",
                info: "Germania divisa in zone di occupazione dopo la Seconda Guerra Mondiale."
            },
            {
                name: "Francia Liberata",
                polygon: [
                    [51.0, 2.5], [50.5, -1.5], [48.5, -4.5], [47.0, -2.0],
                    [43.5, -1.0], [43.0, 3.0], [42.5, 7.0], [44.0, 8.5],
                    [45.5, 7.0], [47.5, 7.5], [49.0, 6.0], [50.0, 4.0], [51.0, 2.5]
                ],
                color: "#0055A4",
                info: "La Francia liberata dagli Alleati, membro vittorioso della coalizione."
            },
            {
                name: "Unione Sovietica",
                polygon: [
                    [70.0, 30.0], [65.0, 180.0], [50.0, 180.0], [45.0, 150.0],
                    [44.0, 40.0], [47.0, 25.0], [52.0, 22.0], [60.0, 28.0], [70.0, 30.0]
                ],
                color: "#DA291C",
                info: "L'URSS emerge come superpotenza dopo la vittoria sul nazismo."
            },
            {
                name: "Regno Unito",
                polygon: [
                    [60.5, -1.0], [59.0, -3.0], [57.5, -7.0], [55.0, -6.0],
                    [53.5, -5.0], [51.5, -5.5], [50.0, -5.0], [50.5, 1.5],
                    [52.0, 2.0], [54.0, 0.0], [56.0, -2.0], [58.0, -3.0], [60.5, -1.0]
                ],
                color: "#C8102E",
                info: "Il Regno Unito vittorioso ma economicamente indebolito dalla guerra."
            }
        ]
    },
    2024: {
        territories: [
            {
                name: "Germania",
                polygon: [
                    [55.0, 9.0], [54.5, 14.0], [53.0, 14.5], [50.5, 15.0],
                    [48.0, 13.0], [47.5, 10.0], [47.5, 7.5], [49.0, 6.0],
                    [51.0, 6.0], [53.5, 7.0], [55.0, 9.0]
                ],
                color: "#000000",
                info: "Germania riunificata dal 1990, potenza economica dell'Unione Europea."
            },
            {
                name: "Francia",
                polygon: [
                    [51.0, 2.5], [50.5, -1.5], [48.5, -4.5], [47.0, -2.0],
                    [43.5, -1.0], [43.0, 3.0], [42.5, 7.0], [44.0, 8.5],
                    [45.5, 7.0], [47.5, 7.5], [49.0, 6.0], [50.0, 4.0], [51.0, 2.5]
                ],
                color: "#0055A4",
                info: "Francia moderna, membro fondatore dell'UE e potenza nucleare."
            },
            {
                name: "Russia",
                polygon: [
                    [70.0, 30.0], [65.0, 180.0], [50.0, 180.0], [45.0, 150.0],
                    [44.0, 40.0], [47.0, 28.0], [52.0, 25.0], [60.0, 28.0], [70.0, 30.0]
                ],
                color: "#0033A0",
                info: "Federazione Russa dopo la dissoluzione dell'URSS nel 1991."
            },
            {
                name: "Regno Unito",
                polygon: [
                    [60.5, -1.0], [59.0, -3.0], [57.5, -7.0], [55.0, -6.0],
                    [53.5, -5.0], [51.5, -5.5], [50.0, -5.0], [50.5, 1.5],
                    [52.0, 2.0], [54.0, 0.0], [56.0, -2.0], [58.0, -3.0], [60.5, -1.0]
                ],
                color: "#C8102E",
                info: "Regno Unito post-Brexit, fuori dall'Unione Europea dal 2020."
            },
            {
                name: "Italia",
                polygon: [
                    [47.0, 12.5], [46.5, 13.5], [45.5, 14.0], [44.0, 12.5],
                    [41.5, 12.5], [38.0, 15.5], [37.5, 15.0], [40.0, 9.5],
                    [41.5, 9.0], [44.0, 8.0], [45.5, 7.5], [47.0, 12.5]
                ],
                color: "#009246",
                info: "Repubblica Italiana, membro fondatore dell'UE."
            }
        ]
    }
};

// Inizializzazione della mappa
const map = L.map('map').setView([50.0, 10.0], 4);

// Tile layer SENZA confini moderni - solo geografia fisica
// Opzione 1: CartoDB Positron senza confini né etichette (SOLO geografia)
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap, © CartoDB',
    maxZoom: 19,
    opacity: 0.6 // Leggera trasparenza per far risaltare i confini storici
}).addTo(map);

// ALTRE OPZIONI DISPONIBILI (commenta quella sopra e decommenta una di queste):

// Opzione 2: Stamen Watercolor (stile artistico SENZA confini moderni)
// L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg', {
//     attribution: '© Stamen Design, © OpenStreetMap',
//     maxZoom: 16,
//     opacity: 0.7
// }).addTo(map);

// Opzione 3: Stamen Terrain (solo geografia fisica SENZA confini)
// L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain_background/{z}/{x}/{y}.png', {
//     attribution: '© Stamen Design, © OpenStreetMap',
//     maxZoom: 18,
//     opacity: 0.6
// }).addTo(map);

// Opzione 4: Esri World Physical (solo geografia, nessun confine)
// L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}', {
//     attribution: '© Esri',
//     maxZoom: 8,
//     opacity: 0.5
// }).addTo(map);

// Opzione 5: SFONDO NEUTRO (solo colore, nessuna mappa)
// let neutralBg = L.tileLayer('', {
//     attribution: ''
// });
// map.getContainer().style.backgroundColor = '#f0ead6'; // Beige carta antica
// neutralBg.addTo(map);

// Layer group per i territori
let territoriesLayer = L.layerGroup().addTo(map);

// Elementi DOM
const yearDisplay = document.getElementById('currentYear');
const infoContent = document.getElementById('infoContent');
const yearSliderElement = document.getElementById('yearSlider');

// Inizializzazione slider
const yearSlider = noUiSlider.create(yearSliderElement, {
    start: 1914,
    step: 1,
    range: {
        'min': 1800,
        'max': 2024
    },
    pips: {
        mode: 'values',
        values: [1800, 1850, 1900, 1914, 1945, 2000, 2024],
        density: 4
    }
});

// Funzione per trovare l'anno più vicino nei dati
function findClosestYear(year) {
    const availableYears = Object.keys(historicalData).map(Number);
    return availableYears.reduce((prev, curr) => {
        return Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev;
    });
}

// Funzione per aggiornare la mappa
function updateMap(year) {
    const closestYear = findClosestYear(year);
    yearDisplay.textContent = year;
    
    // Rimuovi i territori esistenti
    territoriesLayer.clearLayers();
    
    // Aggiungi nuovi territori con poligoni
    if (historicalData[closestYear]) {
        historicalData[closestYear].territories.forEach(territory => {
            // Crea un poligono per rappresentare il territorio
            const polygon = L.polygon(territory.polygon, {
                color: territory.color,
                fillColor: territory.color,
                fillOpacity: 0.5,
                weight: 3,
                opacity: 0.8,
                className: 'country-polygon'
            });
            
            // Aggiungi popup
            polygon.bindPopup(`<b>${territory.name}</b><br>${territory.info}`);
            
            // Aggiungi tooltip al passaggio del mouse
            polygon.bindTooltip(territory.name, {
                permanent: false,
                direction: 'center',
                className: 'territory-tooltip'
            });
            
            // Aggiungi effetti hover
            polygon.on('mouseover', function() {
                this.setStyle({
                    fillOpacity: 0.7,
                    weight: 4
                });
            });
            
            polygon.on('mouseout', function() {
                this.setStyle({
                    fillOpacity: 0.5,
                    weight: 3
                });
            });
            
            // Aggiungi evento click
            polygon.on('click', () => {
                infoContent.innerHTML = `
                    <h4>${territory.name}</h4>
                    <p><strong>Anno:</strong> ${closestYear}</p>
                    <p>${territory.info}</p>
                `;
                
                // Zoom sul territorio
                map.fitBounds(polygon.getBounds(), {
                    padding: [50, 50],
                    maxZoom: 6
                });
            });
            
            polygon.addTo(territoriesLayer);
        });
    }
    
    // Aggiorna info panel
    if (year !== closestYear) {
        infoContent.innerHTML = `
            <p><em>Visualizzazione dati per l'anno ${closestYear} (anno più vicino disponibile).</em></p>
            <p>Seleziona un territorio sulla mappa per vedere le informazioni dettagliate.</p>
        `;
    }
}

// Event listener per lo slider
yearSlider.on('update', (values) => {
    const year = Math.round(values[0]);
    updateMap(year);
});

// Inizializza con l'anno 1914
updateMap(1914);

// Animazione automatica (opzionale)
function animateTimeline() {
    let currentYear = 1800;
    const interval = setInterval(() => {
        currentYear += 10;
        if (currentYear > 2024) {
            clearInterval(interval);
            return;
        }
        yearSlider.set(currentYear);
    }, 1000);
}

// Puoi chiamare animateTimeline() per vedere l'animazione automatica
// animateTimeline();
