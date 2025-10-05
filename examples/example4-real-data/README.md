# Esempio 4: Dati Storici Reali 🗺️

## Descrizione

Questo esempio usa **dati storici autentici** dal progetto [Historical Basemaps](https://github.com/aourednik/historical-basemaps) di Adam Ourednik. 

A differenza degli esempi 1-3 che usano coordinate inventate, **qui i confini sono tracciati da storici** e basati su fonti documentate!

## 🌟 Caratteristiche

- ✅ **Confini storici reali** (non approssimazioni)
- ✅ **Dati verificati** da progetti di ricerca accademici
- ✅ **Geometrie precise** in formato GeoJSON
- ✅ **Metadati ricchi** (subordinazione, precisione confini)
- ✅ **Mappa senza confini moderni** (CartoDB nolabels)
- ✅ **Etichette dei paesi** con nomi storici
- ✅ **Dimensionamento automatico** etichette in base all'area
- ✅ **Toggle on/off** per mostrare/nascondere etichette
- ✅ **6 anni disponibili** (1880-1994)

## 📊 Dataset Disponibili

### ✅ Inclusi nel Repository

#### Anno 1900
- **File**: `world_1900.geojson` (~1.3 MB)
- **Stati inclusi**: ~150 entità politiche
- **Periodo**: Fine dell'era coloniale

#### Anno 1914
- **File**: `world_1914.geojson` (~1.5 MB)
- **Stati inclusi**: ~170 entità politiche
- **Periodo**: Vigilia della Prima Guerra Mondiale

### 📥 Da Scaricare Separatamente

Vedi **[data/README_DOWNLOAD.md](../../data/README_DOWNLOAD.md)** per istruzioni!

#### Anno 1880
- **Periodo**: Era coloniale (Impero Britannico al suo apice)
- **Dimensione**: ~1.2 MB

#### Anno 1920
- **Periodo**: Post Prima Guerra Mondiale (crollo imperi)
- **Dimensione**: ~1.4 MB

#### Anno 1945
- **Periodo**: Fine Seconda Guerra Mondiale
- **Dimensione**: ~1.6 MB

#### Anno 1994
- **Periodo**: Post Guerra Fredda (crollo URSS)
- **Dimensione**: ~2.1 MB

## 🎯 Come Funziona

```javascript
// 1. Carica il file GeoJSON dal dataset
const response = await fetch('../../data/world_1914.geojson');
const geojsonData = await response.json();

// 2. Visualizza i poligoni reali con Leaflet
L.geoJSON(geojsonData, {
    style: function(feature) {
        return {
            fillColor: getColorForState(feature.properties.NAME),
            weight: 2,
            fillOpacity: 0.6
        };
    }
}).addTo(map);

// 3. Calcola il centroide per ogni paese
const center = getPolygonCenter(geometry.coordinates);

// 4. Crea etichetta con il nome del paese
L.marker(center, {
    icon: L.divIcon({
        className: 'country-label',
        html: countryName
    })
}).addTo(map);
```

## 🔍 Proprietà dei Dati

Ogni territorio include:
- **NAME**: Nome dello stato
- **ABBREVN**: Abbreviazione
- **SUBJECTO**: A quale entità è subordinato
- **BORDERPRECISION**: Precisione dei confini (1-5)
- **PARTOF**: Fa parte di quale entità politica

## 🆚 Confronto con Esempi 1-3

| Aspetto | Esempi 1-3 | Esempio 4 |
|---------|-----------|-----------|
| Dati | Inventati | Reali |
| Precisione | Bassa | Alta |
| Fonte | Coordinate simulate | Historical Basemaps Project |
| File size | ~10 KB | ~1-2 MB |
| Stati | 3-5 | 150-170 |

## 🚀 Come Usare

### 1. Apri il file
```bash
# Apri con browser
start index.html

# Oppure con server locale
python -m http.server 8000
# Vai su http://localhost:8000
```

### 2. Seleziona l'anno
- **1880**: Era coloniale
- **1900**: Fine XIX secolo
- **1914**: Prima Guerra Mondiale
- **1920**: Post WWI (crollo imperi)
- **1945**: Fine WWII
- **1994**: Post Guerra Fredda

### 3. Esplora i territori
- **Hover**: Evidenzia il territorio
- **Click**: Mostra dettagli nel pannello laterale
- **Zoom**: Ingrandisci per vedere confini precisi
- **Checkbox Etichette**: Mostra/nascondi nomi dei paesi

## 📥 Aggiungere Altri Anni

Vuoi aggiungere più anni? Scarica da Historical Basemaps:

```bash
# Esempio: scarica il 1880
curl -o world_1880.geojson https://raw.githubusercontent.com/aourednik/historical-basemaps/master/geojson/world_1880.geojson
```

Poi aggiungi al `<select>`:
```html
<option value="1880">1880</option>
```

## 🎨 Personalizzazioni

### Cambia i colori
```javascript
const colors = [
    '#FF0000',  // Rosso
    '#00FF00',  // Verde
    '#0000FF'   // Blu
];
```

### Cambia stile mappa base
```javascript
// Mappa Watercolor (vintage)
L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg')

// Mappa fisica
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}')
```

## 🔗 Risorse

- **Progetto originale**: https://github.com/aourednik/historical-basemaps
- **Paper accademico**: Ourednik, A. (2021) "Historical Political Boundaries"
- **Altri dataset**: Vedi `../DATI-STORICI.md`

## ⚠️ Note Importanti

1. **Dimensione file**: I GeoJSON sono grandi (~1-2 MB). Per produzione, considera tile vettoriali.

2. **Performance**: Con molti poligoni, la mappa può rallentare. Usa clustering o semplificazione geometrie.

3. **Licensing**: Historical Basemaps è Open Data (CC-BY-4.0). Cita sempre la fonte!

4. **Precisione**: `BORDERPRECISION` indica quanto sono accurati i confini (1=approssimati, 5=molto precisi)

## 🎓 Cosa Imparare

Questo esempio dimostra:
- ✅ Come caricare GeoJSON da file esterni
- ✅ Come gestire dataset grandi
- ✅ Come visualizzare dati storici complessi
- ✅ Come usare proprietà GeoJSON per styling
- ✅ Come implementare loading states

## 🚀 Prossimi Passi

1. **Aggiungere più anni** (1800, 1850, 1945, 2000)
2. **Implementare animazioni** tra gli anni
3. **Aggiungere filtri** (imperi, repubbliche, colonie)
4. **Integrare AI** per descrizioni contestuali
5. **Esportare mappe** come PNG/PDF

---

**Creato per ChronoWorld** | Dati da Historical Basemaps Project
