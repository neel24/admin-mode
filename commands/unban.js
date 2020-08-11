const Discord = require('discord.js');

module.exports = {
  name: 'unban',
  aliases: 'unbanish',
  description: 'Unbans a member from the current server.',
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
          return message.reply(` ${member} is not banned!`);
        }
        message.guild.members.unban(member.id).then(() => {
          message.channel.send(`${member} was unbanned!`);
        }).catch((error) => {
          console.log(error);
          message.reply(`Sorry, I couldn't unban ${member}!`);
        });
      }
    }
    else {
      message.reply('Sorry, you do not hsve sufficient permissions to do this!');
    }
  },
};
