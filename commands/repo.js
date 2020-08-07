module.exports = {
  name: 'repo',
  aliases: ['source', 'github'],
  description: 'Provides the repo url of the bot.',
  execute(bot, message) {
    message.channel.send('https://github.com/neel24/admin-mode');
  },
};