const Discord = require('discord.js');
const { GIPHY_API_KEY } = process.env;
const GphApiClient = require('giphy-js-sdk-core');
const giphy = GphApiClient(GIPHY_API_KEY);

module.exports = {
  name: 'ban',
  description: 'Bans a member from the current server.',
  aliases: 'banish',
  cooldown: 5,
  guildOnly: true,
  execute(bot, message, args) {
    if (message.member.hasPermission('BAN_MEMBERS')) {
      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!member) {
        const banEmbed = new Discord.MessageEmbed()
          .setTitle(`**Command: .ban**`)
          .addField('Bans a member from the current server.', [
            `**Usage: **.ban [username/member_id]`,
            `**Aliases: **.banish`,
            `**Required permissions: **BAN_MEMBERS`,
            `**Cooldown: **5s`,
            `**Examples: **\n.ban ${message.member}\n.banish ${message.member.id}`,
          ])
          .setColor('RANDOM');
        message.channel.send(banEmbed);
      }
      else {
        member.ban().then(() => {
          giphy.search('gifs', { q: 'ban' }).then((response) => {
            const totalResponses = response.data.length;
            const responseIndex =
                  Math.floor(Math.random() * 10 + 1) % totalResponses;
            const responseFinal = response.data[responseIndex];

            const msgEmbed = new Discord.MessageEmbed()
              .setDescription(`✅ ${member} was banned.`)
              .setColor('GREEN');
            message.channel.send(msgEmbed);
            message.channel.send({
              files: [responseFinal.images.fixed_height.url],
            });
          });
        }).catch((error) => {
          console.log(error);
          const errorEmbed = new Discord.MessageEmbed()
            .setDescription(`❌ Unable to ban ${member}`)
            .setColor('RED');
          message.channel.send(errorEmbed);
        });
      }
    }
    else {
      const warningEmbed = new Discord.MessageEmbed()
        .setDescription('🔒 Sorry, you do not have sufficient permissions to do this.')
        .setColor('YELLOW');
      message.channel.send(warningEmbed);
    }
  },
};