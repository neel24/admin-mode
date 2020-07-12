module.exports = {
  name: 'unmute',
  description: 'Gives a member back the permissions to send messages/add reactions.',
  guildOnly: true,
  execute(bot, message) {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      if (!message.mentions.users.size) {
        return message.reply('You need to tag a user in order to unmute them!');
      }
      const member = message.mentions.members.first();
      const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

      if (!member.roles.cache.some(role => role.name === 'Muted')) {
        return message.reply(`${member.displayName} is already unmuted!`);
      }

      message.channel.permissionOverwrites.get(member.user.id).delete();
      member.roles.remove(muteRole).then(() => {
        message.channel.send(`${member.displayName} has been unmuted!`).catch(() => {
          message.reply(`Sorry, I'm unable to unmute ${member.displayName}`);
        });
      });
    }
    else {
      message.reply('Sorry, this is an admin-only feature!');
    }
  },
};