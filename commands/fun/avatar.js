const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Belirtilen kullanıcının avatarını gösterir')
        .addUserOption(option =>
            option.setName('kullanici')
                .setDescription('Avatar görüntülenecek kullanıcı')),

    async execute(interaction) {
        const user = interaction.options.getUser('kullanici') || interaction.user;
        const embed = new EmbedBuilder()
            .setTitle(`${user.tag} Avatarı`)
            .setImage(user.displayAvatarURL({ size: 1024, dynamic: true }))
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
