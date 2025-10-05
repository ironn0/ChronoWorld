# 📥 Come Scaricare Altri Anni

I file GeoJSON per gli anni storici sono molto grandi (1-2 MB ciascuno) e non sono inclusi tutti nel repository.

## 📊 File Disponibili

✅ **Inclusi nel repository:**
- `world_1900.geojson` (~1.3 MB)
- `world_1914.geojson` (~1.5 MB)

❌ **Da scaricare manualmente:**
- `world_1880.geojson`
- `world_1920.geojson`
- `world_1945.geojson`
- `world_1994.geojson`

## 🚀 Scarica Anni Mancanti

### Opzione 1: PowerShell (Windows)

```powershell
cd data

# 1880 - Era Coloniale
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/aourednik/historical-basemaps/master/geojson/world_1880.geojson" -OutFile "world_1880.geojson"

# 1920 - Post Prima Guerra Mondiale
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/aourednik/historical-basemaps/master/geojson/world_1920.geojson" -OutFile "world_1920.geojson"

# 1945 - Fine Seconda Guerra Mondiale
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/aourednik/historical-basemaps/master/geojson/world_1945.geojson" -OutFile "world_1945.geojson"

# 1994 - Post Guerra Fredda
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/aourednik/historical-basemaps/master/geojson/world_1994.geojson" -OutFile "world_1994.geojson"
```

### Opzione 2: Bash/Linux/Mac

```bash
cd data

# Scarica tutti gli anni
curl -O https://raw.githubusercontent.com/aourednik/historical-basemaps/master/geojson/world_1880.geojson
curl -O https://raw.githubusercontent.com/aourednik/historical-basemaps/master/geojson/world_1920.geojson
curl -O https://raw.githubusercontent.com/aourednik/historical-basemaps/master/geojson/world_1945.geojson
curl -O https://raw.githubusercontent.com/aourednik/historical-basemaps/master/geojson/world_1994.geojson
```

### Opzione 3: Download Manuale

Vai su GitHub e scarica direttamente:
- https://github.com/aourednik/historical-basemaps/tree/master/geojson

Salva i file nella cartella `data/`

## 📋 Altri Anni Disponibili

Il progetto Historical Basemaps offre molti altri anni! Guarda la lista completa:
https://github.com/aourednik/historical-basemaps/tree/master/geojson

Formatta il nome come: `world_ANNO.geojson` (es. `world_1850.geojson`)

## ⚙️ Dopo il Download

1. Verifica che i file siano nella cartella `data/`
2. Aggiorna il `<select>` in `examples/example4-real-data/index.html`:

```html
<option value="1880">1880 - Era Coloniale</option>
```

3. Ricarica la pagina e seleziona l'anno!

## 💾 Dimensioni File

| Anno | Dimensione | Stati |
|------|-----------|-------|
| 1880 | ~1.2 MB | ~140 |
| 1900 | ~1.3 MB | ~150 |
| 1914 | ~1.5 MB | ~170 |
| 1920 | ~1.4 MB | ~165 |
| 1945 | ~1.6 MB | ~180 |
| 1994 | ~2.1 MB | ~230 |

**Totale:** ~9 MB per tutti gli anni

## ⚠️ Note

- I file sono troppo grandi per essere inclusi nel repository Git
- Aggiunti al `.gitignore` tranne 1900 e 1914
- Scarica solo gli anni che ti servono
- Tempo di download: ~1-2 minuti per anno

## 🔗 Fonte

Dati da **Historical Basemaps Project** by Adam Ourednik
- Repository: https://github.com/aourednik/historical-basemaps
- License: CC-BY-4.0 (Open Data)
- Cita sempre la fonte nei tuoi progetti!
