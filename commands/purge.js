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
        return message.reply('Please provide a value between 2 and 100 for the number of messages you would like to delete.');
      }
      else {
        message.channel.bulkDelete(deleteCount).then(() => {
          message.channel.send(`${deleteCount} messages were deleted.`)
            .then((sentMsg) => {
              sentMsg.delete({ timeout: 5000 });
            });
        }).catch((error) => {
          console.log(error);
          message.reply('Unable to delete messages.');
        });
      }
    }
    else {
      message.reply('Sorry, you do not have sufficient permissions to do this!');
    }
  },
};