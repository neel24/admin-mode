const Discord = require('discord.js');

module.exports = {
  name: 'unban',
  aliases: 'unbanish',
  description: 'Unbans a member from the current server.',
  cooldowm: 5,
  guildOnly: true,
  async execute(bot, message, args) {
    if (message.member.hasPermission('BAN_MEMBERS')) {
      const member = bot.users.cache.get(args[0]) || message.mentions.members.first();
      const ban = await message.guild.fetchBans();

      if(!member) {
        const unbanEmbed = new Discord.MessageEmbed()
          .setTitle(`**Command: .unban**`)
          .addField('Unbans a member from the current server.', [
            `**Usage: **.unban [member_id]`,
            `**Aliases: **.unbanish`,
            `**Required permissions: **BAN_MEMBERS`,
            `**Cooldown: **5s`,
            `**Example: **\n.unban ${message.member.id}`,
          ])
          .setColor('RANDOM');
        message.channel.send(unbanEmbed);
      }
      else {
        if(!ban.get(member.id)) {
          const errorEmbed = new Discord.MessageEmbed()
            .setDescription(`❌ ${member} is not banned.`)
            .setColor('RED');
          return message.channel.send(errorEmbed);
        }
        message.guild.members.unban(member.id).then(() => {
          const msgEmbed = new Discord.MessageEmbed()
            .setDescription(`✅ ${member} was unbanned.`)
            .setColor('GREEN');
          message.channel.send(msgEmbed);
        }).catch((error) => {
          console.log(error);
          const errorEmbed = new Discord.MessageEmbed()
            .setDescription(`❌ Unable to unban ${member}`)
            .setColor('RED');
          message.channel.send(errorEmbed);
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
