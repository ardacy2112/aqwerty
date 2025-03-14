const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.js');
const { loadCommands } = require('./handlers/command.js');
const { loadEvents } = require('./handlers/event.js');
const logger = require('./utils/logger.js');
const keepAlive = require('./server.js');
const http = require('http');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();
client.warnings = new Map();
client.monitors = new Map();

let restartAttempts = 0;
const MAX_RESTART_ATTEMPTS = 5;
const RESTART_DELAY = 5000; // 5 saniye

// Self-ping sistemi
function startSelfPing() {
    setInterval(() => {
        http.get('http://localhost:5000/uptime', (res) => {
            if (res.statusCode === 200) {
                logger.info('Self-ping başarılı');
            }
        }).on('error', (err) => {
            logger.error('Self-ping hatası:', err.message);
            handleRestart();
        });
    }, 280000); // ~4.7 dakika (5 dakikadan biraz kısa)
}

// Hata yakalama
process.on('unhandledRejection', error => {
    logger.error('Yakalanmamış Promise Reddi:', error);
    // Kritik olmayan hatalarda devam et
});

process.on('uncaughtException', error => {
    logger.error('Yakalanmamış Hata:', error);
    if (client.isReady()) {
        logger.info('Bot yeniden başlatılıyor...');
        handleRestart();
    }
});

// SIGTERM sinyalini yakala
process.on('SIGTERM', () => {
    logger.info('SIGTERM sinyali alındı, güvenli kapatma başlatılıyor...');
    if (client.isReady()) {
        client.destroy();
    }
    process.exit(0);
});

async function handleRestart() {
    if (restartAttempts >= MAX_RESTART_ATTEMPTS) {
        logger.error(`Maksimum yeniden başlatma denemesi (${MAX_RESTART_ATTEMPTS}) aşıldı. Bot kapatılıyor.`);
        process.exit(1);
    }

    restartAttempts++;
    logger.info(`Yeniden başlatma denemesi ${restartAttempts}/${MAX_RESTART_ATTEMPTS}`);

    try {
        await client.destroy();
        setTimeout(startBot, RESTART_DELAY);
    } catch (error) {
        logger.error('Yeniden başlatma hatası:', error);
        process.exit(1);
    }
}

// Ana başlatma fonksiyonu
async function startBot() {
    try {
        // Önce HTTP sunucusunu başlat
        keepAlive();

        // Self-ping sistemini başlat
        startSelfPing();

        // Sonra Discord'a bağlan
        await client.login(token);
        logger.info(`${client.user.tag} olarak giriş yapıldı!`);

        // Komutları ve eventleri yükle
        await loadCommands(client);
        await loadEvents(client);

        // Başarılı başlatma sonrası restart sayacını sıfırla
        restartAttempts = 0;
    } catch (error) {
        logger.error('Başlatma hatası:', error);
        handleRestart();
    }
}







// Bot'u başlat
startBot();