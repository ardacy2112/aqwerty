const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Belirtilen kullanıcıyı sunucudan yasaklar')
        .addUserOption(option =>
            option.setName('kullanici')
                .setDescription('Yasaklanacak kullanıcı')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('sebep')
                .setDescription('Yasaklanma sebebi'))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction) {
        const user = interaction.options.getUser('kullanici');
        const reason = interaction.options.getString('sebep') || 'Sebep belirtilmedi';

        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.BanMembers)) {
            return interaction.reply({
                content: 'Bu işlem için yetkim yok!',
                ephemeral: true
            });
        }

        try {
            await interaction.guild.members.ban(user, { reason });
            await interaction.reply(`${user.tag} kullanıcısı sunucudan yasaklandı.\nSebep: ${reason}`);
        } catch (error) {
            await interaction.reply({
                content: 'Kullanıcı yasaklanırken bir hata oluştu!',
                ephemeral: true
            });
        }
    },
};
