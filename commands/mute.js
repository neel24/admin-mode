const Discord = require('discord.js');

module.exports = {
  name: 'mute',
  description: 'Prevents a member from sending messages/adding reactions.',
  cooldown: 3,
  guildOnly: true,
  execute(bot, message, args) {
    if (message.member.hasPermission('MANAGE_ROLES')) {
      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!member) {
        const muteEmbed = new Discord.MessageEmbed()
          .setTitle(`**Command: .mute**`)
          .addField('Prevents a member from sending messages/adding reactions.', [
            `**Usage: **.mute [username/member_id]`,
            `**Required permissions: **MANAGE_ROLES`,
            `**Cooldown: **3s`,
            `**Examples: **\n.mute ${message.member}\n.mute ${message.member.id}`,
          ])
          .setColor('RANDOM');
        message.channel.send(muteEmbed);
      }
      else {
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

        if (member.roles.cache.some(role => role.name === 'Muted')) {
          const errorEmbed = new Discord.MessageEmbed()
            .setDescription(`❌ ${member} is already muted!`)
            .setColor('RED');
          return message.channel.send(errorEmbed);
        }

        if (member.hasPermission('ADMINISTRATOR')) {
          const errorEmbed = new Discord.MessageEmbed()
            .setDescription(`❌ I'm unable to do that because ${member} is an admin.`)
            .setColor('RED');
          return message.channel.send(errorEmbed);
        }

        if (!muteRole) {
          message.guild.roles.create ({
            data: {
              name: 'Muted',
              color: 'GREY',
              permissions: [],
            },
          }).then((muteRole) => {
            member.roles.add(muteRole);
            const msgEmbed = new Discord.MessageEmbed()
              .setDescription(`✅ ${member} has been muted!`)
              .setColor('GREEN');
            message.channel.send(msgEmbed);
          }).catch((error) => {
            console.log(error);
            const errorEmbed = new Discord.MessageEmbed()
              .setDescription(`❌ Sorry, I'm unable to mute ${member}`)
              .setColor('RED');
            message.channel.send(errorEmbed);
          });
        }
        else {
          member.roles.add(muteRole).then(() => {
            const msgEmbed = new Discord.MessageEmbed()
              .setDescription(`✅ ${member} has been muted!`)
              .setColor('GREEN');
            message.channel.send(msgEmbed);
          }).catch((error) => {
            console.log(error);
            const errorEmbed = new Discord.MessageEmbed()
              .setDescription(`❌ Sorry, I'm unable to mute ${member}`)
              .setColor('RED');
            message.channel.send(errorEmbed);
          });
        }
        message.channel.updateOverwrite(muteRole.id, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
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