const { GIPHY_API_KEY } = process.env;
const GphApiClient = require('giphy-js-sdk-core');
const giphy = GphApiClient(GIPHY_API_KEY);

module.exports = {
  name: 'kick',
  description: 'Kicks a member from the current server.',
  guildOnly: true,
  execute(bot, message) {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      if (!message.mentions.users.size) {
        return message.reply('You need to tag a user in order to kick them!');
      }
      const member = message.mentions.members.first();

      member.kick().then(() => {
        giphy.search('gifs', { q: 'kick' }).then((response) => {
          const totalResponses = response.data.length;
          const responseIndex =
                Math.floor(Math.random() * 10 + 1) % totalResponses;
          const responseFinal = response.data[responseIndex];

          message.channel.send(`${member.displayName} has been kicked!`, {
            files: [responseFinal.images.fixed_height.url],
          });
        });
      }).catch(() => {
        message.reply(`Sorry, I couldn't kick ${member.displayName}!`);
      });
    }
    else {
      message.reply('Sorry, this is an admin-only feature!');
    }
  },
};