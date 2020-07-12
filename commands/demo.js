const Discord = require('discord.js');

module.exports = {
  name: 'demo',
  description: 'Provides a demo video of the bot.',
  execute(message) {
    const demoEmbed = new Discord.MessageEmbed()
      .setTitle('Demo video')
      .setDescription('This is a useful demo of the bot in action: https://www.youtube.com/watch?v=dQw4w9WgXcQ')
      .setColor('#63D6FF');

    message.channel.send(demoEmbed);
  },
};