const { EmbedBuilder } = require('discord.js');
const logger = require('../utils/logger.js');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        if (!member.guild.welcomeChannel || !member.guild.welcomeMessage) return;

        try {
            const welcomeEmbed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('Yeni Üye!')
                .setDescription(member.guild.welcomeMessage.replace('{user}', member.user.toString()))
                .setThumbnail(member.user.displayAvatarURL())
                .setTimestamp();

            const channel = member.guild.channels.cache.get(member.guild.welcomeChannel);
            if (channel) {
                await channel.send({ embeds: [welcomeEmbed] });
            }
        } catch (error) {
            logger.error('Hoş geldin mesajı gönderilirken hata:', error);
        }
    },
};
