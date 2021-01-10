module.exports = {
  name: "help",
  description: "this is a help command!",
  execute(message) {
    return message.channel.send("HELP COMMANDS");
  },
};
