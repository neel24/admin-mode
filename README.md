# Admin Mode

Admin Mode is a Discord bot used for basic admin management. It also uses the Giphy API to generate a hilarious gif whenever a user is kicked/banned!

## Available commands

These are the commands which are currently available:
- `.about` - Provides a description of the bot.
- `.list`- Lists the available commands and the usage.
- `.demo` - Provides a demo video of the bot.
- `.kick` - Kicks a member from the current server.
- `.ban` - Bans a member from the current server.
- `.mute` - Prevents a member from sending messages/adding reactions.
- `.unmute` - Gives a member back the permissions to send messages/add reactions.
- `.purge`- Deletes the number of messages provided.
- `.add-admin`- Adds the "Admin" role to a member.

## Running the bot

- Clone the repo with `HTTPS/SSH`.

- Make sure to obtain a [Discord token](https://discord.com/developers/applications/), a [Giphy API key](https://developers.giphy.com/dashboard/) and have [Node.js](https://nodejs.org/) installed.

- Add your Discord token and your Giphy API key in the `.env.example` and rename it to `.env`.

- Run `npm install` in the command line to install the dependencies.

- Run `npm start` or `node bot.js` to run the bot.

## Usage

Once the bot has been added to your server, it should be granted with admin priviledges.

When creating an admin role with the bot, these are the default permissions set:
- `SEND_MESSAGES`
- `ADMINISTRATOR`
- `KICK_MEMBERS`
- `BAN_MEMBERS`
- `MANAGE_MESSAGES`
- `MANAGE_GUILD`

Additional permissions can be added in Server Settings > Roles > Admin.