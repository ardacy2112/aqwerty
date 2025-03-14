const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('randomsayi')
        .setDescription('Belirtilen aralıkta rastgele bir sayı üretir')
        .addIntegerOption(option =>
            option.setName('min')
                .setDescription('Minimum sayı')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('max')
                .setDescription('Maximum sayı')
                .setRequired(true)),

    async execute(interaction) {
        const min = interaction.options.getInteger('min');
        const max = interaction.options.getInteger('max');

        if (min >= max) {
            return interaction.reply({
                content: 'Minimum sayı, maximum sayıdan küçük olmalıdır!',
                ephemeral: true
            });
        }

        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        await interaction.reply(`🎲 ${min} ile ${max} arasında rastgele sayı: **${randomNum}**`);
    },
};
