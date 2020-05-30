require('dotenv').config();

const Discord = require('discord.js');
const { DISCORD_TOKEN, GIPHY_API_KEY } = process.env;
const bot = new Discord.Client();

const PREFIX = '.';

const GphApiClient = require('giphy-js-sdk-core');
const giphy = GphApiClient(GIPHY_API_KEY);

bot.once('ready', () => {
  bot.user.setActivity('for admin stuff', {
    type: 'WATCHING',
  });
});

bot.on('message', (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'admin-mode' && message.channel.type == 'text') {
    message.reply(
      'Here are the available commands which can be used: \n`.admin-mode-info`,\n`.kick`,\n`.ban`',
    );
  }
  else if (command === 'admin-mode-info') {
    message.channel.send(
      'Hey there! I\'m a Discord bot used for basic admin management.',
    );
  }
  else if (command === 'admin-mode' && message.channel.type != 'text') {
    message.reply(
      'Here are the available commands which can be used: \n`.admin-mode-info`',
    );
  }

  if (message.channel.type == 'text' && message.member.hasPermission('ADMINISTRATOR')) {
    if (command === 'kick') {
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

          message.channel.send(member.displayName + ' has been kicked!', {
            files: [responseFinal.images.fixed_height.url],
          });
        });
      });
    }
    if (command === 'ban') {
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

          message.channel.send(member.displayName + ' has been banned!', {
            files: [responseFinal.images.fixed_height.url],
          });
        });
      });
    }
  }
  else if ((command === 'kick' || command === 'ban') && message.channel.type == 'text') {
    message.reply('Sorry, this is an admin-only feature!');
  }
  else if (message.channel.type != 'text') {

    if (command === 'kick' || command === 'ban') {
      message.reply('Sorry, I can\'t execute that inside DMs!');
    }
  }
});

bot.login(DISCORD_TOKEN);
