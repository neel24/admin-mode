const Discord = require('discord.js');

module.exports = {
  name: 'unmute',
  description: 'Allows a member to send messages/add reactions.',
  cooldown: 3,
  guildOnly: true,
  execute(bot, message, args) {
    if (message.member.hasPermission('MANAGE_ROLES')) {
      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!member) {
        const unmuteEmbed = new Discord.MessageEmbed()
          .setTitle(`**Command: .unmute**`)
          .addField('Allows a member to send messages/add reactions.', [
            `**Usage: **.unmute [username/member_id]`,
            `**Required permissions: **MANAGE_ROLES`,
            `**Cooldown: **3s`,
            `**Examples: **\n.unmute ${message.member}\n.unmute ${message.member.id}`,
          ])
          .setColor('RANDOM');
        message.channel.send(unmuteEmbed);
      }
      else {
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

        if (!member.roles.cache.some(role => role.name === 'Muted')) {
          const errorEmbed = new Discord.MessageEmbed()
            .setDescription(`❌ ${member} is already unmuted!`)
            .setColor('RED');
          return message.channel.send(errorEmbed);
        }

        message.channel.permissionOverwrites.get(muteRole.id).delete();
        member.roles.remove(muteRole).then(() => {
          const msgEmbed = new Discord.MessageEmbed()
            .setDescription(`✅ ${member} has been unmuted!`)
            .setColor('GREEN');
          message.channel.send(msgEmbed).catch((error) => {
            console.log(error);
            const errorEmbed = new Discord.MessageEmbed()
              .setDescription(`❌ Sorry, I'm unable to unmute ${member}`)
              .setColor('RED');
            message.channel.send(errorEmbed);
          });
        });
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