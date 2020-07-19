const { GIPHY_API_KEY } = process.env;
const GphApiClient = require('giphy-js-sdk-core');
const giphy = GphApiClient(GIPHY_API_KEY);

module.exports = {
  name: 'ban',
  aliases: 'banish',
  description: 'Bans a member from the current server.',
  guildOnly: true,
  execute(bot, message) {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      if (!message.mentions.users.size) {
        return message.reply('You need to tag a user in order to ban them!');
      }
      const member = message.mentions.members.first();

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
      }).catch(() => {
        message.reply(`Sorry, I couldn't ban ${member}!`);
      });
    }
    else {
      return message.reply('Sorry, this is an admin-only feature!');
    }
  },
};