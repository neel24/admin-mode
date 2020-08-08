const { GIPHY_API_KEY } = process.env;
const GphApiClient = require('giphy-js-sdk-core');
const giphy = GphApiClient(GIPHY_API_KEY);

module.exports = {
  name: 'ban',
  aliases: 'banish',
  description: 'Bans a member from the current server.',
  guildOnly: true,
  execute(bot, message, args) {
    if (message.member.hasPermission('BAN_MEMBERS')) {
      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!member) return message.reply('You need to tag a member or provide a member id in order to ban them!');

      member.ban().then(() => {
        giphy.search('gifs', { q: 'ban' }).then((response) => {
          const totalResponses = response.data.length;
          const responseIndex =
                Math.floor(Math.random() * 10 + 1) % totalResponses;
          const responseFinal = response.data[responseIndex];

          message.channel.send(`${member} has been banned!`, {
            files: [responseFinal.images.fixed_height.url],
          });
        });
      }).catch((error) => {
        console.log(error);
        message.reply(`Sorry, I couldn't ban ${member}!`);
      });
    }
    else {
      message.reply('Sorry, you do not have sufficient permissions to do this!');
    }
  },
};