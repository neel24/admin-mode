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
        { name: `**.about**`, value: 'Provides a description and some stats of the bot.' },
        { name: `**.ping**`, value: 'Returns the bot\'s latency and API ping.' },
        { name: `**.repo**`, value: 'Provides the repo url of the bot.' },
        { name: `**.server-info**`, value: 'Provides some info about the server.' },
        { name: `**.user-info**`, value: 'Provides some info on the specified user.\nUsage: `.user-info @username/member_id`' },
        { name: `**.kick**`, value: 'Kicks a member from the current server.\nUsage: `.kick @username/member_id`' },
        { name: `**.ban**`, value: 'Bans a member from the current server.\nUsage: `.ban @username/member_id`' },
        { name: `**.unban**`, value: 'Unbans a member from the current server.\nUsage: `.unban user_id`' },
        { name: `**.mute**`, value: 'Prevents a member from sending messages/adding reactions.\nUsage: `.mute @username/member_id`' },
        { name: `**.unmute**`, value: 'Gives a member back the permissions to send messages/add reactions.\nUsage: `.unmute @username/member_id`' },
        { name: `**.purge**`, value: 'Deletes the number of messages provided.\nUsage: `.purge [number_of_messages_to_delete]`' },
        { name: `**.add-role**`, value: 'Adds the specified role to a member.\nUsage: `.add-role @username/member_id <role-name>`' },
        { name: `**.remove-role**`, value: 'Removes the specified role from a member.\nUsage: `.remove-role @username/member_id <role-name>`' },
      )
      .setColor('#63D6FF');

    message.channel.send(helpEmbed);
  },
};