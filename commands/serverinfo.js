const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
  name: 'serverinfo',
  aliases: ['server', 'guild'],
  description: 'Provides some info about the server.',
  guildOnly: true,
  execute(bot, message) {
    const members = message.guild.members.cache;
    const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
    const channels = message.guild.channels.cache;
    const emojis = message.guild.emojis.cache;
    const serverEmbed = new Discord.MessageEmbed()
      .setTitle(`Server info for ${message.guild.name}`)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .addField('General', [
        `**Name:** ${message.guild.name}`,
        `**ID:** ${message.guild.id}`,
        `**Date Created:** ${moment(message.guild.createdAt).format('MMMM D YYYY')}`,
        `**Owner:** ${message.guild.owner}`,
        `**Region:** ${message.guild.region}`,
        `**Explicit Content Filter:** ${message.guild.explicitContentFilter.toLowerCase()}`,
        `**Verification Level:** ${message.guild.verificationLevel.toLowerCase()}`,
        '\u200b',
      ])
      .addField('Stats', [
        `**Member Count:** ${message.guild.memberCount}`,
        `**Humans:** ${members.filter(member => !member.user.bot).size}`,
        `**Bots:** ${members.filter(member => member.user.bot).size}`,
        `**Role Count:** ${roles.length}`,
        `**Emoji Count:** ${emojis.size}`,
        `**Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`,
        `**Voice Channels:** ${channels.filter(channel => channel.type === 'voice').size}`,
        '\u200b',
      ])
      .addField(`Roles [${roles.length}]: `, [
        roles.length ? roles.join(', ') : 'None',
        '\u200b',
      ])
      .setColor('RANDOM')
      .setTimestamp();

    message.channel.send(serverEmbed);
  },
};