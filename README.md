# Admin Mode

Admin Mode is a Discord bot used for basic admin management. It also uses the Giphy API to generate a hilarious gif whenever a user is kicked/banned!

## Running the bot

- Clone the repo with `HTTPS` or `SSH`.

- Make sure to obtain a [Discord token](https://discord.com/developers/applications/), a [Giphy API key](https://developers.giphy.com/dashboard/) and have [Node.js](https://nodejs.org/) installed.

- Add your Discord token and your Giphy API key in the `.env.example` and rename it to `.env`.

- Run `npm install` in the command line to install the dependencies.

- Run `npm start` or `node bot.js` to start using the bot.

## Usage

Once the bot has been added to your server, it should be granted with admin priviledges. Below are the available commands which can be run.

`.admin-mode` - Provides a description of the bot.

`.admin-mode-list` - Lists the available commands which can be run.

`.kick` - Kicks a member from the current server.

Usage: `.kick @username`

`.ban` - Bans a member from the current server.

Usage: `.ban @username`

`.purge` - Deletes the number of messages provided.

Usage: `.purge [number_of_messages_to_delete]`