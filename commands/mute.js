module.exports = {
  name: 'mute',
  description: 'Prevents a member from sending messages/adding reactions.',
  guildOnly: true,
  execute(bot, message, args) {
    if (message.member.hasPermission(['MANAGE_MESSAGES', 'MANAGE_ROLES'])) {
      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!member) return message.reply('You need to tag a member or provide a member id in order to mute them!');
      const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

      if (member.roles.cache.some(role => role.name === 'Muted')) {
        return message.reply(` ${member} is already muted!`);
      }

      if (!muteRole) {
        message.guild.roles.create ({
          data: {
            name: 'Muted',
            color: 'GREY',
            permissions: [],
          },
        }).then((muteRole) => {
          member.roles.add(muteRole);
          message.channel.send(`${member} has been muted!`);
        }).catch(() => {
          message.reply(`Sorry, I'm unable to mute ${member}`);
        });
      }
      else {
        member.roles.add(muteRole).then(() => {
          message.channel.send(`${member} has been muted!`);
        }).catch(() => {
          message.reply(`Sorry, I'm unable to mute ${member}`);
        });
      }
      message.channel.updateOverwrite(member.user.id, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false,
      });
    }
    else {
      message.reply('Sorry, you do not have sufficient permissions to do this!');
    }
  },
};