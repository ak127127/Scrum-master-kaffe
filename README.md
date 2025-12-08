# ☕ Bönan & Koppen

Premium kaffebutik - E-commerce webbapp

## Snabbstart med Docker

### Lokalt (för utveckling)
```bash
# Bygg och starta
docker-compose up --build

# Öppna i webbläsare
# http://localhost:3000
```

### På Oracle ARM-maskin
```bash
# Klona/kopiera projektet till servern
scp -r . user@oracle-server:/home/user/bonan-koppen

# SSH till servern
ssh user@oracle-server

# Gå till projektet
cd bonan-koppen

# Bygg för ARM64 och starta
docker-compose up -d --build

# Appen körs nu på port 3000
```

## Projektstruktur
```
├── server.js           # Express backend + API
├── public/
│   ├── index.html      # SPA frontend
│   ├── css/styles.css  # Dark theme styling
│   └── js/app.js       # Cart & checkout logic
├── Dockerfile          # Multi-stage, ARM64-ready
├── docker-compose.yml  # Easy deployment
└── package.json        # Dependencies
```

## API Endpoints
- `GET /api/products` - Lista alla produkter
- `GET /api/products/:id` - Produktdetaljer
- `POST /api/checkout` - Skicka beställning

## Features
- 🌑 Premium dark theme
- 🛒 Persistent varukorg (localStorage)
- 📱 Responsiv design
- ⚡ Snabb, statisk SPA
- 🐳 Docker ARM64-ready
