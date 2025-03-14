const { SlashCommandBuilder } = require('discord.js');

const answers = [
    'Kesinlikle evet!',
    'Evet gibi görünüyor.',
    'Belki.',
    'Şu an söyleyemem.',
    'Tekrar sor.',
    'Buna güvenme.',
    'Hayır.',
    'Kesinlikle hayır!',
    'Büyük ihtimalle.',
    'Görünüşe göre hayır.',
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Sihirli 8ball sorunuzu cevaplar')
        .addStringOption(option =>
            option.setName('soru')
                .setDescription('Sormak istediğiniz soru')
                .setRequired(true)),

    async execute(interaction) {
        const question = interaction.options.getString('soru');
        const answer = answers[Math.floor(Math.random() * answers.length)];
        await interaction.reply(`🎱 **Soru:** ${question}\n**Cevap:** ${answer}`);
    },
};
