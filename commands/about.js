const Discord = require('discord.js');

module.exports = {
  name: 'about',
  aliases: ['info'],
  description: 'Provides a description of the bot.',
  execute(message) {
    const mainEmbed = new Discord.MessageEmbed()
      .setTitle('Admin Mode')
      .setDescription('Hey there! I\'m a Discord bot used for admin management. Run  `.help` for available commands!')
      .setColor('#63D6FF');

    message.channel.send(mainEmbed);
  },
};