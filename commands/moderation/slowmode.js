const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yavasmod')
        .setDescription('Kanalın yavaş modunu ayarlar')
        .addIntegerOption(option =>
            option.setName('sure')
                .setDescription('Yavaş mod süresi (saniye)')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        const duration = interaction.options.getInteger('sure');
        
        if (duration < 0 || duration > 21600) {
            return interaction.reply({
                content: 'Süre 0 ile 21600 saniye (6 saat) arasında olmalıdır!',
                ephemeral: true
            });
        }

        try {
            await interaction.channel.setRateLimitPerUser(duration);
            await interaction.reply(
                duration === 0
                    ? 'Yavaş mod kapatıldı!'
                    : `Yavaş mod ${duration} saniye olarak ayarlandı!`
            );
        } catch (error) {
            await interaction.reply({
                content: 'Yavaş mod ayarlanırken bir hata oluştu!',
                ephemeral: true
            });
        }
    },
};
