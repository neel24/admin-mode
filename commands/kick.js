const { GIPHY_API_KEY } = process.env;
const GphApiClient = require('giphy-js-sdk-core');
const giphy = GphApiClient(GIPHY_API_KEY);

module.exports = {
  name: 'kick',
  aliases: 'remove',
  description: 'Kicks a member from the current server.',
  guildOnly: true,
  execute(bot, message, args) {
    if (message.member.hasPermission('KICK_MEMBERS')) {
      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!member) return message.reply('You need to tag a member or provide a member id in order to kick them!');

      member.kick().then(() => {
        giphy.search('gifs', { q: 'kick' }).then((response) => {
          const totalResponses = response.data.length;
          const responseIndex =
                Math.floor(Math.random() * 10 + 1) % totalResponses;
          const responseFinal = response.data[responseIndex];

          message.channel.send(`${member} has been kicked!`, {
            files: [responseFinal.images.fixed_height.url],
          });
        });
      }).catch(() => {
        message.reply(`Sorry, I couldn't kick ${member}!`);
      });
    }
    else {
      message.reply('Sorry, you do not have sufficient permissions to do this!');
    }
  },
};