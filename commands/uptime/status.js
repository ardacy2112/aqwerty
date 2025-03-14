const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { embedColor } = require('../../config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('İzlenen sitelerin durumunu gösterir'),

    async execute(interaction) {
        const monitors = interaction.client.monitors;

        if (monitors.size === 0) {
            return interaction.reply('Şu anda izlenen site bulunmuyor!');
        }

        const embed = new EmbedBuilder()
            .setColor(embedColor)
            .setTitle('Site İzleme Durumu')
            .setTimestamp();

        monitors.forEach((monitor, url) => {
            const status = monitor.status === 'up' ? '✅ Çalışıyor' : '❌ Çalışmıyor';
            const lastCheck = new Date(monitor.lastCheck).toLocaleString('tr-TR');
            
            embed.addFields({
                name: url,
                value: `Durum: ${status}\nSon Kontrol: ${lastCheck}`
            });
        });

        await interaction.reply({ embeds: [embed] });
    },
};
