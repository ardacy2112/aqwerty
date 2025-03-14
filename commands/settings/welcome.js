const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hosgeldin')
        .setDescription('Hoş geldin mesajı ayarlarını yapar')
        .addSubcommand(subcommand =>
            subcommand
                .setName('kanal')
                .setDescription('Hoş geldin mesajlarının gönderileceği kanalı ayarlar')
                .addChannelOption(option =>
                    option.setName('kanal')
                        .setDescription('Hoş geldin kanalı')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('mesaj')
                .setDescription('Hoş geldin mesajını ayarlar')
                .addStringOption(option =>
                    option.setName('mesaj')
                        .setDescription('Hoş geldin mesajı ({user} ile üyeyi etiketleyebilirsiniz)')
                        .setRequired(true)))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'kanal') {
            const channel = interaction.options.getChannel('kanal');
            interaction.guild.welcomeChannel = channel.id;
            await interaction.reply(`Hoş geldin kanalı ${channel} olarak ayarlandı!`);
        } else if (subcommand === 'mesaj') {
            const message = interaction.options.getString('mesaj');
            interaction.guild.welcomeMessage = message;
            await interaction.reply('Hoş geldin mesajı ayarlandı!\nÖrnek:');
            await interaction.channel.send(message.replace('{user}', interaction.user.toString()));
        }
    },
};
