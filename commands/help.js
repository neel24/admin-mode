const Discord = require('discord.js');

module.exports = {
  name: 'help',
  aliases: ['commands'],
  description: 'Lists the available commands and the usage.',
  execute(bot, message) {
    const helpEmbed = new Discord.MessageEmbed()
      .setTitle('Available commands')
      .setDescription('Here are the available commands which can be run:')
      .addFields(
        { name: '`.about`', value: 'Provides a description and some stats of the bot.' },
        { name: '`.demo`', value: 'Provides a demo video of the bot.' },
        { name: '`.ping`', value: 'Returns the bot\'s latency and API ping.' },
        { name: '`.kick`', value: 'Kicks a member from the current server.\n Usage: `.kick @username`' },
        { name: '`.ban`', value: 'Bans a member from the current server.\n Usage: `.ban @username`' },
        { name: '`.mute`', value: 'Prevents a member from sending messages/adding reactions.\n Usage: `.mute @username`' },
        { name: '`.unmute`', value: 'Gives a member back the permissions to send messages/add reactions.\n Usage: `.unmute @username`' },
        { name: '`.purge`', value: 'Deletes the number of messages provided.\n Usage: `.purge [number_of_messages_to_delete]`' },
        { name: '`.add-admin`', value: 'Adds the "Admin" role to a member.\n Usage: `.add-admin @username`' },
        { name: '`.remove-admin`', value: 'Removes the "Admin" role from a member.\n Usage: `.remove-admin @username`' },
      )
      .setColor('#63D6FF');

    message.channel.send(helpEmbed);
  },
};