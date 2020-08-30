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
        if(!args.slice(1).join(' ')) {
          const errorEmbed = new Discord.MessageEmbed()
            .setDescription(`❌ No role was provided.`)
            .setColor('RED');
          return message.channel.send(errorEmbed);
        }

        if(!role) {
          const errorEmbed = new Discord.MessageEmbed()
            .setDescription(`❌ The \`${args.slice(1).join(' ')}\` role was not found.`)
            .setColor('RED');
          return message.channel.send(errorEmbed);
        }

        if(!member.roles.cache.has(role.id)) {
          const errorEmbed = new Discord.MessageEmbed()
            .setDescription(`❌ ${member} doesn't have the \`${role.name}\` role.`)
            .setColor('RED');
          message.channel.send(errorEmbed);
        }
        else {
          member.roles.remove(role.id).then(() => {
            const msgEmbed = new Discord.MessageEmbed()
              .setDescription(`✅ The \`${role.name}\` role was removed from ${member}`)
              .setColor('GREEN');
            message.channel.send(msgEmbed);
          }).catch((error) => {
            console.log(error);
            const errorEmbed = new Discord.MessageEmbed()
              .setDescription(`❌ Unable to remove the \`${role.name}\` role from ${member}`)
              .setColor('RED');
            message.channel.send(errorEmbed);
          });
        }
      }
    }
    else {
      const warningEmbed = new Discord.MessageEmbed()
        .setDescription('🔒 Sorry, you do not have sufficient permissions to do this.')
        .setColor('YELLOW');
      message.channel.send(warningEmbed);
    }
  },
};