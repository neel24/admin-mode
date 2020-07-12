module.exports = {
  name: 'ping',
  description: 'Returns latency and API ping',
  aliases: ['latency'],
  async execute(bot, message) {
    const msg = await message.channel.send('Pinging...');
    msg.edit(`Pong!\nLatency ping: ${msg.createdTimestamp - message.createdTimestamp}ms\nAPI ping: ${Math.round(bot.ws.ping)}ms`);
  },
};