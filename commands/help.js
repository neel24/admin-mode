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
        { name: '`.kick`', value: 'Kicks a member from the current server.\n Usage: `.kick @username/member_id`' },
        { name: '`.ban`', value: 'Bans a member from the current server.\n Usage: `.ban @username/member_id`' },
        { name: '`.unban`', value: 'Unbans a member from the current server.\n Usage: `.unban user_id`' },
        { name: '`.mute`', value: 'Prevents a member from sending messages/adding reactions.\n Usage: `.mute @username/member_id`' },
        { name: '`.unmute`', value: 'Gives a member back the permissions to send messages/add reactions.\n Usage: `.unmute @username/member_id`' },
        { name: '`.purge`', value: 'Deletes the number of messages provided.\n Usage: `.purge [number_of_messages_to_delete]`' },
        { name: '`.add-role`', value: 'Adds the specified role to a member.\n Usage: `.add-role @username/member_id <role-name>`' },
        { name: '`.remove-role`', value: 'Removes the specified role from a member.\n Usage: `.remove-role @username/member_id <role-name>`' },
        { name: '`.add-admin`', value: 'Adds the "Admin" role to a member.\n Usage: `.add-admin @username/member_id`' },
        { name: '`.remove-admin`', value: 'Removes the "Admin" role from a member.\n Usage: `.remove-admin @username/member_id`' },
      )
      .setColor('#63D6FF');

    message.channel.send(helpEmbed);
  },
};