module.exports = {
  name: 'purge',
  description: 'Deletes the number of messages provided.',
  guildOnly: true,
  execute(message, args) {
    if(message.member.hasPermission('ADMINISTRATOR')) {
      const deleteCount = parseInt(args[0], 10);

      if(!deleteCount || deleteCount < 2 || deleteCount > 100) {
        return message.reply('Please provide a value between 2 and 100 for the number of messages you would like to delete.');
      }
      message.channel.bulkDelete(deleteCount).then(() => {
        message.channel.send(`${deleteCount} messages were deleted.`)
          .then((sentMsg) => {
            sentMsg.delete({ timeout: 5000 });
          });
      }).catch(() => {
        message.reply('Unable to delete messages.');
      });
    }
    else {
      message.reply('Sorry, this is an admin-only feature!');
    }
  },
};