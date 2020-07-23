module.exports = {
  name: 'unmute',
  description: 'Gives a member back the permissions to send messages/add reactions.',
  guildOnly: true,
  execute(bot, message, args) {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!member) return message.reply('You need to tag a member or provide a member id in order to unmute them!');
      const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

      if (!member.roles.cache.some(role => role.name === 'Muted')) {
        return message.reply(` ${member} is already unmuted!`);
      }

      message.channel.permissionOverwrites.get(member.user.id).delete();
      member.roles.remove(muteRole).then(() => {
        message.channel.send(`${member} has been unmuted!`).catch(() => {
          message.reply(`Sorry, I'm unable to unmute ${member}`);
        });
      });
    }
    else {
      return message.reply('Sorry, this is an admin-only feature!');
    }
  },
};