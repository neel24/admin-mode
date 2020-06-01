require('dotenv').config();

const Discord = require('discord.js');
const { DISCORD_TOKEN, GIPHY_API_KEY } = process.env;
const bot = new Discord.Client();

const GphApiClient = require('giphy-js-sdk-core');
const giphy = GphApiClient(GIPHY_API_KEY);

const PREFIX = '.';

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
    const mainEmbed = new Discord.MessageEmbed()
      .setTitle('Admin Mode')
      .setDescription('Hey there! I\'m a Discord bot used for basic admin management. Run  `.admin-mode-list` for available commands!')
      .setColor('#63d6ff');

    message.channel.send(mainEmbed);
  }
  else if (command === 'admin-mode-list' && message.channel.type == 'text') {
    const listEmbed = new Discord.MessageEmbed()
      .setTitle('Available commands')
      .setDescription('Here are the available commands which can be run:')
      .addFields(
        { name: '`.admin-mode`', value: 'Provides a description of the bot.' },
        { name: '`.kick`', value: 'Kicks a member from the current server.\n Usage: `.kick @username`' },
        { name: '`.ban`', value: 'Bans a member from the current server.\n Usage: `.ban @username`' },
        { name: '`.purge`', value: 'Deletes the number of messages provided.\n Usage: `.purge [number_of_messages_to_delete]`' },
      )
      .setColor('#63d6ff');

    message.channel.send(listEmbed);
  }
  else if (command === 'admin-mode-list' && message.channel.type == 'dm') {
    const listEmbed = new Discord.MessageEmbed()
      .setTitle('Available commands')
      .setDescription('Here are the available commands which can be run:')
      .addFields(
        { name: '`.admin-mode`', value: 'Provides a description of the bot.' },
      )
      .setColor('#63d6ff');

    message.channel.send(listEmbed);
  }

  // Allow commands to be run in text channels by admins only.
  if (message.channel.type == 'text' && message.member.hasPermission('ADMINISTRATOR')) {

    if (command === 'kick') {
      // Ensure that a user needs to be tagged when kicking.
      if (!message.mentions.users.size) {
        return message.reply('You need to tag a user in order to kick them!');
      }
      const member = message.mentions.members.first();
      member.kick().then(() => {
        // Generate and send a random gif when a member is kicked.
        giphy.search('gifs', { q: 'kick' }).then((response) => {
          const totalResponses = response.data.length;
          const responseIndex =
              Math.floor(Math.random() * 10 + 1) % totalResponses;
          const responseFinal = response.data[responseIndex];

          message.channel.send(member.displayName + ' has been kicked!', {
            files: [responseFinal.images.fixed_height.url],
          });
        });
      }).catch(() => {
        message.reply('Sorry, I couldn\'t kick this member!');
      });
    }

    if (command === 'ban') {
      // Ensure that a user needs to be tagged when banning.
      if (!message.mentions.users.size) {
        return message.reply('You need to tag a user in order to ban them!');
      }
      const member = message.mentions.members.first();
      member.ban().then(() => {
        // Generate and send a random gif when a member is banned.
        giphy.search('gifs', { q: 'ban' }).then((response) => {
          const totalResponses = response.data.length;
          const responseIndex =
              Math.floor(Math.random() * 10 + 1) % totalResponses;
          const responseFinal = response.data[responseIndex];

          message.channel.send(member.displayName + ' has been banned!', {
            files: [responseFinal.images.fixed_height.url],
          });
        });
      }).catch(() => {
        message.reply('Sorry, I couldn\'t ban this member!');
      });
    }

    if (command === 'purge') {
      // Get the delete count as a number.
      const deleteCount = parseInt(args[0], 10);

      // Conditions for the delete count.
      if(!deleteCount || deleteCount < 2 || deleteCount > 100) {
        return message.reply('Please provide a value between 2 and 100 for the number of messages you would like to delete.');
      }
      // Bulk delete the last `deleteCount` messages.
      message.channel.bulkDelete(deleteCount).then(() => {
        message.channel.send(deleteCount + ' messages were deleted.')
          .then((sentMsg) => {
            sentMsg.delete({ timeout: 5000 });
          });
      }).catch(() => {
        message.reply('Unable to delete messages.');
      });
    }
  }
  // Prevent non-admins from running admin-only commands.
  else if ((command === 'kick' || command === 'ban' || command === 'purge') && message.channel.type == 'text') {
    message.reply('Sorry, this is an admin-only feature!');
  }
  // Prevent execution of specific commands in DMs.
  else if (message.channel.type == 'dm') {
    if (command === 'kick' || command === 'ban' || command === 'purge') {
      message.reply('Sorry, I can\'t execute that inside DMs!');
    }
  }
});

bot.login(DISCORD_TOKEN);
