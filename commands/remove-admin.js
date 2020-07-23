module.exports = {
  name: 'remove-admin',
  description: 'Removes the "Admin" role from a member.',
  guildOnly: true,
  execute(bot, message, args) {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!member) return message.reply('You need to tag a member or provide a member id in order to remove this role!');
      const adminRole = message.guild.roles.cache.find(role => role.name === 'Admin');

      if (!adminRole) {
        message.reply(`The role "Admin" doesn't exist!`);
      }
      else if (!member.roles.cache.some(role => role.name === 'Admin')) {
        message.reply(` ${member} doesn't have this role!`);
      }
      else {
        member.roles.remove(adminRole).then(() => {
          message.channel.send(`The "Admin" role was removed from ${member}!`);
        }).catch(() => {
          message.reply('Unable to remove role.');
        });
      }
    }
    else {
      return message.reply('Sorry, this is an admin-only feature!');
    }
  },
};