module.exports = {
  name: 'mute',
  description: 'Prevents a member from sending messages/adding reactions.',
  guildOnly: true,
  execute(message) {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      if (!message.mentions.users.size) {
        return message.reply('You need to tag a user in order to mute them!');
      }
      const member = message.mentions.members.first();
      const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

      if (member.roles.cache.some(role => role.name === 'Muted')) {
        return message.reply(`${member.displayName} is already muted!`);
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
          message.channel.send(`${member.displayName} has been muted!`);
        }).catch(() => {
          message.reply(`Sorry, I'm unable to mute ${member.displayName}`);
        });
      }
      else {
        member.roles.add(muteRole).then(() => {
          message.channel.send(`${member.displayName} has been muted!`);
        }).catch(() => {
          message.reply(`Sorry, I'm unable to mute ${member.displayName}`);
        });
      }
      message.channel.updateOverwrite(member.user.id, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false,
      });
    }
    else {
      message.reply('Sorry, this is an admin-only feature!');
    }
  },
};