// NOTA: Per usare Mapbox, serve una API key gratuita da https://www.mapbox.com/
// Sostituisci 'YOUR_MAPBOX_TOKEN' con la tua chiave

const { useState, useEffect, useRef } = React;

// Dati storici con coordinate GeoJSON
const historicalData = {
    1800: {
        year: 1800,
        description: "Europa post-rivoluzionaria con l'ascesa di Napoleone",
        territories: [
            {
                id: 'austria-1800',
                name: "Impero Austriaco",
                coordinates: [16.3738, 48.2082],
                bounds: [[14, 46], [18, 50]],
                color: "#FFD700",
                info: "L'Impero Austriaco era una delle grandi potenze europee, governato dagli Asburgo. Controllava vasti territori in Europa centrale e orientale."
            },
            {
                id: 'france-1800',
                name: "Francia Napoleonica",
                coordinates: [2.3522, 48.8566],
                bounds: [[0, 42], [8, 51]],
                color: "#0055A4",
                info: "Sotto Napoleone Bonaparte, la Francia stava espandendo il suo controllo su gran parte dell'Europa continentale attraverso conquiste militari."
            },
            {
                id: 'prussia-1800',
                name: "Regno di Prussia",
                coordinates: [13.4050, 52.5200],
                bounds: [[11, 50], [15, 54]],
                color: "#000000",
                info: "La Prussia era un potente regno tedesco, precursore dell'unificazione tedesca del 1871."
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
                bounds: [[13, 45], [22, 50]],
                color: "#FFD700",
                info: "L'Impero Austro-Ungarico alla vigilia della Prima Guerra Mondiale. La monarchia duale controllava un vasto territorio multietnico."
            },
            {
                id: 'germany-1914',
                name: "Impero Tedesco",
                coordinates: [13.4050, 52.5200],
                bounds: [[6, 47], [15, 55]],
                color: "#000000",
                info: "L'Impero Tedesco unificato sotto i Hohenzollern, principale potenza industriale e militare dell'Europa continentale."
            },
            {
                id: 'france-1914',
                name: "Francia",
                coordinates: [2.3522, 48.8566],
                bounds: [[-5, 42], [8, 51]],
                color: "#0055A4",
                info: "La Terza Repubblica Francese, rivale della Germania dopo la sconfitta del 1870. Alleata con Russia e Regno Unito."
            },
            {
                id: 'russia-1914',
                name: "Impero Russo",
                coordinates: [37.6173, 55.7558],
                bounds: [[20, 50], [50, 70]],
                color: "#DA291C",
                info: "L'Impero Russo degli zar Romanov, esteso dall'Europa all'Asia. Il più grande impero territoriale del tempo."
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
                bounds: [[6, 47], [15, 55]],
                color: "#808080",
                info: "Germania divisa in quattro zone di occupazione (USA, UK, Francia, URSS) dopo la sconfitta nazista."
            },
            {
                id: 'france-1945',
                name: "Francia Liberata",
                coordinates: [2.3522, 48.8566],
                bounds: [[-5, 42], [8, 51]],
                color: "#0055A4",
                info: "La Francia liberata dagli Alleati nel 1944, membro vittorioso della coalizione anti-Asse."
            },
            {
                id: 'soviet-union-1945',
                name: "Unione Sovietica",
                coordinates: [37.6173, 55.7558],
                bounds: [[20, 45], [180, 70]],
                color: "#DA291C",
                info: "L'URSS emerge come superpotenza dopo la vittoria sul nazismo, con influenza su tutta l'Europa orientale."
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
                bounds: [[6, 47], [15, 55]],
                color: "#000000",
                info: "Germania riunificata dal 1990, potenza economica dell'Unione Europea e leader dell'integrazione europea."
            },
            {
                id: 'france-2024',
                name: "Francia",
                coordinates: [2.3522, 48.8566],
                bounds: [[-5, 42], [8, 51]],
                color: "#0055A4",
                info: "Francia moderna, membro fondatore dell'UE, potenza nucleare e membro permanente del Consiglio di Sicurezza ONU."
            },
            {
                id: 'russia-2024',
                name: "Federazione Russa",
                coordinates: [37.6173, 55.7558],
                bounds: [[20, 50], [180, 70]],
                color: "#0033A0",
                info: "Federazione Russa dopo la dissoluzione dell'URSS nel 1991. Ancora la nazione più estesa del mondo."
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
    const markersRef = useRef([]);

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

    // Inizializza la mappa
    useEffect(() => {
        if (mapInstance.current) return; // Mappa già inizializzata

        // NOTA: Sostituisci con il tuo Mapbox token
        mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example';
        
        try {
            mapInstance.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/dark-v11', // Stile dark elegante
                center: [10.0, 50.0],
                zoom: 3.5,
                projection: 'mercator'
            });

            mapInstance.current.on('load', () => {
                setMapLoaded(true);
            });

            // Controlli di navigazione
            mapInstance.current.addControl(new mapboxgl.NavigationControl());
        } catch (error) {
            console.error('Errore inizializzazione Mapbox:', error);
            // Fallback: mostra messaggio
            setMapLoaded(true);
        }

        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove();
            }
        };
    }, []);

    // Aggiorna markers quando cambia l'anno
    useEffect(() => {
        if (!mapLoaded || !mapInstance.current) return;

        // Rimuovi markers esistenti
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        // Aggiungi nuovi markers
        currentData.territories.forEach(territory => {
            const el = document.createElement('div');
            el.className = 'marker';
            el.style.width = '30px';
            el.style.height = '30px';
            el.style.borderRadius = '50%';
            el.style.backgroundColor = territory.color;
            el.style.border = '3px solid white';
            el.style.cursor = 'pointer';
            el.style.boxShadow = '0 4px 10px rgba(0,0,0,0.5)';
            el.style.transition = 'all 0.3s ease';

            el.addEventListener('mouseenter', () => {
                el.style.transform = 'scale(1.3)';
                el.style.zIndex = '1000';
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'scale(1)';
            });

            el.addEventListener('click', () => {
                setSelectedTerritory(territory);
            });

            const marker = new mapboxgl.Marker(el)
                .setLngLat(territory.coordinates)
                .addTo(mapInstance.current);

            markersRef.current.push(marker);
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
