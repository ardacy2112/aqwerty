const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { embedColor } = require('../../config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Tüm komutları listeler'),

    async execute(interaction) {
        const client = interaction.client;
        const embed = new EmbedBuilder()
            .setColor(embedColor)
            .setTitle('🤖 Bot Komutları')
            .setDescription('Aşağıda kullanabileceğiniz tüm komutlar listelenmiştir.')
            .setTimestamp();

        // Komutları kategorilere ayır
        const categories = {};
        client.commands.forEach(command => {
            const category = command.data.name.split('/')[0] || 'Genel';
            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push(command);
        });

        // Her kategori için field ekle
        for (const [category, commands] of Object.entries(categories)) {
            let commandList = '';
            commands.forEach(command => {
                commandList += `\`/${command.data.name}\`: ${command.data.description}\n`;
            });
            
            embed.addFields({
                name: `📑 ${category.charAt(0).toUpperCase() + category.slice(1)} Komutları`,
                value: commandList || 'Komut bulunamadı.',
            });
        }

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
