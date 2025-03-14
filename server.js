const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.send('Bot çalışıyor!');
});

app.get('/uptime', (req, res) => {
    res.send('OK');
});

// Hata yakalama middleware'i
app.use((err, req, res, next) => {
    console.error('Server hatası:', err);
    res.status(500).send('Sunucu hatası!');
});

function keepAlive() {
    const server = app.listen(port, '0.0.0.0', () => {
        console.log(`Server ${port} portunda çalışıyor`);
    });

    // Hata yakalama ve otomatik yeniden başlatma
    server.on('error', (error) => {
        console.error('Server hatası:', error);
        if (error.code === 'EADDRINUSE') {
            console.log('Port kullanımda, 1 saniye sonra yeniden denenecek...');
            setTimeout(() => {
                server.close();
                keepAlive();
            }, 1000);
        }
    });

    // Bağlantı kapanırsa yeniden başlat
    server.on('close', () => {
        console.log('Server kapandı, yeniden başlatılıyor...');
        setTimeout(keepAlive, 1000);
    });

    return server;
}

module.exports = keepAlive;