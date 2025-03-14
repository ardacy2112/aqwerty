const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('baglanti')
        .setDescription('İndirme bağlantısını DM olarak gönderir'),

    async execute(interaction) {
        try {
            await interaction.user.send({
                content: 'İndirme Linki: https://github.com/ardacy2112/goodbyedpiardactrversion/releases'
            });
            
            await interaction.reply({
                content: '✅ İndirme bağlantısı DM\'inize gönderildi!',
                ephemeral: true
            });
        } catch (error) {
            await interaction.reply({
                content: '❌ DM\'iniz kapalı olduğu için mesaj gönderilemedi! Lütfen DM\'inizi açın.',
                ephemeral: true
            });
        }
    },
};
