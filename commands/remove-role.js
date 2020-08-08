module.exports = {
  name: 'remove-role',
  decsription: 'Removes the specified role from a member.',
  aliases: 'removerole',
  guildOnly: true,
  execute(bot, message, args) {
    if (message.member.hasPermission('MANAGE_ROLES')) {
      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!member) return message.reply('You need to tag a member or provide a member id in order to remove a role!');

      const role = message.guild.roles.cache.find(role => role.name == args.slice(1).join(' '));
      if(!role) return message.reply(`The specified role was not found.`);

      if(!member.roles.cache.has(role.id)) {
        message.reply(` ${member} doesn't have the "${role.name}" role.`);
      }
      else {
        member.roles.remove(role.id).then(() => {
          message.channel.send(`The ${role.name} role was removed from ${member}.`);
        }).catch((error) => {
          console.log(error);
        });
      }
    }
    else {
      message.reply('Sorry, you do not have sufficient permissions to do this!');
    }
  },
};