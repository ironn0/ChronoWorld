// Questo esempio usa Leaflet invece di Mapbox per evitare la necessità di API key
// Puoi comunque passare a Mapbox se preferisci la grafica più avanzata

const { useState, useEffect, useRef } = React;

// Dati storici con poligoni GeoJSON
const historicalData = {
    1800: {
        year: 1800,
        description: "Europa post-rivoluzionaria con l'ascesa di Napoleone",
        territories: [
            {
                id: 'austria-1800',
                name: "Impero Austriaco",
                coordinates: [16.3738, 48.2082],
                polygon: [
                    [22.0, 48.5], [18.0, 49.0], [16.4, 48.2], [13.0, 47.5],
                    [13.5, 46.5], [15.0, 46.0], [14.0, 45.5], [15.5, 45.0],
                    [17.0, 46.0], [19.0, 47.0], [21.0, 47.5], [22.0, 48.5]
                ],
                color: "#FFD700",
                info: "L'Impero Austriaco era una delle grandi potenze europee, governato dagli Asburgo."
            },
            {
                id: 'france-1800',
                name: "Francia Napoleonica",
                coordinates: [2.3522, 48.8566],
                polygon: [
                    [2.5, 51.0], [-1.5, 50.5], [-4.5, 48.5], [-2.0, 47.0],
                    [-1.0, 43.5], [3.0, 43.0], [7.0, 42.5], [8.5, 44.0],
                    [7.0, 45.5], [7.5, 47.5], [6.0, 49.0], [4.0, 50.0], [2.5, 51.0]
                ],
                color: "#0055A4",
                info: "Sotto Napoleone Bonaparte, la Francia stava espandendo il suo controllo."
            },
            {
                id: 'prussia-1800',
                name: "Regno di Prussia",
                coordinates: [13.4050, 52.5200],
                polygon: [
                    [14.0, 54.5], [9.0, 54.0], [7.0, 52.0], [10.0, 51.5],
                    [12.0, 50.5], [14.5, 51.0], [15.0, 52.5], [14.5, 54.0], [14.0, 54.5]
                ],
                color: "#000000",
                info: "La Prussia era un potente regno tedesco."
            }
        ]
    },
    1914: {
        year: 1914,
        description: "Vigilia della Prima Guerra Mondiale - Tensioni imperiali",
        territories: [
            {
                id: 'austria-hungary-1914',
                name: "Impero Austro-Ungarico",
                coordinates: [16.3738, 48.2082],
                polygon: [
                    [22.5, 49.0], [17.0, 49.5], [16.4, 48.2], [12.5, 47.0],
                    [13.0, 46.0], [14.5, 45.5], [18.0, 44.5], [20.5, 45.0],
                    [22.0, 46.5], [23.5, 48.0], [22.5, 49.0]
                ],
                color: "#FFD700",
                info: "L'Impero Austro-Ungarico alla vigilia della Prima Guerra Mondiale."
            },
            {
                id: 'germany-1914',
                name: "Impero Tedesco",
                coordinates: [13.4050, 52.5200],
                polygon: [
                    [9.0, 55.0], [14.0, 54.5], [14.5, 53.0], [15.0, 50.5],
                    [13.0, 48.0], [10.0, 47.5], [7.5, 47.5], [6.0, 49.0],
                    [6.0, 51.0], [7.0, 53.5], [9.0, 55.0]
                ],
                color: "#000000",
                info: "L'Impero Tedesco unificato sotto i Hohenzollern."
            },
            {
                id: 'france-1914',
                name: "Francia",
                coordinates: [2.3522, 48.8566],
                polygon: [
                    [2.5, 51.0], [-1.5, 50.5], [-4.5, 48.5], [-2.0, 47.0],
                    [-1.0, 43.5], [3.0, 43.0], [7.0, 42.5], [8.5, 44.0],
                    [7.0, 45.5], [7.5, 47.5], [6.0, 49.0], [4.0, 50.0], [2.5, 51.0]
                ],
                color: "#0055A4",
                info: "La Terza Repubblica Francese, rivale della Germania."
            },
            {
                id: 'russia-1914',
                name: "Impero Russo",
                coordinates: [37.6173, 55.7558],
                polygon: [
                    [30.0, 70.0], [180.0, 65.0], [180.0, 50.0], [150.0, 45.0],
                    [40.0, 44.0], [28.0, 47.0], [25.0, 52.0], [28.0, 60.0], [30.0, 70.0]
                ],
                color: "#DA291C",
                info: "L'Impero Russo degli zar Romanov."
            }
        ]
    },
    1945: {
        year: 1945,
        description: "Fine della Seconda Guerra Mondiale - Europa divisa",
        territories: [
            {
                id: 'germany-occupied-1945',
                name: "Germania Occupata",
                coordinates: [13.4050, 52.5200],
                polygon: [
                    [9.0, 55.0], [14.0, 54.5], [14.5, 53.0], [15.0, 50.5],
                    [13.0, 48.0], [10.0, 47.5], [7.5, 47.5], [6.0, 49.0],
                    [6.0, 51.0], [7.0, 53.5], [9.0, 55.0]
                ],
                color: "#808080",
                info: "Germania divisa in quattro zone di occupazione."
            },
            {
                id: 'france-1945',
                name: "Francia Liberata",
                coordinates: [2.3522, 48.8566],
                polygon: [
                    [2.5, 51.0], [-1.5, 50.5], [-4.5, 48.5], [-2.0, 47.0],
                    [-1.0, 43.5], [3.0, 43.0], [7.0, 42.5], [8.5, 44.0],
                    [7.0, 45.5], [7.5, 47.5], [6.0, 49.0], [4.0, 50.0], [2.5, 51.0]
                ],
                color: "#0055A4",
                info: "La Francia liberata dagli Alleati nel 1944."
            },
            {
                id: 'soviet-union-1945',
                name: "Unione Sovietica",
                coordinates: [37.6173, 55.7558],
                polygon: [
                    [30.0, 70.0], [180.0, 65.0], [180.0, 50.0], [150.0, 45.0],
                    [40.0, 44.0], [25.0, 47.0], [22.0, 52.0], [28.0, 60.0], [30.0, 70.0]
                ],
                color: "#DA291C",
                info: "L'URSS emerge come superpotenza."
            }
        ]
    },
    2024: {
        year: 2024,
        description: "Europa moderna - Unione Europea e nuove sfide",
        territories: [
            {
                id: 'germany-2024',
                name: "Germania",
                coordinates: [13.4050, 52.5200],
                polygon: [
                    [9.0, 55.0], [14.0, 54.5], [14.5, 53.0], [15.0, 50.5],
                    [13.0, 48.0], [10.0, 47.5], [7.5, 47.5], [6.0, 49.0],
                    [6.0, 51.0], [7.0, 53.5], [9.0, 55.0]
                ],
                color: "#000000",
                info: "Germania riunificata dal 1990."
            },
            {
                id: 'france-2024',
                name: "Francia",
                coordinates: [2.3522, 48.8566],
                polygon: [
                    [2.5, 51.0], [-1.5, 50.5], [-4.5, 48.5], [-2.0, 47.0],
                    [-1.0, 43.5], [3.0, 43.0], [7.0, 42.5], [8.5, 44.0],
                    [7.0, 45.5], [7.5, 47.5], [6.0, 49.0], [4.0, 50.0], [2.5, 51.0]
                ],
                color: "#0055A4",
                info: "Francia moderna, membro fondatore dell'UE."
            },
            {
                id: 'russia-2024',
                name: "Federazione Russa",
                coordinates: [37.6173, 55.7558],
                polygon: [
                    [30.0, 70.0], [180.0, 65.0], [180.0, 50.0], [150.0, 45.0],
                    [40.0, 44.0], [28.0, 47.0], [25.0, 52.0], [28.0, 60.0], [30.0, 70.0]
                ],
                color: "#0033A0",
                info: "Federazione Russa dopo la dissoluzione dell'URSS."
            }
        ]
    }
};

function ChronoWorldApp() {
    const [currentYear, setCurrentYear] = useState(1914);
    const [selectedTerritory, setSelectedTerritory] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const mapContainer = useRef(null);
    const mapInstance = useRef(null);
    const territoriesLayerRef = useRef(null);

    const quickYears = [1800, 1914, 1945, 2024];

    // Trova l'anno più vicino
    const findClosestYear = (year) => {
        const availableYears = Object.keys(historicalData).map(Number);
        return availableYears.reduce((prev, curr) => {
            return Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev;
        });
    };

    const closestYear = findClosestYear(currentYear);
    const currentData = historicalData[closestYear];

    // Inizializza la mappa con Leaflet
    useEffect(() => {
        if (mapInstance.current) return; // Mappa già inizializzata

        try {
            // Inizializza mappa Leaflet
            mapInstance.current = L.map(mapContainer.current).setView([50.0, 10.0], 4);

            // Aggiungi tile layer SENZA confini moderni - solo geografia
            // Usa mappa base neutra che mostra solo caratteristiche geografiche
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap, © CartoDB',
                maxZoom: 19,
                opacity: 0.5 // Trasparenza per far risaltare i confini storici
            }).addTo(mapInstance.current);
            
            // OPZIONALE: Aggiungi solo nomi di città (senza confini moderni)
            // L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
            //     attribution: '',
            //     maxZoom: 19,
            //     opacity: 0.3,
            //     className: 'city-labels-only' // Mostra solo nomi principali
            // }).addTo(mapInstance.current);

            // Crea layer group per i territori
            territoriesLayerRef.current = L.layerGroup().addTo(mapInstance.current);

            setMapLoaded(true);
        } catch (error) {
            console.error('Errore inizializzazione mappa:', error);
        }

        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove();
            }
        };
    }, []);

    // Aggiorna poligoni quando cambia l'anno
    useEffect(() => {
        if (!mapLoaded || !territoriesLayerRef.current) return;

        // Rimuovi tutti i layer esistenti
        territoriesLayerRef.current.clearLayers();

        // Aggiungi nuovi poligoni
        currentData.territories.forEach(territory => {
            // Converti coordinate da [lng, lat] a [lat, lng] per Leaflet
            const leafletCoords = territory.polygon.map(coord => [coord[1], coord[0]]);
            
            // Crea poligono
            const polygon = L.polygon(leafletCoords, {
                color: territory.color,
                fillColor: territory.color,
                fillOpacity: 0.5,
                weight: 3,
                opacity: 0.8
            });

            // Aggiungi popup
            polygon.bindPopup(`
                <div style="font-family: sans-serif;">
                    <h3 style="margin: 0 0 10px 0; color: ${territory.color};">
                        ${territory.name}
                    </h3>
                    <p style="margin: 0; line-height: 1.6;">
                        ${territory.info}
                    </p>
                </div>
            `);

            // Aggiungi tooltip
            polygon.bindTooltip(territory.name, {
                permanent: false,
                direction: 'center'
            });

            // Effetti hover
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

            // Click per selezionare
            polygon.on('click', () => {
                setSelectedTerritory(territory);
                
                // Zoom sul territorio con animazione
                mapInstance.current.fitBounds(polygon.getBounds(), {
                    padding: [50, 50],
                    maxZoom: 6,
                    animate: true,
                    duration: 1
                });
            });

            // Aggiungi al layer group
            polygon.addTo(territoriesLayerRef.current);
        });

    }, [currentData, mapLoaded]);

    return (
        <div className="app-container">
            <header className="header">
                <h1>🌍 ChronoWorld</h1>
                <p>Esplora i confini storici con tecnologia Mapbox + React</p>
            </header>

            <div className="main-content">
                <div className="map-container">
                    <div ref={mapContainer} id="map">
                        {!mapLoaded && (
                            <div className="loading">
                                <div className="spinner"></div>
                                <p style={{marginTop: '1rem'}}>Caricamento mappa...</p>
                            </div>
                        )}
                    </div>

                    <div className="controls-panel">
                        <div className="year-display">
                            <div className="year-number">{currentYear}</div>
                            {currentYear !== closestYear && (
                                <p style={{fontSize: '0.9rem', color: '#666'}}>
                                    (Dati per {closestYear})
                                </p>
                            )}
                        </div>

                        <div className="slider-container">
                            <input
                                type="range"
                                min="1800"
                                max="2024"
                                value={currentYear}
                                onChange={(e) => setCurrentYear(parseInt(e.target.value))}
                                className="year-slider"
                            />
                            <div className="year-labels">
                                <span>1800</span>
                                <span>2024</span>
                            </div>
                        </div>

                        <div className="quick-years">
                            {quickYears.map(year => (
                                <button
                                    key={year}
                                    className={`year-btn ${currentYear === year ? 'active' : ''}`}
                                    onClick={() => setCurrentYear(year)}
                                >
                                    {year}
                                </button>
                            ))}
                        </div>

                        <p style={{marginTop: '1rem', fontSize: '0.9rem', color: '#666'}}>
                            {currentData.description}
                        </p>
                    </div>

                    {selectedTerritory && (
                        <div className="info-panel">
                            <h3>ℹ️ Informazioni Territorio</h3>
                            <div className="territory-card">
                                <div className="territory-name">
                                    {selectedTerritory.name}
                                </div>
                                <p style={{fontSize: '0.9rem', lineHeight: '1.6'}}>
                                    {selectedTerritory.info}
                                </p>
                                <button
                                    onClick={() => setSelectedTerritory(null)}
                                    style={{
                                        marginTop: '1rem',
                                        padding: '0.5rem 1rem',
                                        background: '#667eea',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Chiudi
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Render dell'app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ChronoWorldApp />);
