const Discord = require('discord.js');

module.exports = {
  name: 'lock',
  description: 'Prevents members with the @everyone role from viewing/sending messages in a specific channel.',
  cooldown: 3,
  guildOnly: true,
  execute(bot, message, args) {
    if (message.member.hasPermission('MANAGE_CHANNELS')) {
      if (!args[0] || !args[1]) {
        const lockEmbed = new Discord.MessageEmbed()
          .setTitle(`**Command: .lock**`)
          .addField('Prevents members with the @everyone role from viewing/sending messages in a specific channel.', [
            `**Usage: **.lock [#channel-name/channel_id] <lock-mode>`,
            `**Lock modes: **\n**- send**: Prevents a member from sending messages in a channel.\n**- view/read**: Prevents a member from viewing a channel.`,
            `**Required permissions: **MANAGE_ROLES`,
            `**Cooldown: **3s`,
            `**Examples: **\n.lock #${message.channel.name} view\n.lock ${message.channel.id} send`,
          ])
          .setColor('RANDOM');
        return message.channel.send(lockEmbed);
      }

      const channel = bot.channels.cache.get(args[0]) || bot.channels.cache.get(args[0].match(/<#(\w+)>/)[1]);

      if (args[1] === 'send') {
        if (!channel.permissionsFor(message.guild.roles.everyone).has('SEND_MESSAGES')) {
          const errorEmbed = new Discord.MessageEmbed()
            .setDescription(`❌ \`SEND_MESSAGES\` for \`${channel.name}\` is already disabled.`)
            .setColor('RED');
          return message.channel.send(errorEmbed);
        }
        else {
          channel.updateOverwrite(message.guild.roles.everyone, { SEND_MESSAGES: false }).then(() => {
            const msgEmbed = new Discord.MessageEmbed()
              .setDescription(`✅ The channel \`${channel.name}\` has been locked with type \`${args[1]}\`.`)
              .setColor('GREEN');
            message.channel.send(msgEmbed);
          }).catch((error) => {
            console.log(error);
            const errorEmbed = new Discord.MessageEmbed()
              .setDescription(`❌ Unable to lock \`${channel.name}\`.`)
              .setColor('RED');
            message.channel.send(errorEmbed);
          });
        }
      }
      if (args[1] === 'view' || args[1] === 'read') {
        if (!channel.permissionsFor(message.guild.roles.everyone).has('VIEW_CHANNEL')) {
          const errorEmbed = new Discord.MessageEmbed()
            .setDescription(`❌ \`VIEW_CHANNEL\` for \`${channel.name}\` is already disabled.`)
            .setColor('RED');
          return message.channel.send(errorEmbed);
        }
        else {
          channel.updateOverwrite(message.guild.roles.everyone, { VIEW_CHANNEL: false }).then(() => {
            const msgEmbed = new Discord.MessageEmbed()
              .setDescription(`✅ The channel \`${channel.name}\` has been locked with type \`${args[1]}\`.`)
              .setColor('GREEN');
            message.channel.send(msgEmbed);
          }).catch((error) => {
            console.log(error);
            const errorEmbed = new Discord.MessageEmbed()
              .setDescription(`❌ Unable to lock \`${channel.name}\`.`)
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