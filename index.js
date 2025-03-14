const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.js');
const { loadCommands } = require('./handlers/command.js');
const { loadEvents } = require('./handlers/event.js');
const logger = require('./utils/logger.js');

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

// Hata yakalama
process.on('unhandledRejection', error => {
    logger.error('Yakalanmamış Promise Reddi:', error);
});

process.on('uncaughtException', error => {
    logger.error('Yakalanmamış Hata:', error);
});

// SIGTERM sinyalini yakala
process.on('SIGTERM', () => {
    logger.info('SIGTERM sinyali alındı, güvenli kapatma başlatılıyor...');
    if (client.isReady()) {
        client.destroy();
    }
    process.exit(0);
});

// Bot'u başlatma fonksiyonu
async function startBot() {
    try {
        await client.login(token);
        logger.info(`${client.user.tag} olarak giriş yapıldı!`);

        // Komutları ve eventleri yükle
        await loadCommands(client);
        await loadEvents(client);
    } catch (error) {
        logger.error('Başlatma hatası:', error);
        process.exit(1);
    }
}

// Bot'u başlat
startBot();
