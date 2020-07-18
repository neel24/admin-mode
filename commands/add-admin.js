module.exports = {
  name: 'add-admin',
  description: 'Adds the "Admin" role to a member.',
  guildOnly: true,
  execute(bot, message) {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      if (!message.mentions.users.size) {
        return message.reply('You need to tag a user in order to assign them a role!');
      }

      const member = message.mentions.members.first();
      const adminRole = message.guild.roles.cache.find(role => role.name === 'Admin');

      if (member.roles.cache.some(role => role.name === 'Admin')) {
        return message.reply(`${member.displayName} already has that role!`);
      }

      if (!adminRole) {
        message.guild.roles.create({
          data : {
            name: 'Admin',
            color: 'GREEN',
            permissions: ['SEND_MESSAGES', 'ADMINISTRATOR', 'KICK_MEMBERS', 'BAN_MEMBERS', 'MANAGE_MESSAGES', 'MANAGE_GUILD'],
          },
        }).then((adminRole) => {
          member.roles.add(adminRole).catch(() => {
            message.reply('Unable to add role.');
          });
          message.channel.send('The "Admin" role was created.');
          message.channel.send(`${member.displayName} was assigned the "Admin" role!`);
        });
      }
      else {
        member.roles.add(adminRole).then(() => {
          message.channel.send(`${member.displayName} was assigned the "Admin" role!`);
        }).catch(() => {
          message.reply('Unable to add role.');
        });
      }
    }
    else {
      return message.reply('Sorry, this is an admin-only feature!');
    }
  },
};