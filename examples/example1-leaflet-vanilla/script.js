// Dati storici simulati (in un progetto reale, questi verrebbero da file GeoJSON)
const historicalData = {
    1800: {
        territories: [
            {
                name: "Impero Austriaco",
                coords: [[48.2082, 16.3738], [46.0569, 14.5058], [45.4408, 12.3155]],
                color: "#FFD700",
                info: "L'Impero Austriaco era una delle grandi potenze europee, governato dagli Asburgo."
            },
            {
                name: "Francia Napoleonica",
                coords: [[48.8566, 2.3522], [45.7640, 4.8357], [43.2965, 5.3698]],
                color: "#0055A4",
                info: "Sotto Napoleone, la Francia dominava gran parte dell'Europa continentale."
            },
            {
                name: "Regno di Prussia",
                coords: [[52.5200, 13.4050], [51.3397, 12.3731], [50.0755, 14.4378]],
                color: "#000000",
                info: "La Prussia era un potente regno tedesco, precursore dell'unificazione tedesca."
            }
        ]
    },
    1914: {
        territories: [
            {
                name: "Impero Austro-Ungarico",
                coords: [[48.2082, 16.3738], [47.4979, 19.0402], [45.8150, 15.9819]],
                color: "#FFD700",
                info: "L'Impero Austro-Ungarico alla vigilia della Prima Guerra Mondiale."
            },
            {
                name: "Impero Tedesco",
                coords: [[52.5200, 13.4050], [50.1109, 8.6821], [48.1351, 11.5820]],
                color: "#000000",
                info: "L'Impero Tedesco unificato sotto i Hohenzollern, potenza industriale europea."
            },
            {
                name: "Francia",
                coords: [[48.8566, 2.3522], [45.7640, 4.8357], [43.6047, 1.4442]],
                color: "#0055A4",
                info: "La Terza Repubblica Francese, rivale della Germania dopo la guerra del 1870."
            },
            {
                name: "Impero Russo",
                coords: [[55.7558, 37.6173], [59.9343, 30.3351], [51.5074, 31.2718]],
                color: "#DA291C",
                info: "L'Impero Russo governato dagli zar Romanov, esteso dall'Europa all'Asia."
            }
        ]
    },
    1945: {
        territories: [
            {
                name: "Germania Occupata",
                coords: [[52.5200, 13.4050], [50.1109, 8.6821], [48.1351, 11.5820]],
                color: "#808080",
                info: "Germania divisa in zone di occupazione dopo la Seconda Guerra Mondiale."
            },
            {
                name: "Francia Liberata",
                coords: [[48.8566, 2.3522], [45.7640, 4.8357], [43.6047, 1.4442]],
                color: "#0055A4",
                info: "La Francia liberata dagli Alleati, membro vittorioso della coalizione."
            },
            {
                name: "Unione Sovietica",
                coords: [[55.7558, 37.6173], [59.9343, 30.3351], [53.9045, 27.5615]],
                color: "#DA291C",
                info: "L'URSS emerge come superpotenza dopo la vittoria sul nazismo."
            }
        ]
    },
    2024: {
        territories: [
            {
                name: "Germania",
                coords: [[52.5200, 13.4050], [50.1109, 8.6821], [48.1351, 11.5820]],
                color: "#000000",
                info: "Germania riunificata dal 1990, potenza economica dell'Unione Europea."
            },
            {
                name: "Francia",
                coords: [[48.8566, 2.3522], [45.7640, 4.8357], [43.6047, 1.4442]],
                color: "#0055A4",
                info: "Francia moderna, membro fondatore dell'UE e potenza nucleare."
            },
            {
                name: "Russia",
                coords: [[55.7558, 37.6173], [59.9343, 30.3351], [51.5074, 31.2718]],
                color: "#0033A0",
                info: "Federazione Russa dopo la dissoluzione dell'URSS nel 1991."
            }
        ]
    }
};

// Inizializzazione della mappa
const map = L.map('map').setView([50.0, 10.0], 4);

// Tile layer (mappa base)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18
}).addTo(map);

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
    
    // Aggiungi nuovi territori
    if (historicalData[closestYear]) {
        historicalData[closestYear].territories.forEach(territory => {
            // Crea un cerchio per rappresentare il territorio (semplificato)
            const circle = L.circle([territory.coords[0][0], territory.coords[0][1]], {
                color: territory.color,
                fillColor: territory.color,
                fillOpacity: 0.6,
                radius: 200000,
                className: 'country-polygon'
            });
            
            // Aggiungi popup
            circle.bindPopup(`<b>${territory.name}</b><br>${territory.info}`);
            
            // Aggiungi evento click
            circle.on('click', () => {
                infoContent.innerHTML = `
                    <h4>${territory.name}</h4>
                    <p><strong>Anno:</strong> ${closestYear}</p>
                    <p>${territory.info}</p>
                `;
            });
            
            circle.addTo(territoriesLayer);
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
