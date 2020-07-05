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

  if (command === 'about') {
    const mainEmbed = new Discord.MessageEmbed()
      .setTitle('Admin Mode')
      .setDescription('Hey there! I\'m a Discord bot used for admin management. Run  `.list` for available commands!')
      .setColor('#63D6FF');

    message.channel.send(mainEmbed);
  }
  else if (command === 'demo') {
    const demoEmbed = new Discord.MessageEmbed()
      .setTitle('Demo video')
      .setDescription('This is a useful demo of the bot in action: https://www.youtube.com/watch?v=dQw4w9WgXcQ')
      .setColor('#63D6FF');

    message.channel.send(demoEmbed);
  }
  else if (command === 'list' && message.channel.type == 'text') {
    const listEmbed = new Discord.MessageEmbed()
      .setTitle('Available commands')
      .setDescription('Here are the available commands which can be run:')
      .addFields(
        { name: '`.about`', value: 'Provides a description of the bot.' },
        { name: '`.demo`', value: 'Provides a demo video of the bot.' },
        { name: '`.kick`', value: 'Kicks a member from the current server.\n Usage: `.kick @username`' },
        { name: '`.ban`', value: 'Bans a member from the current server.\n Usage: `.ban @username`' },
        { name: '`.mute`', value: 'Prevents a member from sending messages/adding reactions.\n Usage: `.mute @username`' },
        { name: '`.unmute`', value: 'Gives a member back the permissions to send messages/add reactions.\n Usage: `.unmute @username`' },
        { name: '`.purge`', value: 'Deletes the number of messages provided.\n Usage: `.purge [number_of_messages_to_delete]`' },
        { name: '`.add-admin`', value: 'Adds the "Admin" role to a member.\n Usage: `.add-admin @username`' },
      )
      .setColor('#63D6FF');

    message.channel.send(listEmbed);
  }
  else if (command === 'list' && message.channel.type == 'dm') {
    const listEmbed = new Discord.MessageEmbed()
      .setTitle('Available commands')
      .setDescription('Here are the available commands which can be run:')
      .addFields(
        { name: '`.about`', value: 'Provides a description of the bot.' },
        { name: '`.demo`', value: 'Provides a demo video of the bot.' },
      )
      .setColor('#63D6FF');

    message.channel.send(listEmbed);
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
      }).catch(() => {
        message.reply('Sorry, I couldn\'t kick this member!');
      });
    }

    else if (command === 'ban') {
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
      }).catch(() => {
        message.reply('Sorry, I couldn\'t ban this member!');
      });
    }

    else if (command === 'purge') {
      const deleteCount = parseInt(args[0], 10);

      if(!deleteCount || deleteCount < 2 || deleteCount > 100) {
        return message.reply('Please provide a value between 2 and 100 for the number of messages you would like to delete.');
      }
      message.channel.bulkDelete(deleteCount).then(() => {
        message.channel.send(deleteCount + ' messages were deleted.')
          .then((sentMsg) => {
            sentMsg.delete({ timeout: 5000 });
          });
      }).catch(() => {
        message.reply('Unable to delete messages.');
      });
    }

    else if (command === 'add-admin') {
      if (!message.mentions.users.size) {
        return message.reply('You need to tag a user in order to assign them a role!');
      }

      const member = message.mentions.members.first();
      const adminRole = message.guild.roles.cache.find(role => role.name === 'Admin');

      if (member.roles.cache.some(role => role.name === 'Admin')) {
        return message.reply(member.displayName + ' already has that role!');
      }

      if (!adminRole) {
        message.guild.roles.create({
          data : {
            name: 'Admin',
            color: 'GREEN',
            permissions: ['SEND_MESSAGES', 'ADMINISTRATOR', 'KICK_MEMBERS', 'BAN_MEMBERS', 'MANAGE_MESSAGES', 'MANAGE_GUILD'],
          },
        }).then((adminRole) => {
          member.roles.add(adminRole).catch(() => {
            message.reply('Unable to add role.');
          });
          message.channel.send('The "Admin" role was created.');
          message.channel.send(member.displayName + ' was assigned the "Admin" role!');
        });
      }
      else {
        member.roles.add(adminRole).then(() => {
          message.channel.send(member.displayName + ' was assigned the "Admin" role!');
        }).catch(() => {
          message.reply('Unable to add role.');
        });
      }
    }

    else if (command === 'mute') {
      if (!message.mentions.users.size) {
        return message.reply('You need to tag a user in order to mute them!');
      }
      const member = message.mentions.members.first();
      const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

      if (member.roles.cache.some(role => role.name === 'Muted')) {
        return message.reply(member.displayName + ' is already muted!');
      }

      if (!muteRole) {
        message.guild.roles.create ({
          data: {
            name: 'Muted',
            color: 'GREY',
            permissions: [],
          },
        }).then((muteRole) => {
          member.roles.add(muteRole);
          message.channel.send(member.displayName + ' has been muted!');
        }).catch(() => {
          message.reply('Sorry, I\'m unable to mute ' + member.displayName);
        });
      }
      else {
        member.roles.add(muteRole).then(() => {
          message.channel.send(member.displayName + ' has been muted!');
        }).catch(() => {
          message.reply('Sorry, I\'m unable to mute ' + member.displayName);
        });
      }
      message.channel.updateOverwrite(member.user.id, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false,
      });
    }

    else if (command === 'unmute') {
      if (!message.mentions.users.size) {
        return message.reply('You need to tag a user in order to unmute them!');
      }
      const member = message.mentions.members.first();
      const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

      if (!member.roles.cache.some(role => role.name === 'Muted')) {
        return message.reply(member.displayName + ' is already unmuted!');
      }

      message.channel.permissionOverwrites.get(member.user.id).delete();
      member.roles.remove(muteRole).then(() => {
        message.channel.send(member.displayName + ' has been unmuted!').catch(() => {
          message.reply('Sorry, I\'m unable to unmute ' + member.displayName);
        });
      });
    }
  }
  else if ((command === 'kick' || command === 'ban' || command === 'purge' || command === 'add-admin' || command === 'mute' || command === 'unmute') && message.channel.type == 'text') {
    message.reply('Sorry, this is an admin-only feature!');
  }
  else if ((command === 'kick' || command === 'ban' || command === 'purge' || command === 'add-admin' || command === 'mute' || command === 'unmute') && message.channel.type == 'dm') {
    message.reply('Sorry, I can\'t execute that inside DMs!');
  }
});

bot.login(DISCORD_TOKEN);