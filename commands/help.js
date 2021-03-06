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
        { name: `**.about**`, value: 'Provides a description and some stats of the bot.\nAliases: `.info`, `.stats`' },
        { name: `**.ping**`, value: 'Returns the bot\'s latency and API ping.\nAliases: `.latency`' },
        { name: `**.repo**`, value: 'Provides the repo url of the bot.\nAliases: `.source`, `.github`' },
        { name: `**.serverinfo**`, value: 'Provides some info about the server.\nAliases: `.server`, `.guild`' },
        { name: `**.userinfo**`, value: 'Provides some info on the specified user.\nAliases: `.user`\nUsage: `.user-info @username/member_id`' },
        { name: `**.kick**`, value: 'Kicks a member from the current server.\nUsage: `.kick @username/member_id`' },
        { name: `**.ban**`, value: 'Bans a member from the current server.\nAliases: `.banish`\nUsage: `.ban @username/member_id`' },
        { name: `**.unban**`, value: 'Unbans a member from the current server.\nAliases: `.unbanish`\nUsage: `.unban user_id`' },
        { name: `**.mute**`, value: 'Prevents a member from sending messages/adding reactions.\nUsage: `.mute @username/member_id`' },
        { name: `**.unmute**`, value: 'Allows a member to send messages/add reactions.\nUsage: `.unmute @username/member_id`' },
        { name: `**.purge**`, value: 'Deletes the number of messages provided.\nAliases: `.delete`\nUsage: `.purge [number_of_messages_to_delete]`' },
        { name: `**.addrole**`, value: 'Adds the specified role to a member.\nUsage: `.add-role @username/member_id <role-name>`' },
        { name: `**.removerole**`, value: 'Removes the specified role from a member.\nUsage: `.remove-role @username/member_id <role-name>`' },
        { name: `**.lock**`, value: 'Prevents members with the @everyone role from viewing/sending messages in a specific channel.\nUsage: `.lock [#channel-name/channel_id] <lock-mode>`\nLock modes: `send, view/read`' },
        { name: `**.unlock**`, value: 'Allows members with the @everyone role to view/send messages in a specific channel.\nUsage: `.unlock [#channel-name/channel_id] <unlock-mode>`\nUnlock modes: `send, view/read`' },
      )
      .setColor('#63D6FF');

    message.author.send(helpEmbed);
  },
};