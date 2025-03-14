const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { embedColor } = require('../../config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Bot\'un ping değerini ve çalışma süresini gösterir'),

    async execute(interaction) {
        const sent = await interaction.deferReply({ ephemeral: true });
        
        // Uptime hesaplama
        const days = Math.floor(interaction.client.uptime / 86400000);
        const hours = Math.floor(interaction.client.uptime / 3600000) % 24;
        const minutes = Math.floor(interaction.client.uptime / 60000) % 60;
        
        const embed = new EmbedBuilder()
            .setColor(embedColor)
            .setTitle('🏓 Pong!')
            .addFields(
                { 
                    name: '📡 Ping', 
                    value: `${interaction.client.ws.ping}ms`, 
                    inline: true 
                },
                { 
                    name: '⏰ Çalışma Süresi', 
                    value: `${days} gün, ${hours} saat, ${minutes} dakika`, 
                    inline: true 
                }
            )
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
    },
};
