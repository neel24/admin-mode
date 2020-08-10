const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
  name: 'user-info',
  aliases: ['userinfo', 'user'],
  description: 'Provides some info on the specified user.',
  guildOnly: true,
  execute(bot, message, args) {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const roles = member.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1);
    if (!member) return message.reply('You need to tag a member or provide a member id in order to get the userinfo!');
    const userEmbed = new Discord.MessageEmbed()
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .addField(`User info for @${member.user.username}`, [
        '\u200b',
        `**Display Name:** ${member.displayName}`,
        `**Discriminator:** ${member.user.discriminator}`,
        `**Tag:** ${member.user.tag}`,
        `**ID:** ${member.user.id}`,
        `**Status:** ${member.user.presence.status}`,
        `**Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
        `**Date created:** ${moment(member.user.createdTimestamp).format('MMMM D YYYY')}`,
        `**Server Join Date:** ${moment(member.joinedAt).format('MMMM D YYYY')}`,
        `**Roles [${roles.length}]: ** ${roles.length ? roles.join(', ') : 'None'}`,
      ])
      .setColor('#63D6FF')
      .setTimestamp();

    message.channel.send(userEmbed);
  },
};