const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Belirtilen sayıda mesaj siler')
        .addIntegerOption(option =>
            option.setName('miktar')
                .setDescription('Silinecek mesaj sayısı (1-100)')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction) {
        const amount = interaction.options.getInteger('miktar');

        if (amount < 1 || amount > 100) {
            return interaction.reply({
                content: 'Lütfen 1 ile 100 arasında bir sayı girin!',
                ephemeral: true
            });
        }

        try {
            const messages = await interaction.channel.bulkDelete(amount, true);
            await interaction.reply({
                content: `${messages.size} mesaj silindi!`,
                ephemeral: true
            });
        } catch (error) {
            await interaction.reply({
                content: 'Mesajlar silinirken bir hata oluştu!',
                ephemeral: true
            });
        }
    },
};
