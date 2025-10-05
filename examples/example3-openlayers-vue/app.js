const { createApp } = Vue;

// Dati storici completi con poligoni
const historicalDatabase = {
    1800: {
        description: "Europa post-rivoluzionaria con l'ascesa di Napoleone Bonaparte",
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
                info: "L'Impero Austriaco era una delle grandi potenze europee, governato dagli Asburgo.",
                population: "21 milioni"
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
                info: "Sotto Napoleone Bonaparte, la Francia stava espandendo il suo controllo.",
                population: "27 milioni"
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
                info: "La Prussia era un potente regno tedesco.",
                population: "10 milioni"
            }
        ]
    },
    1914: {
        description: "Vigilia della Prima Guerra Mondiale - Tensioni imperiali in Europa",
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
                info: "L'Impero Austro-Ungarico alla vigilia della Prima Guerra Mondiale.",
                population: "52 milioni"
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
                info: "L'Impero Tedesco unificato, principale potenza industriale europea.",
                population: "67 milioni"
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
                info: "La Terza Repubblica Francese, rivale della Germania.",
                population: "39 milioni"
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
                info: "L'Impero Russo degli zar Romanov.",
                population: "175 milioni"
            },
            {
                id: 'uk-1914',
                name: "Regno Unito",
                coordinates: [-0.1276, 51.5074],
                polygon: [
                    [-1.0, 60.5], [-3.0, 59.0], [-7.0, 57.5], [-6.0, 55.0],
                    [-5.0, 53.5], [-5.5, 51.5], [-5.0, 50.0], [1.5, 50.5],
                    [2.0, 52.0], [0.0, 54.0], [-2.0, 56.0], [-3.0, 58.0], [-1.0, 60.5]
                ],
                color: "#C8102E",
                info: "L'Impero Britannico al suo apice.",
                population: "46 milioni"
            }
        ]
    },
    1945: {
        description: "Fine della Seconda Guerra Mondiale - Europa divisa tra Est e Ovest",
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
                info: "Germania divisa in quattro zone di occupazione.",
                population: "65 milioni"
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
                info: "Francia liberata dagli Alleati nel 1944.",
                population: "40 milioni"
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
                info: "L'URSS emerge come superpotenza.",
                population: "170 milioni"
            },
            {
                id: 'uk-1945',
                name: "Regno Unito",
                coordinates: [-0.1276, 51.5074],
                polygon: [
                    [-1.0, 60.5], [-3.0, 59.0], [-7.0, 57.5], [-6.0, 55.0],
                    [-5.0, 53.5], [-5.5, 51.5], [-5.0, 50.0], [1.5, 50.5],
                    [2.0, 52.0], [0.0, 54.0], [-2.0, 56.0], [-3.0, 58.0], [-1.0, 60.5]
                ],
                color: "#C8102E",
                info: "Il Regno Unito vittorioso ma economicamente indebolito.",
                population: "48 milioni"
            }
        ]
    },
    2024: {
        description: "Europa moderna - Unione Europea e nuove sfide geopolitiche",
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
                info: "Germania riunificata dal 1990.",
                population: "84 milioni"
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
                info: "Francia moderna, membro fondatore dell'UE.",
                population: "67 milioni"
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
                info: "Federazione Russa dopo la dissoluzione dell'URSS.",
                population: "144 milioni"
            },
            {
                id: 'uk-2024',
                name: "Regno Unito",
                coordinates: [-0.1276, 51.5074],
                polygon: [
                    [-1.0, 60.5], [-3.0, 59.0], [-7.0, 57.5], [-6.0, 55.0],
                    [-5.0, 53.5], [-5.5, 51.5], [-5.0, 50.0], [1.5, 50.5],
                    [2.0, 52.0], [0.0, 54.0], [-2.0, 56.0], [-3.0, 58.0], [-1.0, 60.5]
                ],
                color: "#C8102E",
                info: "Regno Unito post-Brexit.",
                population: "67 milioni"
            },
            {
                id: 'italy-2024',
                name: "Italia",
                coordinates: [12.4964, 41.9028],
                polygon: [
                    [12.5, 47.0], [13.5, 46.5], [14.0, 45.5], [12.5, 44.0],
                    [12.5, 41.5], [15.5, 38.0], [15.0, 37.5], [9.5, 40.0],
                    [9.0, 41.5], [8.0, 44.0], [7.5, 45.5], [12.5, 47.0]
                ],
                color: "#009246",
                info: "Repubblica Italiana, membro fondatore dell'UE.",
                population: "59 milioni"
            }
        ]
    }
};

createApp({
    data() {
        return {
            currentYear: 1914,
            map: null,
            vectorSource: null,
            vectorLayer: null,
            selectedTerritory: null,
            isAnimating: false,
            animationInterval: null,
            keyPeriods: [
                { year: 1800, label: "Napoleone" },
                { year: 1914, label: "WWI" },
                { year: 1945, label: "WWII" },
                { year: 2024, label: "Oggi" }
            ]
        };
    },
    computed: {
        closestDataYear() {
            const years = Object.keys(historicalDatabase).map(Number);
            return years.reduce((prev, curr) => {
                return Math.abs(curr - this.currentYear) < Math.abs(prev - this.currentYear) 
                    ? curr : prev;
            });
        },
        currentData() {
            return historicalDatabase[this.closestDataYear];
        },
        currentTerritories() {
            return this.currentData?.territories || [];
        },
        currentContext() {
            return this.currentData?.description || '';
        },
        currentPeriod() {
            if (this.currentYear < 1850) return "Epoca Napoleonica";
            if (this.currentYear < 1900) return "Età dell'Imperialismo";
            if (this.currentYear < 1920) return "Prima Guerra Mondiale";
            if (this.currentYear < 1940) return "Periodo Interbellico";
            if (this.currentYear < 1950) return "Seconda Guerra Mondiale";
            if (this.currentYear < 1990) return "Guerra Fredda";
            if (this.currentYear < 2000) return "Fine del XX Secolo";
            return "Era Contemporanea";
        }
    },
    watch: {
        currentYear() {
            this.updateMapLayers();
        }
    },
    mounted() {
        this.initializeMap();
        this.updateMapLayers();
    },
    beforeUnmount() {
        this.stopAnimation();
    },
    methods: {
        initializeMap() {
            // Crea la sorgente vettoriale
            this.vectorSource = new ol.source.Vector();

            // Crea il layer vettoriale con stile per poligoni
            this.vectorLayer = new ol.layer.Vector({
                source: this.vectorSource,
                style: (feature) => {
                    const color = feature.get('color');
                    return new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: color + '80' // Aggiunge trasparenza (50%)
                        }),
                        stroke: new ol.style.Stroke({
                            color: color,
                            width: 3
                        }),
                        text: new ol.style.Text({
                            text: feature.get('name'),
                            font: 'bold 14px sans-serif',
                            fill: new ol.style.Fill({ color: '#fff' }),
                            stroke: new ol.style.Stroke({
                                color: '#000',
                                width: 3
                            })
                        })
                    });
                }
            });

            // Inizializza la mappa SENZA confini moderni - solo geografia fisica
            this.map = new ol.Map({
                target: 'map',
                layers: [
                    // Mappa base SENZA confini e senza etichette - solo geografia
                    new ol.layer.Tile({
                        source: new ol.source.XYZ({
                            url: 'https://{a-d}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                            attributions: '© OpenStreetMap, © CartoDB'
                        }),
                        opacity: 0.6 // Trasparenza per far risaltare i confini storici
                    }),
                    this.vectorLayer
                ],
                view: new ol.View({
                    center: ol.proj.fromLonLat([10.0, 50.0]),
                    zoom: 4
                })
            });
            
            // ALTRE OPZIONI DISPONIBILI (senza confini moderni):
            
            // Stamen Watercolor (artistico, nessun confine):
            // url: 'https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg'
            // opacity: 0.7
            
            // Stamen Terrain Background (solo geografia fisica):
            // url: 'https://tiles.stadiamaps.com/tiles/stamen_terrain_background/{z}/{x}/{y}.png'
            // opacity: 0.6
            
            // Esri World Physical (solo caratteristiche fisiche):
            // url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}'
            // opacity: 0.5
            
            // CartoDB Dark senza confini:
            // url: 'https://{a-d}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png'
            // opacity: 0.6

            // Aggiungi interazione click
            this.map.on('click', (evt) => {
                this.map.forEachFeatureAtPixel(evt.pixel, (feature) => {
                    const territoryId = feature.get('id');
                    this.selectedTerritory = this.currentTerritories.find(t => t.id === territoryId);
                    return true;
                });
            });

            // Cambia cursore su hover
            this.map.on('pointermove', (evt) => {
                const hit = this.map.hasFeatureAtPixel(evt.pixel);
                this.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
            });
        },

        updateMapLayers() {
            if (!this.vectorSource) return;

            // Rimuovi features esistenti
            this.vectorSource.clear();

            // Aggiungi nuove features con poligoni
            this.currentTerritories.forEach(territory => {
                // Crea coordinate del poligono in formato OpenLayers
                const polygonCoords = territory.polygon.map(coord => 
                    ol.proj.fromLonLat([coord[0], coord[1]])
                );
                
                const feature = new ol.Feature({
                    geometry: new ol.geom.Polygon([polygonCoords]),
                    id: territory.id,
                    name: territory.name,
                    color: territory.color
                });

                this.vectorSource.addFeature(feature);
            });

            // Reset selezione se il territorio non esiste più
            if (this.selectedTerritory) {
                const exists = this.currentTerritories.find(
                    t => t.id === this.selectedTerritory.id
                );
                if (!exists) {
                    this.selectedTerritory = null;
                }
            }
        },

        focusTerritory(territory) {
            this.selectedTerritory = territory;
            
            // Centra la mappa sul territorio
            this.map.getView().animate({
                center: ol.proj.fromLonLat(territory.coordinates),
                zoom: 6,
                duration: 1000
            });
        },

        playAnimation() {
            if (this.isAnimating) return;

            this.isAnimating = true;
            let year = parseInt(this.currentYear);

            this.animationInterval = setInterval(() => {
                year += 5;
                if (year > 2024) {
                    this.stopAnimation();
                    return;
                }
                this.currentYear = year;
            }, 500);
        },

        stopAnimation() {
            if (this.animationInterval) {
                clearInterval(this.animationInterval);
                this.animationInterval = null;
            }
            this.isAnimating = false;
        },

        resetAnimation() {
            this.stopAnimation();
            this.currentYear = 1800;
            this.map.getView().animate({
                center: ol.proj.fromLonLat([10.0, 50.0]),
                zoom: 4,
                duration: 1000
            });
        }
    }
}).mount('#app');
