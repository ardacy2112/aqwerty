const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { uptimeInterval } = require('../../config.js');
const http = require('http');
const https = require('https');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('monitor')
        .setDescription('Web sitesi izlemeyi başlatır')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('İzlenecek web sitesi URL\'i')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const url = interaction.options.getString('url');
        const client = interaction.client;

        try {
            new URL(url);
        } catch {
            return interaction.reply({
                content: 'Geçersiz URL formatı!',
                ephemeral: true
            });
        }

        const monitor = {
            url,
            channelId: interaction.channelId,
            status: 'up',
            lastCheck: Date.now(),
            interval: setInterval(() => checkStatus(url, interaction.channelId, client), uptimeInterval)
        };

        client.monitors.set(url, monitor);
        await interaction.reply(`${url} adresi izlenmeye başlandı!`);
    },
};

function checkStatus(url, channelId, client) {
    const protocol = url.startsWith('https') ? https : http;

    const req = protocol.get(url, (res) => {
        const monitor = client.monitors.get(url);
        const channel = client.channels.cache.get(channelId);

        if (res.statusCode >= 200 && res.statusCode < 300) {
            if (monitor.status === 'down') {
                channel.send(`✅ ${url} tekrar erişilebilir durumda!`);
                monitor.status = 'up';
            }
        } else {
            if (monitor.status === 'up') {
                channel.send(`❌ ${url} erişilemez durumda! Status: ${res.statusCode}`);
                monitor.status = 'down';
            }
        }
        monitor.lastCheck = Date.now();
    });

    req.on('error', (error) => {
        const monitor = client.monitors.get(url);
        const channel = client.channels.cache.get(channelId);

        if (monitor.status === 'up') {
            channel.send(`❌ ${url} erişilemez durumda! Hata: ${error.message}`);
            monitor.status = 'down';
        }
        monitor.lastCheck = Date.now();
    });
}
