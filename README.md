# Admin Mode

Admin Mode is a Discord bot used for admin management. It can perform moderation as well as role management actions.

You can invite the bot to your server by using [this link](https://discord.com/oauth2/authorize?client_id=715577789612556408&scope=bot&permissions=8).

## Available commands

These are the commands which are currently available:

**.about** - Provides a description and some stats of the bot.<br>

**.help** - DM's the available commands and the usage.<br>

**.ping** - Returns the bot's latency and API ping.<br>

**.repo** - Provides the repo url of the bot.<br>

**.serverinfo** - Provides some info about the server.<br>

**.userinfo** - Provides some info on the specified user.<br>Usage: `.user-info @username/member_id`<br>

**.kick** - Kicks a member from the current server.<br>Usage: `.kick @username/member_id`<br>

**.ban** - Bans a member from the current server.<br>Usage: `.ban @username/member_id`<br>

**.unban** - Unbans a member from the current server.<br>Usage: `.unban member_id`<br>

**.mute** - Prevents a member from sending messages/adding reactions.<br>Usage: `.mute @username/member_id`<br>

**.unmute** - Gives a member back the permissions to send messages/add reactions.<br>Usage: `.unmute @username/member_id`<br>

**.purge** - Deletes the number of messages provided.<br>Usage: `.purge [number_of_messages_to_delete]`<br>

**.addrole** - Adds the specified role to a member.<br>Usage: `.add-role @username/member_id <role-name>`<br>

**.removerole** - Removes the specified role from a member.<br>Usage: `.remove-role @username/member_id <role-name>`<br>

**.lock** - Prevents members with the @everyone role from viewing/sending messages in a specific channel.<br>Usage: `.lock [#channel-name/channel_id] <lock-mode>`<br>Lock modes: `send, view/read`<br>

**.unlock** - Allows members with the @everyone role to view/send messages in a specific channel.<br>Usage: `.unlock [#channel-name/channel_id] <unlock-mode>`<br>Unlock modes: `send, view/read`<br>

## Running the bot locally

- Clone the repo with `HTTPS/SSH`.

- Make sure to obtain a [Discord token](https://discord.com/developers/applications/), a [Giphy API key](https://developers.giphy.com/dashboard/) and have [Node.js](https://nodejs.org/) installed.

- Add your Discord token and your Giphy API key in the `.env.example` and rename it to `.env`.

- Run `npm install` in the command line to install the dependencies.

- Run `npm start` or `node bot.js` to run the bot.

## Usage

Once the bot has been added to your server, it should be granted with admin priviledges.