const Discord = require('discord.js');

module.exports = {
  name: 'removerole',
  decsription: 'Removes the specified role from a member.',
  cooldown: 3,
  guildOnly: true,
  execute(bot, message, args) {
    if (message.member.hasPermission('MANAGE_ROLES')) {
      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!member) {
        const removeroleEmbed = new Discord.MessageEmbed()
          .setTitle(`**Command: .removerole**`)
          .addField('Removes the specified role from a member.', [
            `**Usage: **.removerole [username/member_id] <role-name>`,
            `**Required permissions: **MANAGE_ROLES`,
            `**Cooldown: **3s`,
            `**Examples: **\n.removerole ${message.member} Mod\n.removerole ${message.member.id} Epic Role`,
          ])
          .setColor('RANDOM');
        message.channel.send(removeroleEmbed);
      }
      else {
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
            message.reply(`Unable to remove the "${role.name}" role from ${member}`);
          });
        }
      }
    }
    else {
      message.reply('Sorry, you do not have sufficient permissions to do this!');
    }
  },
};