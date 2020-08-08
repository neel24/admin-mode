# Admin Mode

Admin Mode is a Discord bot used for admin management. It can perform moderation as well as role management actions.

You can invite the bot to your server by using [this link](https://discord.com/oauth2/authorize?client_id=715577789612556408&scope=bot&permissions=8).

## Available commands

These are the commands which are currently available:
- `.about` - Provides a description and some stats of the bot.
- `.help`- Lists the available commands and the usage.
- `.demo` - Provides a demo video of the bot.
- `.ping` - Returns the bot's latency and API ping.
- `.repo` - Provides the repo url of the bot.
- `.server-info` - Provides some info about the server.
- `.user-info` - Provides some info on the specified user.
    Usage: `.user-info @username/member_id`
- `.kick` - Kicks a member from the current server.
    Usage: `.kick @username/member_id`
- `.ban` - Bans a member from the current server.
    Usage: `.ban @username/member_id`
- `.unban` - Unbans a member from the current server.
    Usage: `.unban member_id`
- `.mute` - Prevents a member from sending messages/adding reactions.
    Usage: `.mute @username/member_id`
- `.unmute` - Gives a member back the permissions to send messages/add reactions.
    Usage: `.unmute @username/member_id`
- `.purge` - Deletes the number of messages provided.
    Usage: `.purge [number_of_messages_to_delete]`
- `.add-role` - Adds the specified role to a member.
    Usage: `.add-role @username/member_id <role-name>`
- `.remove-role` - Removes the specified role from a member.
    Usage: `.remove-role @username/member_id <role-name>`

## Running the bot locally

- Clone the repo with `HTTPS/SSH`.

- Make sure to obtain a [Discord token](https://discord.com/developers/applications/), a [Giphy API key](https://developers.giphy.com/dashboard/) and have [Node.js](https://nodejs.org/) installed.

- Add your Discord token and your Giphy API key in the `.env.example` and rename it to `.env`.

- Run `npm install` in the command line to install the dependencies.

- Run `npm start` or `node bot.js` to run the bot.

## Usage

Once the bot has been added to your server, it should be granted with admin priviledges.