module.exports = {
  name: 'remove-admin',
  description: 'Removes the "Admin" role from a member.',
  guildOnly: true,
  execute(bot, message) {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      if (!message.mentions.users.size) {
        return message.reply('You need to tag a user in order to unmute them!');
      }
      const member = message.mentions.members.first();
      const adminRole = message.guild.roles.cache.find(role => role.name === 'Admin');

      if (!adminRole) {
        message.reply('The role "Admin" doesn\'t exist!');
      }
      else if (!member.roles.cache.some(role => role.name === 'Admin')) {
        message.reply(`${member.displayName} doesn't have this role!`);
      }
      else {
        member.roles.remove(adminRole).then(() => {
          message.channel.send(`The "Admin" role was removed from ${member.displayName}!`);
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