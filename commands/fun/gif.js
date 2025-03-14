const { SlashCommandBuilder } = require('discord.js');

const gifs = [
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDFtY...',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDJ0d...',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDN0Z...',
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gif')
        .setDescription('Rastgele bir gif gönderir'),

    async execute(interaction) {
        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
        await interaction.reply(randomGif);
    },
};
