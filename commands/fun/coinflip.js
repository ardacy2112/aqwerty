const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yazitura')
        .setDescription('Yazı tura atar'),

    async execute(interaction) {
        const result = Math.random() < 0.5 ? 'Yazı' : 'Tura';
        await interaction.reply(`🪙 ${result} geldi!`);
    },
};
