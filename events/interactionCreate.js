const logger = require('../utils/logger.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            logger.error(`${interaction.commandName} komutu bulunamadı.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            logger.error(error);
            await interaction.reply({
                content: 'Bu komutu çalıştırırken bir hata oluştu!',
                ephemeral: true
            });
        }
    },
};
