const { createApp } = Vue;

// Dati storici completi
const historicalDatabase = {
    1800: {
        description: "Europa post-rivoluzionaria con l'ascesa di Napoleone Bonaparte",
        territories: [
            {
                id: 'austria-1800',
                name: "Impero Austriaco",
                coordinates: [16.3738, 48.2082],
                color: "#FFD700",
                info: "L'Impero Austriaco era una delle grandi potenze europee, governato dagli Asburgo. Controllava vasti territori in Europa centrale e orientale.",
                population: "21 milioni"
            },
            {
                id: 'france-1800',
                name: "Francia Napoleonica",
                coordinates: [2.3522, 48.8566],
                color: "#0055A4",
                info: "Sotto Napoleone Bonaparte, la Francia stava espandendo il suo controllo su gran parte dell'Europa continentale.",
                population: "27 milioni"
            },
            {
                id: 'prussia-1800',
                name: "Regno di Prussia",
                coordinates: [13.4050, 52.5200],
                color: "#000000",
                info: "La Prussia era un potente regno tedesco, precursore dell'unificazione tedesca del 1871.",
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
                color: "#FFD700",
                info: "L'Impero Austro-Ungarico alla vigilia della Prima Guerra Mondiale. Monarchia duale multietnica.",
                population: "52 milioni"
            },
            {
                id: 'germany-1914',
                name: "Impero Tedesco",
                coordinates: [13.4050, 52.5200],
                color: "#000000",
                info: "L'Impero Tedesco unificato, principale potenza industriale europea.",
                population: "67 milioni"
            },
            {
                id: 'france-1914',
                name: "Francia",
                coordinates: [2.3522, 48.8566],
                color: "#0055A4",
                info: "La Terza Repubblica Francese, rivale della Germania dopo la sconfitta del 1870.",
                population: "39 milioni"
            },
            {
                id: 'russia-1914',
                name: "Impero Russo",
                coordinates: [37.6173, 55.7558],
                color: "#DA291C",
                info: "L'Impero Russo degli zar Romanov, il più grande impero territoriale.",
                population: "175 milioni"
            },
            {
                id: 'uk-1914',
                name: "Regno Unito",
                coordinates: [-0.1276, 51.5074],
                color: "#C8102E",
                info: "L'Impero Britannico al suo apice, controllava un quarto della popolazione mondiale.",
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
                color: "#808080",
                info: "Germania divisa in quattro zone di occupazione dopo la sconfitta nazista.",
                population: "65 milioni"
            },
            {
                id: 'france-1945',
                name: "Francia Liberata",
                coordinates: [2.3522, 48.8566],
                color: "#0055A4",
                info: "Francia liberata dagli Alleati nel 1944, membro vittorioso della coalizione.",
                population: "40 milioni"
            },
            {
                id: 'soviet-union-1945',
                name: "Unione Sovietica",
                coordinates: [37.6173, 55.7558],
                color: "#DA291C",
                info: "L'URSS emerge come superpotenza dopo la vittoria sul nazismo.",
                population: "170 milioni"
            },
            {
                id: 'uk-1945',
                name: "Regno Unito",
                coordinates: [-0.1276, 51.5074],
                color: "#C8102E",
                info: "Il Regno Unito vittorioso ma economicamente indebolito dalla guerra.",
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
                color: "#000000",
                info: "Germania riunificata dal 1990, locomotiva economica dell'UE.",
                population: "84 milioni"
            },
            {
                id: 'france-2024',
                name: "Francia",
                coordinates: [2.3522, 48.8566],
                color: "#0055A4",
                info: "Francia moderna, membro fondatore dell'UE e potenza nucleare.",
                population: "67 milioni"
            },
            {
                id: 'russia-2024',
                name: "Federazione Russa",
                coordinates: [37.6173, 55.7558],
                color: "#0033A0",
                info: "Federazione Russa dopo la dissoluzione dell'URSS nel 1991.",
                population: "144 milioni"
            },
            {
                id: 'uk-2024',
                name: "Regno Unito",
                coordinates: [-0.1276, 51.5074],
                color: "#C8102E",
                info: "Regno Unito post-Brexit, fuori dall'Unione Europea dal 2020.",
                population: "67 milioni"
            },
            {
                id: 'italy-2024',
                name: "Italia",
                coordinates: [12.4964, 41.9028],
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

            // Crea il layer vettoriale
            this.vectorLayer = new ol.layer.Vector({
                source: this.vectorSource,
                style: (feature) => {
                    const color = feature.get('color');
                    return new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: 15,
                            fill: new ol.style.Fill({ color: color }),
                            stroke: new ol.style.Stroke({
                                color: '#fff',
                                width: 3
                            })
                        })
                    });
                }
            });

            // Inizializza la mappa
            this.map = new ol.Map({
                target: 'map',
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM({
                            attributions: '© OpenStreetMap contributors'
                        })
                    }),
                    this.vectorLayer
                ],
                view: new ol.View({
                    center: ol.proj.fromLonLat([10.0, 50.0]),
                    zoom: 4
                })
            });

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

            // Rimuovi features esistenti con animazione
            this.vectorSource.clear();

            // Aggiungi nuove features
            this.currentTerritories.forEach(territory => {
                const feature = new ol.Feature({
                    geometry: new ol.geom.Point(
                        ol.proj.fromLonLat(territory.coordinates)
                    ),
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
