const Discord = require('discord.js');

module.exports = {
  name: 'addrole',
  decsription: 'Adds the specified role to a member.',
  cooldown: 3,
  guildOnly: true,
  execute(bot, message, args) {
    if (message.member.hasPermission('MANAGE_ROLES')) {
      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!member) {
        const addroleEmbed = new Discord.MessageEmbed()
          .setTitle(`**Command: .addrole**`)
          .addField('Adds the specified role to a member.', [
            `**Usage: **.addrole [username/member_id] <role-name>`,
            `**Required permissions: **MANAGE_ROLES`,
            `**Cooldown: **3s`,
            `**Examples: **\n.addrole ${message.member} Mod\n.addrole ${message.member.id} Epic Role`,
          ])
          .setColor('RANDOM');
        message.channel.send(addroleEmbed);
      }
      else {
        const role = message.guild.roles.cache.find(role => role.name == args.slice(1).join(' '));
        if(!role) return message.reply(`The specified role was not found.`);

        if(member.roles.cache.has(role.id)) {
          message.reply(` ${member} already has the "${role.name}" role.`);
        }
        else {
          member.roles.add(role.id).then(() => {
            message.channel.send(`${member} was given the "${role.name}" role.`);
          }).catch((error) => {
            console.log(error);
            message.reply(`Unable to add the "${role.name}" role to ${member}`);
          });
        }
      }
    }
    else {
      message.reply('Sorry, you do not have sufficient permissions to do this!');
    }
  },
};