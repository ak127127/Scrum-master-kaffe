const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mock produktdata - utökat sortiment
const products = [
    {
        id: 'morgonbris',
        name: 'Morgonbris',
        roastery: 'Göteborgs Kafferosteri',
        origin: 'Etiopien, Yirgacheffe',
        flavor: 'Fruktig, söt, balanserad',
        description: 'Ett fruktigt och sött kaffe med en balanserad eftersmak. Perfekt för en långsam morgon.',
        type: 'Hela bönor',
        weight: '250g',
        roastDate: '2025-12-05',
        price: 129,
        image: '/images/morgonbris.png'
    },
    {
        id: 'skogsglanta',
        name: 'Skogsglänta',
        roastery: 'Stockholms Rosteri',
        origin: 'Colombia, Huila',
        flavor: 'Nötig, choklad, fyllig',
        description: 'En fyllig och nötig kopp med toner av mörk choklad. Passar perfekt till eftermiddagsfikat.',
        type: 'Hela bönor',
        weight: '250g',
        roastDate: '2025-12-03',
        price: 139,
        image: '/images/skogsglanta.png'
    },
    {
        id: 'midnattsblandning',
        name: 'Midnattsblandning',
        roastery: 'Malmö Kaffekooperativ',
        origin: 'Brasilien, Minas Gerais',
        flavor: 'Mörk, intensiv, kryddig',
        description: 'En djup och intensiv rost med kryddiga undertoner. För den som älskar starkt kaffe.',
        type: 'Hela bönor',
        weight: '250g',
        roastDate: '2025-12-04',
        price: 149,
        image: '/images/midnattsblandning.png'
    },
    {
        id: 'soluppgang',
        name: 'Soluppgång',
        roastery: 'Uppsala Rosteri',
        origin: 'Kenya, Nyeri',
        flavor: 'Citrus, blommig, ljus',
        description: 'Ett ljust och fräscht kaffe med citrus- och blommiga noter. Perfekt morgonkaffe.',
        type: 'Hela bönor',
        weight: '250g',
        roastDate: '2025-12-06',
        price: 159,
        image: '/images/soluppgang.png'
    },
    {
        id: 'bergstopp',
        name: 'Bergstopp',
        roastery: 'Umeå Kafferosteri',
        origin: 'Guatemala, Antigua',
        flavor: 'Karamell, mandel, rökig',
        description: 'Ett komplext kaffe med söta karamellnoter och en lätt rökighet. Odlat på vulkansluttningar.',
        type: 'Hela bönor',
        weight: '250g',
        roastDate: '2025-12-02',
        price: 169,
        image: '/images/bergstopp.png'
    },
    {
        id: 'havsbris',
        name: 'Havsbris',
        roastery: 'Karlskrona Rosteri',
        origin: 'Costa Rica, Tarrazú',
        flavor: 'Honung, aprikos, len',
        description: 'Ett silkeslent kaffe med naturlig sötma av honung och mogna aprikoser.',
        type: 'Hela bönor',
        weight: '250g',
        roastDate: '2025-12-01',
        price: 145,
        image: '/images/havsbris.png'
    },
    {
        id: 'vintervila',
        name: 'Vintervila',
        roastery: 'Luleå Kaffehandel',
        origin: 'Rwanda, Nyamasheke',
        flavor: 'Bär, jasmin, sirapig',
        description: 'Ett exotiskt kaffe med intensiva bärtoner och blommig jasmin. Perfekt för mörka vinterkvällar.',
        type: 'Hela bönor',
        weight: '250g',
        roastDate: '2025-12-04',
        price: 179,
        image: '/images/vintervila.png'
    },
    {
        id: 'hostlov',
        name: 'Höstlöv',
        roastery: 'Örebro Rosteri',
        origin: 'Peru, Cajamarca',
        flavor: 'Hasselnöt, kakao, mild',
        description: 'Ett mjukt och lättdrucket kaffe med toner av rostade hasselnötter och kakao.',
        type: 'Hela bönor',
        weight: '250g',
        roastDate: '2025-12-03',
        price: 135,
        image: '/images/hostlov.png'
    }
];

// API Routes
app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Produkt ej hittad' });
    }
});

app.post('/api/checkout', (req, res) => {
    const { items, customer } = req.body;

    // Simulera orderhantering
    const orderId = 'ORD-' + Date.now();

    console.log('Ny beställning:', { orderId, items, customer });

    res.json({
        success: true,
        orderId,
        message: 'Tack för din beställning!'
    });
});

// Serve index.html for all other routes (SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    const interfaces = os.networkInterfaces();
    let ipAddress = 'localhost';
    const availableInterfaces = [];

    for (const name of Object.keys(interfaces)) {
        for (const interface of interfaces[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            if (interface.family === 'IPv4' && !interface.internal) {
                availableInterfaces.push(interface.address);
            }
        }
    }

    // Prioritize non-Docker IPs (Docker usually uses 172.x.x.x)
    // We prefer 192.168.x.x, 10.x.x.x, or public IPs
    const preferredIp = availableInterfaces.find(ip => !ip.startsWith('172.'));

    ipAddress = preferredIp || availableInterfaces[0] || 'localhost';

    console.log(`☕ Bönan & Koppen körs på http://${ipAddress}:${PORT}`);
});
