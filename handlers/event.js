const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger.js');

async function loadEvents(client) {
    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const event = require(`../events/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
    logger.info('Eventler yüklendi!');
}

module.exports = { loadEvents };
