const Discord = require('discord.js');

module.exports = {
  name: 'purge',
  description: 'Deletes the number of messages provided.',
  aliases: 'delete',
  cooldown: 5,
  guildOnly: true,
  execute(bot, message, args) {
    if(message.member.hasPermission('MANAGE_MESSAGES')) {
      const deleteCount = parseInt(args[0], 10);

      if (!deleteCount) {
        const purgeEmbed = new Discord.MessageEmbed()
          .setTitle(`**Command: .purge**`)
          .addField('Deletes the number of messages provided.', [
            `**Usage: **.purge [number_of_messages_to_delete]`,
            `**Aliases: **.delete`,
            `**Required permissions: **MANAGE_MESSAGES`,
            `**Cooldown: **5s`,
            `**Examples: **\n.purge 5\n.delete 100`,
          ])
          .setColor('RANDOM');
        message.channel.send(purgeEmbed);
      }

      else if(deleteCount < 2 || deleteCount > 100) {
        const errorEmbed = new Discord.MessageEmbed()
          .setDescription(`❌ Please provide a value between 2 and 100 only.`)
          .setColor('RED');
        message.channel.send(errorEmbed);
      }
      else {
        message.channel.bulkDelete(deleteCount).then(() => {
          const msgEmbed = new Discord.MessageEmbed()
            .setDescription(`✅ ${deleteCount} messages were deleted.`)
            .setColor('GREEN');
          message.channel.send(msgEmbed)
            .then((sentMsg) => {
              sentMsg.delete({ timeout: 5000 });
            });
        }).catch((error) => {
          console.log(error);
          const errorEmbed = new Discord.MessageEmbed()
            .setDescription(`❌ Unable to delete messages.`)
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