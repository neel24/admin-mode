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

        if(member.roles.cache.has(role.id)) {
          const errorEmbed = new Discord.MessageEmbed()
            .setDescription(`❌ ${member} already has the \`${role.name}\` role.`)
            .setColor('RED');
          return message.channel.send(errorEmbed);
        }
        else {
          member.roles.add(role.id).then(() => {
            const msgEmbed = new Discord.MessageEmbed()
              .setDescription(`✅ ${member} was given the \`${role.name}\` role.`)
              .setColor('GREEN');
            message.channel.send(msgEmbed);
          }).catch((error) => {
            console.log(error);
            const errorEmbed = new Discord.MessageEmbed()
              .setDescription(`❌ Unable to add the \`${role.name}\` role to ${member}`)
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