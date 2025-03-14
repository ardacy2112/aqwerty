const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { embedColor } = require('../../config.js');

const dictionary = {
    'selam': 'Selamlaşma sözü',
    'merhaba': 'Selamlaşma sözü',
    'güle güle': 'Ayrılırken söylenen iyi dilek sözü',
    'hoşça kal': 'Vedalaşma sözü',
    'aferin': 'Beğenme, takdir etme sözü',
    'teşekkür': 'Minnet bildirme sözü',
    // Daha fazla kelime eklenebilir
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sözlük')
        .setDescription('Kelimelerin anlamını gösterir')
        .addStringOption(option =>
            option.setName('kelime')
                .setDescription('Anlamı aranacak kelime')
                .setRequired(true)),

    async execute(interaction) {
        const word = interaction.options.getString('kelime').toLowerCase();
        const meaning = dictionary[word];

        const embed = new EmbedBuilder()
            .setColor(embedColor)
            .setTitle(`📚 ${word}`)
            .setTimestamp();

        if (meaning) {
            embed.setDescription(`**Anlam:** ${meaning}`);
        } else {
            embed.setDescription('❌ Bu kelime sözlükte bulunamadı.');
        }

        await interaction.reply({ embeds: [embed] });
    },
};
