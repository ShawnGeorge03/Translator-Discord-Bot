require("dotenv").config();

var codes = require('./commands/langCodes.js');

const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "!";
const fs = require("fs");
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("Translator is online");
  codes.setSupportedLanguages();
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift();
  switch (command) {
    case "translate":
      client.commands.get("translate").execute(message, args, message.content);
      break;
    case "help":
      client.commands.get("help").execute(message, args);
      break;
    case "langCodes" :
      client.commands.get("langCodes").execute(message, args);
      break;
    case "detectLang" :
      client.commands.get("detectLang").execute(message, message.content);
      break;
    default :
      message.channel.send("Invalid Command!")
      break;
  }
});

client.login(process.env.TOKEN);
