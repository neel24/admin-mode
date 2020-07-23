module.exports = {
  name: 'add-role',
  decsription: 'Adds the specified role to a member.',
  aliases: 'addrole',
  guildOnly: true,
  execute(bot, message, args) {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!member) return message.reply('You need to tag a member or provide a member id in order to assign them a role!');

      const role = message.guild.roles.cache.find(role => role.name == args.slice(1).join(' '));
      if(!role) return message.reply(`The specified role was not found.`);

      if(member.roles.cache.has(role.id)) {
        message.reply(` ${member} already has the "${role.name}" role.`);
      }
      else {
        member.roles.add(role.id).then(() => {
          message.channel.send(`${member} was given the "${role.name}" role.`);
        }).catch((e) => {console.log(e);});
      }
    }
  },
};