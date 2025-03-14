const { ActivityType } = require('discord.js');
const logger = require('../utils/logger.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        logger.info(`${client.user.tag} olarak giriş yapıldı!`);
        logger.info('Bot durumu "dnd" olarak ayarlanıyor...');

        client.user.setPresence({
            activities: [{ 
                name: '/help komutlar', 
                type: ActivityType.Watching 
            }],
            status: 'dnd',
        });

        logger.info('Bot durumu başarıyla ayarlandı!');
    },
};