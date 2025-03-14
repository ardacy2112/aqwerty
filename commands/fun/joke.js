const { SlashCommandBuilder } = require('discord.js');

const jokes = [
    'Adamın biri güneşte yanmış, ay da düşüp düşüp bayılmış!',
    'Sinemada on dakika ara dedi, aradım aradım açmadı.',
    'Yılan yılan diye bağırmış, yılan değilmiş.',
    'Hafıza kaybım var ama unuttum.',
    'Geçen gün taksi çevirdim hala dönüyor.',
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('espri')
        .setDescription('Rastgele bir espri yapar'),

    async execute(interaction) {
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        await interaction.reply(randomJoke);
    },
};