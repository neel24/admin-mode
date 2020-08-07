const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
  name: 'about',
  aliases: ['info', 'stats'],
  description: 'Provides a description and some stats of the bot.',
  execute(bot, message) {
    const aboutEmbed = new Discord.MessageEmbed()
      .setTitle('Admin Mode')
      .setDescription('Hey there! I\'m a Discord bot used for admin management. Run  `.help` for available commands!')
      .addFields(
        { name: 'Username', value: bot.user.tag, inline: true },
        { name: 'Users', value: message.guild.memberCount, inline: true },
        { name: 'Guilds', value: bot.guilds.cache.size, inline: true },
        { name: 'Channels', value: bot.channels.cache.size, inline: true },
        { name: 'Latency', value: `${bot.ws.ping}ms`, inline: true },
        { name: 'Date created', value: moment(bot.user.createdTimestamp).format('MMMM D YYYY'), inline: true },
      )
      .setFooter('Made by neel24#5896', 'https://cdn.discordapp.com/avatars/665866595230547988/563268183515dc767f7a0451197ca396')
      .setColor('#63D6FF');

    message.channel.send(aboutEmbed);
  },
};