require('dotenv').config();

const { Client, MessageAttachment } = require('discord.js');
const { DISCORD_TOKEN, PREFIX } = process.env;
const bot = new Client();

bot.once('ready', () => {
  bot.user.setActivity('for admin stuff', {
    type: 'WATCHING',
  });
});

bot.on('message', (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'admin-mode') {
    message.reply(
      'Here are the available commands which can be used: \n`.kick`,\n`.ban`,\n`.admin-mode-info`',
    );
  }
  else if (command === 'admin-mode-info') {
    message.channel.send(
      'Hey there! I\'m a Discord bot used for basic admin management.',
    );
  }

  if (message.member.hasPermission('ADMINISTRATOR')) {
    if (command === 'kick') {
      if (!message.mentions.users.size) {
        return message.reply('You need to tag a user in order to kick them!');
      }

      const member = message.mentions.members.first();

      member.kick().then(() => {
        message.channel.send(member.displayName + ' has been kicked!');
      });
    }
    if (command === 'ban') {
      if (!message.mentions.users.size) {
        return message.reply('You need to tag a user in order to ban them!');
      }

      const member = message.mentions.members.first();
      const gif = new MessageAttachment(
        'https://media.giphy.com/media/ptDRdwFkFVAkg/source.gif',
      );

      member.ban().then(() => {
        message.channel.send(member.displayName + ' has been banned!', gif);
      });
    }
  }
  else if (command === 'kick' || command === 'ban') {
    message.reply('Sorry, this is an admin-only feature!');
  }
});

bot.login(DISCORD_TOKEN);