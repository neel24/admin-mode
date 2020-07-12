require('dotenv').config();

const Discord = require('discord.js');
const fs = require('fs');
const { DISCORD_TOKEN } = process.env;

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const PREFIX = '.';

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

bot.login(DISCORD_TOKEN);

bot.once('ready', () => {
  bot.user.setActivity('for admin stuff', {
    type: 'WATCHING',
  });
});

bot.on('message', async (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) return;

  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply('Sorry, I can\'t execute that inside DMs!');
  }

  try {
    command.execute(bot, message, args);
  }
  catch (error) {
    console.error(error);
    message.reply('An error while trying to execute that command.');
  }
});