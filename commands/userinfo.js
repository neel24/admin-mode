const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
  name: 'userinfo',
  aliases: ['userinfo', 'user'],
  description: 'Provides some info on the specified user.',
  guildOnly: true,
  execute(bot, message, args) {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) {
      const userinfoEmbed = new Discord.MessageEmbed()
        .setTitle(`**Command: .userinfo**`)
        .addField('Provides some info on the specified user.', [
          `**Usage: **.userinfo [username/member_id]`,
          `**Aliases: **.user`,
          `**Examples: **\n.userinfo ${message.member}\n.user ${message.member.id}`,
        ])
        .setColor('RANDOM');
      message.channel.send(userinfoEmbed);
    }
    else {
      const roles = member.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1);
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
        .setColor('RANDOM')
        .setTimestamp();

      message.channel.send(userEmbed);
    }
  },
};