const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { maxWarnings } = require('../../config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Kullanıcıyı uyarır')
        .addUserOption(option =>
            option.setName('kullanici')
                .setDescription('Uyarılacak kullanıcı')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('sebep')
                .setDescription('Uyarı sebebi'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction) {
        const user = interaction.options.getUser('kullanici');
        const reason = interaction.options.getString('sebep') || 'Sebep belirtilmedi';

        if (!interaction.client.warnings.has(user.id)) {
            interaction.client.warnings.set(user.id, []);
        }

        const warnings = interaction.client.warnings.get(user.id);
        warnings.push({
            reason,
            moderator: interaction.user.id,
            timestamp: Date.now()
        });

        if (warnings.length >= maxWarnings) {
            try {
                await interaction.guild.members.kick(user, `${maxWarnings} uyarı limitini aştı`);
                interaction.client.warnings.delete(user.id);
                return interaction.reply(`${user.tag} ${maxWarnings} uyarı limitini aştığı için sunucudan atıldı.`);
            } catch (error) {
                return interaction.reply({
                    content: 'Kullanıcı atılırken bir hata oluştu!',
                    ephemeral: true
                });
            }
        }

        await interaction.reply(`${user.tag} uyarıldı.\nSebep: ${reason}\nToplam Uyarı: ${warnings.length}`);
    },
};
