# Esempio 2: Leaflet + React (con Hooks)

## 🎯 Caratteristiche

- **Stack**: Leaflet.js + React 18 + Hooks
- **Complessità**: ⭐⭐⭐ (Media)
- **Setup**: Versione CDN pronta all'uso
- **Dimensione**: ~400KB (con React + Leaflet)
- **API Key**: ❌ Non necessaria (100% open source!)

## ✅ Pro

- � Completamente gratuito, nessuna API key
- ⚛️ Architettura React componibile e moderna
- 🔄 Gestione stato reattiva con Hooks (useState, useEffect, useRef)
- 🎭 Animazioni fluide e transizioni
- 📦 Ecosistema React vastissimo
- 🧪 Testing con Jest/React Testing Library
- 🏗️ Scalabile per app complesse
- 🗺️ Leaflet è maturo e stabile

## ❌ Contro

-  Bundle size medio-grande
- 🔧 Setup più complesso di vanilla JS
- 📚 Curva di apprendimento React
- 🎨 Grafica meno "wow" rispetto a Mapbox

## 🚀 Come Usare

### Versione CDN (Immediata) ✅
1. Apri `index.html` nel browser
2. **Funziona immediatamente, senza configurazione!**

### Versione con Build (Professionale)
```bash
npm install
npm run dev
```

## 💡 Ideale Per

- Applicazioni web moderne
- Progetti che cresceranno nel tempo
- Team che conoscono React
- Quando serve un'architettura solida
- Progetti che non vogliono dipendenze esterne (API key)
- Startup e progetti commerciali

## 🎓 Note Tecniche

- React 18 con Hooks moderni
  - `useState` per stato locale
  - `useEffect` per side effects
  - `useRef` per riferimenti DOM
- Leaflet.js per mappe interattive
- Poligoni GeoJSON per confini storici
- Responsive design
- Gestione eventi (hover, click)
- Animazioni zoom automatico

## 🔄 Migrazione a Mapbox (Opzionale)

Se vuoi grafica più avanzata, puoi facilmente migrare a Mapbox:

1. Registrati su https://www.mapbox.com/
2. Ottieni API key gratuita
3. Sostituisci Leaflet con Mapbox GL JS
4. Aggiorna il codice in `app.jsx`

**Nota**: Questo esempio usa Leaflet per evitare la necessità di API key e funzionare immediatamente!
