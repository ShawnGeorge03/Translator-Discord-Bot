require("dotenv").config();

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
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  switch (command) {
    case "ping":
      client.commands.get('ping').execute(message, args);
      break;
    case "translate":
      client.commands.get('translate').execute(message, args, message.content);
      break; 
    default:
      message.channel.send("This is not a supported command!")
      break;
  }

});

client.login(process.env.TOKEN);
