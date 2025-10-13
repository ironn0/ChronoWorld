// ========================================
// 🌍 CHRONOWORLD - Mappe Storiche Complete
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
let showCapitals = false; // Disabilitato perché questi file non hanno capitali

// Lista di tutti gli anni disponibili (negativi = a.C.)
const availableYears = [
    -123000, -10000, -8000, -5000, -4000, -3000, -2000, -1500, -1000, -700,
    -500, -400, -323, -300, -200, -123, -100, -1,
    100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
    1100, 1200, 1279, 1300, 1400, 1492, 1500, 1530, 1600, 1650,
    1700, 1715, 1783, 1800, 1815, 1880, 1900, 1914, 1920, 1930,
    1938, 1945, 1960, 1994, 2000, 2010
];

// Funzione per trovare l'anno più vicino
function findClosestYear(year) {
    return availableYears.reduce((prev, curr) => {
        return Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev;
    });
}

// Funzione per convertire anno in nome file
function yearToFilename(year) {
    if (year < 0) {
        return `world_bc${Math.abs(year)}.geojson`;
    } else {
        return `world_${year}.geojson`;
    }
}

// Funzione per formattare anno (a.C. / d.C.)
function formatYear(year) {
    if (year < 0) {
        return `${Math.abs(year)} a.C.`;
    } else if (year > 0) {
        return `${year} d.C.`;
    } else {
        return '1 a.C.';
    }
}

// ========================================
// TRADUZIONI ITALIANO
// ========================================

const translations = {
    // Nazioni europee
    'Luxembourg': 'Lussemburgo',
    'Switzerland': 'Svizzera',
    'United Kingdom of Great Britain and Ireland': 'Regno Unito di Gran Bretagna e Irlanda',
    'United Kingdom': 'Regno Unito',
    'Great Britain': 'Gran Bretagna',
    'England': 'Inghilterra',
    'Scotland': 'Scozia',
    'Wales': 'Galles',
    'Ireland': 'Irlanda',
    'Northern Ireland': 'Irlanda del Nord',
    'Bhutan': 'Bhutan',
    'Qatar': 'Qatar',
    'Cuba': 'Cuba',
    'France': 'Francia',
    'Germany': 'Germania',
    'Italy': 'Italia',
    'Spain': 'Spagna',
    'Portugal': 'Portogallo',
    'Netherlands': 'Paesi Bassi',
    'Holland': 'Olanda',
    'Belgium': 'Belgio',
    'Austria': 'Austria',
    'Austria-Hungary': 'Impero Austro-Ungarico',
    'Poland': 'Polonia',
    'Czech Republic': 'Repubblica Ceca',
    'Czechia': 'Cechia',
    'Slovakia': 'Slovacchia',
    'Hungary': 'Ungheria',
    'Romania': 'Romania',
    'Bulgaria': 'Bulgaria',
    'Serbia': 'Serbia',
    'Croatia': 'Croazia',
    'Slovenia': 'Slovenia',
    'Bosnia': 'Bosnia',
    'Herzegovina': 'Erzegovina',
    'Montenegro': 'Montenegro',
    'Albania': 'Albania',
    'Macedonia': 'Macedonia',
    'Greece': 'Grecia',
    'Sweden': 'Svezia',
    'Norway': 'Norvegia',
    'Denmark': 'Danimarca',
    'Finland': 'Finlandia',
    'Iceland': 'Islanda',
    'Estonia': 'Estonia',
    'Latvia': 'Lettonia',
    'Lithuania': 'Lituania',
    'Belarus': 'Bielorussia',
    'Ukraine': 'Ucraina',
    'Moldova': 'Moldavia',
    
    // Russia e paesi correlati
    'Russia': 'Russia',
    'Russian Empire': 'Impero Russo',
    'Soviet Union': 'Unione Sovietica',
    'USSR': 'URSS',
    'Georgia': 'Georgia',
    'Armenia': 'Armenia',
    'Azerbaijan': 'Azerbaigian',
    'Kazakhstan': 'Kazakistan',
    'Uzbekistan': 'Uzbekistan',
    'Turkmenistan': 'Turkmenistan',
    'Kyrgyzstan': 'Kirghizistan',
    'Tajikistan': 'Tagikistan',
    
    // Impero Ottomano e Medio Oriente
    'Ottoman Empire': 'Impero Ottomano',
    'Turkey': 'Turchia',
    'Cyprus': 'Cipro',
    'Syria': 'Siria',
    'Lebanon': 'Libano',
    'Israel': 'Israele',
    'Palestine': 'Palestina',
    'Jordan': 'Giordania',
    'Iraq': 'Iraq',
    'Mesopotamia': 'Mesopotamia',
    'Persia': 'Persia',
    'Iran': 'Iran',
    'Saudi Arabia': 'Arabia Saudita',
    'Yemen': 'Yemen',
    'Oman': 'Oman',
    'Kuwait': 'Kuwait',
    'Bahrain': 'Bahrein',
    'United Arab Emirates': 'Emirati Arabi Uniti',
    'UAE': 'EAU',
    
    // Africa
    'Egypt': 'Egitto',
    'Morocco': 'Marocco',
    'Algeria': 'Algeria',
    'Tunisia': 'Tunisia',
    'Libya': 'Libia',
    'Sudan': 'Sudan',
    'Ethiopia': 'Etiopia',
    'Abyssinia': 'Abissinia',
    'Somalia': 'Somalia',
    'Kenya': 'Kenya',
    'Tanzania': 'Tanzania',
    'Uganda': 'Uganda',
    'South Africa': 'Sudafrica',
    'Nigeria': 'Nigeria',
    'Ghana': 'Ghana',
    'Ivory Coast': 'Costa d\'Avorio',
    'Senegal': 'Senegal',
    'Mali': 'Mali',
    'Niger': 'Niger',
    'Chad': 'Ciad',
    'Cameroon': 'Camerun',
    'Congo': 'Congo',
    'Angola': 'Angola',
    'Mozambique': 'Mozambico',
    'Zimbabwe': 'Zimbabwe',
    'Zambia': 'Zambia',
    'Madagascar': 'Madagascar',
    
    // Asia
    'China': 'Cina',
    'Japan': 'Giappone',
    'Korea': 'Corea',
    'North Korea': 'Corea del Nord',
    'South Korea': 'Corea del Sud',
    'Mongolia': 'Mongolia',
    'Tibet': 'Tibet',
    'India': 'India',
    'Pakistan': 'Pakistan',
    'Bangladesh': 'Bangladesh',
    'Burma': 'Birmania',
    'Myanmar': 'Myanmar',
    'Thailand': 'Thailandia',
    'Siam': 'Siam',
    'Vietnam': 'Vietnam',
    'Laos': 'Laos',
    'Cambodia': 'Cambogia',
    'Malaysia': 'Malesia',
    'Singapore': 'Singapore',
    'Indonesia': 'Indonesia',
    'Philippines': 'Filippine',
    'Afghanistan': 'Afghanistan',
    'Nepal': 'Nepal',
    'Sri Lanka': 'Sri Lanka',
    'Ceylon': 'Ceylon',
    
    // Americhe
    'United States of America': 'Stati Uniti d\'America',
    'United States': 'Stati Uniti',
    'USA': 'USA',
    'Canada': 'Canada',
    'Mexico': 'Messico',
    'Guatemala': 'Guatemala',
    'Honduras': 'Honduras',
    'El Salvador': 'El Salvador',
    'Nicaragua': 'Nicaragua',
    'Costa Rica': 'Costa Rica',
    'Panama': 'Panama',
    'Colombia': 'Colombia',
    'Venezuela': 'Venezuela',
    'Brazil': 'Brasile',
    'Argentina': 'Argentina',
    'Chile': 'Cile',
    'Peru': 'Perù',
    'Bolivia': 'Bolivia',
    'Paraguay': 'Paraguay',
    'Uruguay': 'Uruguay',
    'Ecuador': 'Ecuador',
    
    // Oceania
    'Australia': 'Australia',
    'New Zealand': 'Nuova Zelanda',
    'Papua New Guinea': 'Papua Nuova Guinea',
    'Fiji': 'Figi',
    
    // Imperi e stati antichi
    'Roman Empire': 'Impero Romano',
    'Byzantine Empire': 'Impero Bizantino',
    'Holy Roman Empire': 'Sacro Romano Impero',
    'Mongol Empire': 'Impero Mongolo',
    'Persian Empire': 'Impero Persiano',
    'Achaemenid Empire': 'Impero Achemenide',
    'Sassanid Empire': 'Impero Sasanide',
    'Macedonian Empire': 'Impero Macedone',
    'Egyptian Empire': 'Impero Egizio',
    'Assyrian Empire': 'Impero Assiro',
    'Babylonian Empire': 'Impero Babilonese',
    'Hittite Empire': 'Impero Ittita',
    'Carthage': 'Cartagine',
    'Phoenicia': 'Fenicia',
    'Athens': 'Atene',
    'Sparta': 'Sparta',
    'Thebes': 'Tebe',
    'Corinth': 'Corinto',
    'Troy': 'Troia',
    'Mycenae': 'Micene',
    'Crete': 'Creta',
    'Minoan': 'Minoico',
    'Sumerian': 'Sumero',
    'Akkadian': 'Accadico',
    
    // Regni medievali
    'Kingdom of France': 'Regno di Francia',
    'Kingdom of England': 'Regno d\'Inghilterra',
    'Kingdom of Spain': 'Regno di Spagna',
    'Kingdom of Portugal': 'Regno del Portogallo',
    'Kingdom of Sicily': 'Regno di Sicilia',
    'Kingdom of Naples': 'Regno di Napoli',
    'Kingdom of Aragon': 'Regno d\'Aragona',
    'Kingdom of Castile': 'Regno di Castiglia',
    'Kingdom of Leon': 'Regno di León',
    'Kingdom of Navarre': 'Regno di Navarra',
    'Papal States': 'Stati Pontifici',
    'Papal State': 'Stato Pontificio',
    'Republic of Venice': 'Repubblica di Venezia',
    'Venice': 'Venezia',
    'Republic of Genoa': 'Repubblica di Genova',
    'Genoa': 'Genova',
    'Republic of Florence': 'Repubblica di Firenze',
    'Florence': 'Firenze',
    'Milan': 'Milano',
    'Duchy of Milan': 'Ducato di Milano',
    'Duchy of Savoy': 'Ducato di Savoia',
    'Kingdom of Sardinia': 'Regno di Sardegna',
    'Kingdom of the Two Sicilies': 'Regno delle Due Sicilie',
    
    // Califfati e sultanati
    'Caliphate': 'Califfato',
    'Umayyad Caliphate': 'Califfato Omayyade',
    'Abbasid Caliphate': 'Califfato Abbaside',
    'Fatimid Caliphate': 'Califfato Fatimide',
    'Mamluk Sultanate': 'Sultanato Mamelucco',
    'Seljuk Empire': 'Impero Selgiuchide',
    'Timurid Empire': 'Impero Timuride',
    
    // Termini generici
    'Empire': 'Impero',
    'Kingdom': 'Regno',
    'Republic': 'Repubblica',
    'Confederation': 'Confederazione',
    'Sultanate': 'Sultanato',
    'Khanate': 'Khanato',
    'Duchy': 'Ducato',
    'Grand Duchy': 'Granducato',
    'Principality': 'Principato',
    'Colony': 'Colonia',
    'Protectorate': 'Protettorato',
    'Territory': 'Territorio',
    'State': 'Stato',
    'Union': 'Unione',
    'Federation': 'Federazione',
    'Commonwealth': 'Commonwealth',
    'Dominion': 'Dominio',
    'Mandate': 'Mandato',
    
    // Aggettivi e preposizioni
    'of': 'di',
    'the': '',
    'and': 'e',
    'New': 'Nuova',
    'North': 'Nord',
    'South': 'Sud',
    'East': 'Est',
    'West': 'Ovest',
    'Central': 'Centrale',
    'Great': 'Grande',
    'Little': 'Piccola',
    'Upper': 'Alta',
    'Lower': 'Bassa',
    'Ancient': 'Antica',
    'Modern': 'Moderna',
    
    // Stati e condizioni
    'Independent': 'Indipendente',
    'Disputed': 'Conteso',
    'Unknown': 'Sconosciuto',
    'Uninhabited': 'Disabitato',
    'Unclaimed': 'Non reclamato',
    "No Man's Land": 'Terra di nessuno',
    'Occupied': 'Occupato',
    'Annexed': 'Annesso',
    'Neutral': 'Neutrale',
    
    // ===== CIVILTÀ PREISTORICHE E ANTICHISSIME =====
    'Dakapeng culture': 'Cultura di Dakapeng',
    'Austronesians': 'Austronesiani',
    'Jōmon': 'Jōmon',
    'Ainu': 'Ainu',
    
    // ===== CIVILTÀ PRECOLOMBIANE =====
    'Norte Chico': 'Norte Chico',
    'Teotihuacán': 'Teotihuacán',
    'Monte Albán': 'Monte Albán',
    'Maya chiefdoms and states': 'Principati e Stati Maya',
    'Maya city-states': 'Città-Stato Maya',
    'Toltec Empire': 'Impero Tolteco',
    'Mesoamerican city-states and chiefdoms': 'Città-Stato e Principati Mesoamericani',
    'Mixtecs': 'Mixtechi',
    'Valdivia': 'Valdivia',
    'Huari Empire': 'Impero Huari',
    'Tiahuanaco Empire': 'Impero Tiahuanaco',
    'Tiahuanaco E': 'Impero Tiahuanaco',
    'Ciboney': 'Ciboney',
    
    // ===== MESOPOTAMIA E MEDIO ORIENTE ANTICO =====
    'city-states': 'città-stato',
    'Ur': 'Ur',
    'Elam': 'Elam',
    'Hurrian Kingdoms': 'Regni Hurriti',
    'Canaan': 'Canaan',
    'Semites': 'Semiti',
    
    // ===== REGNI ARABI E YEMENITI =====
    'Qataban': 'Qataban',
    'Hadramaut': 'Hadramaut',
    'Saba': 'Saba',
    
    // ===== AFRICA ANTICA =====
    'Meroe': 'Meroe',
    'Kerma': 'Kerma',
    'Khoisan': 'Khoisan',
    'Makkura': 'Makuria',
    'Alwa': 'Alwa',
    'Axum': 'Axum',
    
    // ===== PERSIA E CAUCASO =====
    'Atropatene': 'Atropatene',
    'Colchis': 'Colchide',
    'Cappadocia': 'Cappadocia',
    
    // ===== IMPERO MACEDONE =====
    'Empire of Alexander': 'Impero di Alessandro',
    'Alex. Emp.': 'Imp. Alessandro',
    'Macedon': 'Macedonia',
    'Bosporan Kingdom': 'Regno del Bosforo',
    'Bosporan K.': 'Regno Bosforo',
    
    // ===== ANTICA ROMA E GRECIA =====
    'Rome': 'Roma',
    'Greek city-states': 'Città-Stato Greche',
    'Carthaginian Empire': 'Impero Cartaginese',
    'Carth. Empir': 'Imp. Cartaginese',
    
    // ===== CULTURE MEDITERRANEE =====
    'Cycladic': 'Cicladica',
    'Minoan': 'Minoica',
    'Guanches': 'Guanci',
    
    // ===== INDIA ANTICA E MEDIEVALE =====
    'Hindu kingdoms': 'Regni Indù',
    'Hindu kingdoms and republics': 'Regni e Repubbliche Indù',
    'Hindu states': 'Stati Indù',
    'Magadha': 'Magadha',
    'Vallabhi': 'Vallabhi',
    'Rashtrakuta state': 'Stato Rashtrakuta',
    'Rashtrakuta': 'Rashtrakuta',
    'Pallava state': 'Stato Pallava',
    'Pallava stat': 'Stato Pallava',
    'Pandya state': 'Stato Pandya',
    'Sinhalese kingdoms': 'Regni Singalesi',
    'Ceylon': 'Ceylon',
    'Simhala': 'Simhala',
    'Rajput Clans and Small States': 'Clan Rajput e Piccoli Stati',
    'Indus valley civilization': 'Civiltà della Valle dell\'Indo',
    'Indus valley': 'Valle dell\'Indo',
    
    // ===== CINA ANTICA =====
    'Qin': 'Qin',
    'Zhow states': 'Stati Zhou',
    'Yue': 'Yue',
    'Xia': 'Xia',
    'Tang Empire': 'Impero Tang',
    
    // ===== SUD-EST ASIATICO =====
    'Nan Chao': 'Nan Zhao',
    'Dvaravati': 'Dvaravati',
    'Pyu state': 'Stato Pyu',
    'Chen-La': 'Chenla',
    'Champa': 'Champa',
    'Mon state': 'Stato Mon',
    
    // ===== COREA E GIAPPONE =====
    'Silia': 'Silla',
    'Parhae': 'Balhae',
    
    // ===== ISOLE BRITANNICHE =====
    'Wessex': 'Wessex',
    'Welsh': 'Gallesi',
    
    // ===== SPAGNA MEDIEVALE =====
    'Asturias': 'Asturie',
    'Emirate of Córdoba': 'Emirato di Cordova',
    
    // ===== ISLAM MEDIEVALE =====
    'Aghlabid Emirate': 'Emirato Aghlabide',
    'Aghlabid E.': 'Emirato Aghlabide',
    'Idrisid Caliphate': 'Califfato Idriside',
    'Idrisid Cal.': 'Califfato Idriside',
    
    // ===== ITALIA MEDIEVALE =====
    'Lombard duchies': 'Ducati Longobardi',
    
    // ===== CULTURE EUROPEE =====
    'Beaker': 'Cultura del Bicchiere',
    'Únětice': 'Cultura di Únětice',
    
    // ===== ASIA CENTRALE =====
    'Oxus': 'Oxus',
    'Namazga': 'Namazga'
};

function translateName(name) {
    if (!name) return 'Sconosciuto';
    
    // Cerca traduzione esatta
    if (translations[name]) {
        return translations[name];
    }
    
    // Cerca traduzioni parziali (es. "Kingdom of France" -> "Regno di Francia")
    let translated = name;
    
    // Ordina le chiavi per lunghezza decrescente (prima le frasi più lunghe)
    const sortedKeys = Object.keys(translations).sort((a, b) => b.length - a.length);
    
    for (const eng of sortedKeys) {
        const ita = translations[eng];
        const regex = new RegExp('\\b' + eng + '\\b', 'gi');
        translated = translated.replace(regex, ita);
    }
    
    // Pulizia finale
    translated = translated.replace(/\s+/g, ' ').trim();
    translated = translated.replace(/\s+di\s+di\s+/g, ' di ');
    translated = translated.replace(/^di\s+/i, '');
    
    return translated;
}

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
// CARICAMENTO DATASET - WORLD FILES
// ========================================

async function loadCShapesDataset() {
    // Carica il primo file
    await loadYearFile(currentYear);
}

async function loadYearFile(year) {
    showLoading(`Caricamento anno ${formatYear(year)}...`);
    
    // Trova l'anno più vicino disponibile
    const closestYear = findClosestYear(year);
    
    const filename = yearToFilename(closestYear);
    const possiblePaths = [
        `../../data/${filename}`,
        `../data/${filename}`,
        `data/${filename}`,
        `/data/${filename}`
    ];
    
    console.log(`📂 Caricamento ${filename} (richiesto: ${formatYear(year)})...`);
    
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
            console.log(`   📦 Features: ${data.features.length}`);
            
            allData = data;
            
            // Prima feature per debug
            if (data.features.length > 0) {
                const first = data.features[0];
                console.log('🔬 Sample properties:', Object.keys(first.properties));
            }
            
            displayCurrentData();
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
    alert(`Impossibile caricare ${filename}\n\nVerifica:\n1. File in ChronoWorld/data/\n2. Live Server attivo\n3. Console (F12) per dettagli`);
}

// ========================================
// VISUALIZZAZIONE DATI
// ========================================

function displayCurrentData() {
    if (!allData) {
        console.error('❌ Dataset non caricato');
        return;
    }
    
    console.log(`📅 Visualizzazione dati per anno ${currentYear}...`);
    
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
    
    // Filtra i territori sconosciuti
    const filtered = allData.features.filter(f => {
        const name = (f.properties.NAME || f.properties.name || '').toLowerCase();
        return name !== '' && 
               name !== 'unknown' && 
               name !== 'disputed' && 
               name !== 'no man\'s land' &&
               name !== 'unclaimed' &&
               name !== 'uninhabited';
    });
    
    console.log(`✅ Visualizzazione: ${filtered.length} territori (${allData.features.length - filtered.length} sconosciuti esclusi)`);
    
    if (filtered.length === 0) {
        console.warn('⚠️ Nessun territorio trovato');
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
                '#9b59b6', '#1abc9c', '#e67e22', '#34495e',
                '#16a085', '#27ae60', '#2980b9', '#8e44ad',
                '#f39c12', '#d35400', '#c0392b', '#7f8c8d'
            ];
            const name = feature.properties.NAME || feature.properties.name || '';
            const colorIndex = name.length % colors.length;
            
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
            const name = translateName(props.NAME || props.name || 'Territorio sconosciuto');
            const abbrev = props.ABBREVN || props.abbrevn || 'N/D';
            const subject = translateName(props.SUBJECTO || props.subjecto || 'N/D');
            const partof = translateName(props.PARTOF || props.partof || 'Indipendente');
            
            layer.bindPopup(`
                <div class="country-popup">
                    <h4>${name}</h4>
                    <p><strong>Abbreviazione:</strong> ${abbrev}</p>
                    <p><strong>Soggetto a:</strong> ${subject}</p>
                    <p><strong>Parte di:</strong> ${partof}</p>
                    <p><strong>Anno:</strong> ${formatYear(currentYear)}</p>
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
    
    console.log('✅ Layer aggiunto alla mappa');
    
    // Labels
    if (showLabels) {
        addCountryLabels(filtered);
    }
    
    // Stats
    updateStatistics(filtered);
}

function filterAndDisplayYear(year) {
    currentYear = year;
    // Ricarica il file per il nuovo anno
    loadYearFile(year);
}

// ========================================
// CAPITALI (non disponibili in questi file)
// ========================================

function addCapitalMarkers(features) {
    console.log('ℹ️ Coordinate capitali non disponibili nei file world_XXXX.geojson');
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
                
                const nameOrig = f.properties.NAME || 
                           f.properties.name || 
                           f.properties.CNTRY_NAME || 
                           f.properties.cntry_name || '';
                
                const name = translateName(nameOrig);
                
                if (name && name !== 'Sconosciuto') {
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
    
    const name = translateName(props.NAME || props.name || 'Territorio sconosciuto');
    const abbrev = props.ABBREVN || props.abbrevn || 'N/D';
    const subject = translateName(props.SUBJECTO || props.subjecto || 'N/D');
    const partof = translateName(props.PARTOF || props.partof || 'Indipendente');
    const precision = props.BORDERPRECISION || props.borderprecision || 'N/D';
    
    div.innerHTML = `
        <h4>${name}</h4>
        <hr>
        <p><strong>Abbreviazione:</strong> ${abbrev}</p>
        <p><strong>Soggetto a:</strong> ${subject}</p>
        <p><strong>Parte di:</strong> ${partof}</p>
        <p><strong>Precisione confini:</strong> ${precision}</p>
        <p><strong>Anno visualizzato:</strong> ${formatYear(currentYear)}</p>
    `;
}

// ========================================
// STATISTICHE
// ========================================

function updateStatistics(features) {
    const total = features.length;
    
    const stateCount = document.getElementById('state-count');
    const totalArea = document.getElementById('total-area');
    const capCount = document.getElementById('capital-count');
    const currYear = document.getElementById('current-year');
    
    if (stateCount) stateCount.textContent = total;
    if (totalArea) totalArea.textContent = 'N/A';
    if (capCount) capCount.textContent = 'N/A';
    if (currYear) currYear.textContent = formatYear(currentYear);
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
    
    // Trova l'indice dell'anno corrente (1914) nella lista
    const currentYearIndex = availableYears.indexOf(currentYear);
    
    // Dropdown anno
    const yearSelect = document.getElementById('year-select');
    if (yearSelect) {
        yearSelect.addEventListener('change', function(e) {
            currentYear = parseInt(e.target.value);
            const slider = document.getElementById('year-slider');
            const display = document.getElementById('slider-year');
            
            // Aggiorna lo slider con l'indice corretto
            const yearIndex = availableYears.indexOf(currentYear);
            if (slider && yearIndex !== -1) slider.value = yearIndex;
            if (display) display.textContent = formatYear(currentYear);
            
            console.log(`🔄 Cambio anno a: ${formatYear(currentYear)}`);
            filterAndDisplayYear(currentYear);
        });
    }
    
    // Slider - ora usa indici invece di anni
    const yearSlider = document.getElementById('year-slider');
    if (yearSlider) {
        // Imposta il valore iniziale dello slider all'indice di 1914
        if (currentYearIndex !== -1) {
            yearSlider.value = currentYearIndex;
        }
        
        let timeout;
        yearSlider.addEventListener('input', function(e) {
            // Converti l'indice dello slider in anno
            const sliderIndex = parseInt(e.target.value);
            currentYear = availableYears[sliderIndex];
            
            const display = document.getElementById('slider-year');
            if (display) display.textContent = formatYear(currentYear);
            
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (yearSelect) {
                    yearSelect.value = currentYear;
                }
                
                console.log(`🔄 Cambio anno via slider a: ${formatYear(currentYear)}`);
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
                addCountryLabels(allData.features);
            } else {
                countryLabels.forEach(l => map.removeLayer(l));
                countryLabels = [];
            }
        });
    }
    
    // Toggle capitals (disabilitato)
    const showCapsCheck = document.getElementById('show-capitals');
    if (showCapsCheck) {
        showCapsCheck.addEventListener('change', function(e) {
            showCapitals = e.target.checked;
            console.log('ℹ️ Capitali non disponibili in questo dataset');
        });
    }
});

console.log('✅ Script caricato');
