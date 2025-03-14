const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Belirtilen kullanıcıyı sunucudan atar')
        .addUserOption(option =>
            option.setName('kullanici')
                .setDescription('Atılacak kullanıcı')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('sebep')
                .setDescription('Atılma sebebi'))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

    async execute(interaction) {
        const user = interaction.options.getUser('kullanici');
        const reason = interaction.options.getString('sebep') || 'Sebep belirtilmedi';

        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.KickMembers)) {
            return interaction.reply({
                content: 'Bu işlem için yetkim yok!',
                ephemeral: true
            });
        }

        try {
            await interaction.guild.members.kick(user, reason);
            await interaction.reply(`${user.tag} kullanıcısı sunucudan atıldı.\nSebep: ${reason}`);
        } catch (error) {
            await interaction.reply({
                content: 'Kullanıcı atılırken bir hata oluştu!',
                ephemeral: true
            });
        }
    },
};
