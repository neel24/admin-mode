require('dotenv').config();

const Discord = require('discord.js');
const fs = require('fs');
const { DISCORD_TOKEN } = process.env;

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const cooldowns = new Discord.Collection();

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
  console.log(`${bot.user.username} deployed successfully.`);
});

bot.on('message', async (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) return;

  if (command.guildOnly && message.channel.type !== 'text') {
    const errorEmbed = new Discord.MessageEmbed()
      .setDescription(`❌ Unable to execute \`.${commandName}\` inside DMs.`)
      .setColor('RED');
    return message.channel.send(errorEmbed);
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      const errorEmbed = new Discord.MessageEmbed()
        .setDescription(`❌ Please wait ${timeLeft.toFixed(1)} second(s) before reusing the \`${command.name}\` command.`)
        .setColor('RED');
      return message.channel.send(errorEmbed);
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(bot, message, args);
  }
  catch (error) {
    console.error(error);
    const errorEmbed = new Discord.MessageEmbed()
      .setDescription(`❌ An error while trying to execute that command.`)
      .setColor('RED');
    message.channel.send(errorEmbed);
  }
});