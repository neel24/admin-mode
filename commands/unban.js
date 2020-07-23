module.exports = {
  name: 'unban',
  aliases: 'unbanish',
  description: 'Unbans a member from the current server.',
  guildOnly: true,
  async execute(bot, message, args) {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      const member = bot.users.cache.get(args[0]) || message.mentions.members.first();
      const ban = await message.guild.fetchBans();

      if(!member) {
        return message.reply('Please provide a member id!');
      }
      if(!ban.get(member.id)) {
        return message.reply(` ${member} is not banned!`);
      }
      message.guild.members.unban(member.id).then(() => {
        message.channel.send(`${member} was unbanned!`);
      }).catch(() => {
        message.reply(`Sorry, I couldn't unban ${member}!`);
      });
    }
  },
};
