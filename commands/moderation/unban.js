const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Belirtilen kullanıcının yasağını kaldırır')
        .addStringOption(option =>
            option.setName('id')
                .setDescription('Yasağı kaldırılacak kullanıcı ID')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction) {
        const userId = interaction.options.getString('id');

        try {
            await interaction.guild.members.unban(userId);
            await interaction.reply(`<@${userId}> kullanıcısının yasağı kaldırıldı!`);
        } catch (error) {
            await interaction.reply({
                content: 'Kullanıcının yasağı kaldırılırken bir hata oluştu!',
                ephemeral: true
            });
        }
    },
};
