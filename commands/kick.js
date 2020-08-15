const Discord = require('discord.js');
const { GIPHY_API_KEY } = process.env;
const GphApiClient = require('giphy-js-sdk-core');
const giphy = GphApiClient(GIPHY_API_KEY);

module.exports = {
  name: 'kick',
  description: 'Kicks a member from the current server.',
  cooldown: 5,
  guildOnly: true,
  execute(bot, message, args) {
    if (message.member.hasPermission('KICK_MEMBERS')) {
      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!member) {
        const kickEmbed = new Discord.MessageEmbed()
          .setTitle(`**Command: .kick**`)
          .addField('Kicks a member from the current server.', [
            `**Usage: **.kick [username/member_id]`,
            `**Required permissions: **KICK_MEMBERS`,
            `**Cooldown: **5s`,
            `**Examples: **\n.kick ${message.member}\n.kick ${message.member.id}`,
          ])
          .setColor('RANDOM');
        message.channel.send(kickEmbed);
      }
      else{
        member.kick().then(() => {
          giphy.search('gifs', { q: 'kick' }).then((response) => {
            const totalResponses = response.data.length;
            const responseIndex =
                Math.floor(Math.random() * 10 + 1) % totalResponses;
            const responseFinal = response.data[responseIndex];

            const msgEmbed = new Discord.MessageEmbed()
              .setDescription(`✅ ${member} was kicked.`)
              .setColor('GREEN');
            message.channel.send(msgEmbed);
            message.channel.send({
              files: [responseFinal.images.fixed_height.url],
            });
          });
        }).catch((error) => {
          console.log(error);
          const errorEmbed = new Discord.MessageEmbed()
            .setDescription(`❌ Unable to kick ${member}`)
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