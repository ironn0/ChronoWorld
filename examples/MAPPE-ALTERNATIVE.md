# 🗺️ Guida alle Mappe Alternative per ChronoWorld

Questa guida mostra tutte le **API di mappe gratuite** che puoi usare per ChronoWorld, con focus su **stili muti/storici/vintage** perfetti per visualizzare confini storici.

---

## 🎨 Mappe Consigliate per ChronoWorld

### 1️⃣ **CartoDB Positron** ⭐ CONSIGLIATO (Default in tutti gli esempi)

**Perfetto per:** Mappe storiche chiare e leggibili

```javascript
// Leaflet
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap, © CartoDB',
    maxZoom: 19
}).addTo(map);

// OpenLayers
new ol.source.XYZ({
    url: 'https://{a-d}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
})
```

**Caratteristiche:**
- ✅ Stile minimalista e pulito
- ✅ Colori neutri (grigio chiaro)
- ✅ Perfetto per sovrapporre poligoni colorati
- ✅ Gratuito e senza limiti
- ✅ Veloce e affidabile

**Varianti:**
- `light_nolabels` - Senza etichette (ancora più pulito)
- `light_only_labels` - Solo etichette (per layer separato)

---

### 2️⃣ **CartoDB Dark Matter** 🌙

**Perfetto per:** Tema scuro, effetto drammatico

```javascript
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap, © CartoDB',
    maxZoom: 19
}).addTo(map);
```

**Caratteristiche:**
- ✅ Sfondo scuro elegante
- ✅ Ottimo per UI moderne
- ✅ I colori dei territori risaltano di più
- ✅ Gratuito e senza limiti

**Varianti:**
- `dark_nolabels` - Senza etichette
- `dark_only_labels` - Solo etichette

---

### 3️⃣ **Stamen Watercolor** 🎨

**Perfetto per:** Effetto artistico/acquerello, presentazioni

```javascript
L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg', {
    attribution: '© Stamen Design, © OpenStreetMap',
    maxZoom: 16
}).addTo(map);
```

**Caratteristiche:**
- ✅ Stile artistico unico
- ✅ Aspetto vintage/storico
- ✅ Ideale per presentazioni
- ⚠️ Zoom limitato a 16

**Note:** Richiede account gratuito Stadia Maps (https://stadiamaps.com/)

---

### 4️⃣ **Stamen Toner** 📰

**Perfetto per:** Stile vintage bianco e nero

```javascript
L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}.png', {
    attribution: '© Stamen Design, © OpenStreetMap',
    maxZoom: 20
}).addTo(map);
```

**Caratteristiche:**
- ✅ Bianco e nero ad alto contrasto
- ✅ Stile giornale/vintage
- ✅ Ottimo per mappe storiche
- ✅ Molto dettagliato

**Varianti:**
- `stamen_toner_lite` - Versione più leggera
- `stamen_toner_background` - Solo sfondo senza etichette
- `stamen_toner_lines` - Solo linee

---

### 5️⃣ **Stamen Terrain** ⛰️

**Perfetto per:** Mappe con rilievi e geografia fisica

```javascript
L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}.png', {
    attribution: '© Stamen Design, © OpenStreetMap',
    maxZoom: 18
}).addTo(map);
```

**Caratteristiche:**
- ✅ Mostra rilievi montuosi
- ✅ Colori naturali
- ✅ Buono per geografia storica

---

### 6️⃣ **Esri World Gray Canvas** 🌍

**Perfetto per:** Mappe aziendali/professionali

```javascript
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© Esri',
    maxZoom: 16
}).addTo(map);
```

**Caratteristiche:**
- ✅ Stile professionale ESRI
- ✅ Grigio neutro
- ✅ Molto pulito
- ⚠️ Limiti di utilizzo più restrittivi

---

### 7️⃣ **OpenStreetMap Standard** 🗺️

**Perfetto per:** Default generico

```javascript
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
}).addTo(map);
```

**Caratteristiche:**
- ✅ Mappa standard completa
- ✅ Molto dettagliata
- ❌ Troppi dettagli per mappe storiche
- ❌ Colori vivaci possono disturbare

---

## 🆚 Confronto Rapido

| Mappa | Stile | Migliore Per | API Key | Zoom Max |
|-------|-------|--------------|---------|----------|
| **CartoDB Positron** ⭐ | Minimalista chiaro | Mappe storiche | ❌ No | 19 |
| **CartoDB Dark** | Minimalista scuro | UI moderne | ❌ No | 19 |
| **Stamen Watercolor** | Artistico | Presentazioni | ⚠️ Sì* | 16 |
| **Stamen Toner** | Vintage B&N | Mappe storiche | ⚠️ Sì* | 20 |
| **Esri Gray** | Professionale | Business | ❌ No | 16 |
| **OSM Standard** | Dettagliato | Uso generico | ❌ No | 19 |

*Account gratuito Stadia Maps richiesto

---

## 💡 Come Cambiare Mappa

### Esempio 1 (Leaflet + Vanilla JS)

Apri `examples/example1-leaflet-vanilla/script.js` e trova:

```javascript
// Tile layer con stile muto/vintage per mappe storiche
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap, © CartoDB',
    maxZoom: 19
}).addTo(map);
```

Sostituisci l'URL con uno degli URL sopra.

### Esempio 2 (Leaflet + React)

Apri `examples/example2-mapbox-react/app.jsx` e trova la sezione tile layer nell'`useEffect`.

### Esempio 3 (OpenLayers + Vue)

Apri `examples/example3-openlayers-vue/app.js` e trova:

```javascript
new ol.source.XYZ({
    url: 'https://{a-d}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
})
```

---

## 🎨 Combinazioni Avanzate

### Mappa Senza Etichette + Layer Etichette Separato

Per massimo controllo:

```javascript
// Layer 1: Mappa senza etichette
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap, © CartoDB'
}).addTo(map);

// Layer 2: I tuoi poligoni storici
// ... (codice esistente)

// Layer 3: Solo etichette sopra i poligoni (opzionale)
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
    opacity: 0.5 // Trasparenza 50%
}).addTo(map);
```

### Doppia Mappa (Base + Overlay)

```javascript
// Base watercolor
L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg').addTo(map);

// Overlay con linee
L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_lines/{z}/{x}/{y}.png', {
    opacity: 0.3
}).addTo(map);
```

---

## 🔑 API Keys Gratuite

Alcuni provider richiedono registrazione gratuita:

### Stadia Maps (per Stamen)
1. Vai su https://stadiamaps.com/
2. Crea account gratuito
3. Free tier: 20.000 richieste/mese
4. API key nel dashboard

Esempio con API key:
```javascript
L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg?api_key=TUA_API_KEY', {
    attribution: '© Stamen Design, © OpenStreetMap'
}).addTo(map);
```

### Mapbox (opzionale)
1. https://www.mapbox.com/
2. Free tier: 50.000 richieste/mese
3. Stili premium e 3D

---

## 📊 Raccomandazioni per Tipo di Progetto

### Progetto Educativo/Accademico
**Consigliato:** CartoDB Positron o Stamen Toner
- Pulito e professionale
- Gratis senza limiti

### Progetto Commerciale/Startup
**Consigliato:** CartoDB Positron + eventuale Mapbox
- Inizia con CartoDB (gratis)
- Scala a Mapbox se serve grafica avanzata

### Presentazione/Demo
**Consigliato:** Stamen Watercolor
- Impatto visivo artistico
- Memorabile

### App Mobile
**Consigliato:** CartoDB Positron (light_nolabels)
- Veloce da caricare
- Consuma meno banda

### Tema Scuro
**Consigliato:** CartoDB Dark Matter
- Perfetto per UI moderne
- Risparmia batteria su OLED

---

## 🌍 Mappe Storiche Autentiche (Avanzato)

Per usare **mappe storiche reali** (non simulazioni):

### David Rumsey Map Collection
- URL: https://www.davidrumsey.com/
- Mappe storiche scannerizzate
- API disponibile

### Old Maps Online
- URL: https://www.oldmapsonline.org/
- Aggregatore di mappe storiche
- Integrazione WMS

### Esempio di integrazione:
```javascript
// WMS Layer con mappa storica
L.tileLayer.wms('https://mapwarper.net/maps/wms/123', {
    layers: 'warped_map',
    format: 'image/png',
    transparent: true
}).addTo(map);
```

---

## ❓ FAQ

**Q: Quale mappa consumi?**
A: CartoDB Positron - perfetta per mappe storiche, gratis, veloce.

**Q: Posso usare più mappe insieme?**
A: Sì! Puoi sovrapporre più layer con diversi livelli di opacità.

**Q: Serve API key?**
A: CartoDB, Esri, OSM = NO. Stamen via Stadia = Sì (gratis).

**Q: Posso usare offline?**
A: No, sono tutte basate su tile server online. Per offline serve scaricare le tile.

**Q: Quale usa meno banda?**
A: CartoDB nolabels + vettoriali custom.

---

## 🎓 Risorse Utili

- **Leaflet Providers Preview**: https://leaflet-extras.github.io/leaflet-providers/preview/
- **CartoDB Docs**: https://carto.com/help/working-with-data/basemaps/
- **Stadia Maps Docs**: https://docs.stadiamaps.com/
- **OpenLayers Examples**: https://openlayers.org/en/latest/examples/

---

**Buona cartografia con ChronoWorld!** 🗺️🌍📜
