const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger.js');
const { token } = require('../config.js');

async function loadCommands(client) {
    const commands = [];
    const commandFolders = fs.readdirSync('./commands');

    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
        
        for (const file of commandFiles) {
            const command = require(`../commands/${folder}/${file}`);
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
                commands.push(command.data.toJSON());
            }
        }
    }

    const rest = new REST().setToken(token);

    try {
        logger.info('Komutlar yükleniyor...');
        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands },
        );
        logger.info('Komutlar başarıyla yüklendi!');
    } catch (error) {
        logger.error('Komut yükleme hatası:', error);
    }
}

module.exports = { loadCommands };
