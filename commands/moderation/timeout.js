const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sustur')
        .setDescription('Kullanıcıyı belirtilen süre boyunca susturur')
        .addUserOption(option =>
            option.setName('kullanici')
                .setDescription('Susturulacak kullanıcı')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('sure')
                .setDescription('Susturma süresi (dakika)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('sebep')
                .setDescription('Susturma sebebi'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction) {
        const user = interaction.options.getUser('kullanici');
        const duration = interaction.options.getInteger('sure');
        const reason = interaction.options.getString('sebep') || 'Sebep belirtilmedi';
        
        if (duration < 1 || duration > 40320) {
            return interaction.reply({
                content: 'Süre 1 ile 40320 dakika (28 gün) arasında olmalıdır!',
                ephemeral: true
            });
        }

        try {
            const member = await interaction.guild.members.fetch(user.id);
            await member.timeout(duration * 60 * 1000, reason);
            await interaction.reply(`${user.tag} ${duration} dakika boyunca susturuldu.\nSebep: ${reason}`);
        } catch (error) {
            await interaction.reply({
                content: 'Kullanıcı susturulurken bir hata oluştu!',
                ephemeral: true
            });
        }
    },
};
