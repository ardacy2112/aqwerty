const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { embedColor } = require('../../config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bilgi')
        .setDescription('Sunucu veya kullanıcı hakkında bilgi verir')
        .addSubcommand(subcommand =>
            subcommand
                .setName('sunucu')
                .setDescription('Sunucu hakkında bilgi verir'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('kullanici')
                .setDescription('Kullanıcı hakkında bilgi verir')
                .addUserOption(option =>
                    option.setName('kullanici')
                        .setDescription('Bilgi verilecek kullanıcı'))),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        const embed = new EmbedBuilder().setColor(embedColor);

        if (subcommand === 'sunucu') {
            const guild = interaction.guild;
            embed
                .setTitle(`📊 ${guild.name} Sunucu Bilgileri`)
                .setThumbnail(guild.iconURL())
                .addFields(
                    { name: '👑 Sahip', value: `<@${guild.ownerId}>`, inline: true },
                    { name: '👥 Üye Sayısı', value: guild.memberCount.toString(), inline: true },
                    { name: '📜 Rol Sayısı', value: guild.roles.cache.size.toString(), inline: true },
                    { name: '💬 Kanal Sayısı', value: guild.channels.cache.size.toString(), inline: true },
                    { name: '📅 Oluşturulma Tarihi', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`, inline: true }
                );
        } else {
            const targetUser = interaction.options.getUser('kullanici') || interaction.user;
            const member = await interaction.guild.members.fetch(targetUser.id);
            
            embed
                .setTitle(`👤 ${targetUser.tag} Kullanıcı Bilgileri`)
                .setThumbnail(targetUser.displayAvatarURL())
                .addFields(
                    { name: '🆔 Kullanıcı ID', value: targetUser.id, inline: true },
                    { name: '📅 Hesap Oluşturma', value: `<t:${Math.floor(targetUser.createdTimestamp / 1000)}:F>`, inline: true },
                    { name: '📥 Sunucuya Katılma', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`, inline: true },
                    { name: '🎭 Roller', value: member.roles.cache.map(role => role.toString()).join(', ') || 'Rol yok' }
                );
        }

        await interaction.reply({ embeds: [embed] });
    },
};
