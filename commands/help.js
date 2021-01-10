module.exports = {
  name: "help",
  description: "this is a help command!",
  execute(message, args) {
    const translateText =
      '!translate to: LANGCODE  " TEXT" \n' +
      "Translates the TEXT to the given LANGCODE and prints it to the channel\n" +
      'Example : !translate to: fr "Hello World"\n' +
      "          Translation: Bonjour le monde\n" +
      'Example : !translate to: French "Hello World"\n' +
      "          A language to translate to was not provided!\n";

    const langCodesText =
      '!langCodes for: "LANGUAGE "\n' +
      "Returns the LANGCODE that is used for the given LANGUAGE\n" +
      "Example : !langCodes for: English\n" +
      "          The language code for English is en\n" +
      "Example : !langCodes English\n" +
      "          The 'for:' command was not used!\n";

    const detectLangText =
      '!detectLang " TEXT "\n' +
      "Returns the LANGUAGE for the given TEXT\n" +
      "Example : !detectlang Halló heimur\n" +
      "          The language is Icelandic and I am 100% sure\n" +
      "Example : !detectlang\n" +
      "          Missing text to be detected!\n";

    const helpText =
      "!help cmd: TEXT\n" +
      "Returns a description for how to use each command\n" +
      "Example : !help cmd: !translate\n" +
      "Returns the description for how to use !translate command\n";

    var cmd = "";

    const countOccurrences = (arr, val) =>
      arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    const indexOfCmd = args.indexOf("cmd:");
    const occurOfCmd = countOccurrences(args, "cmd:");

    //Checks if 'cmd:' command is part of the argument
    if (indexOfCmd === -1) {
      return message.channel.send("The 'cmd:' command was not used!");
    }
    //Checks if the are multiple 'cmd:' command in the argument
    else if (occurOfCmd > 1) {
      return message.channel.send(
        "The 'cmd:' command was used multiple times!"
      );
    }
    //Checks if there is language provided to translate to
    else if (!args[indexOfCmd + 1]) {
      return message.channel.send("A command was not provided");
    }
    //Collects the language to be translated to
    else {
      cmd = args[indexOfCmd + 1];
    }

    switch (cmd) {
      case "!translate":
        return message.channel.send(translateText);
      case "!langCodes":
        return message.channel.send(langCodesText);
      case "!detectLang":
        return message.channel.send(detectLangText);
      case "!help":
        return message.channel.send(helpText);
      case "all":
        return message.channel.send(
          translateText +
            "\n" +
            langCodesText +
            "\n" +
            detectLangText +
            "\n" +
            helpText
        );
      default:
        return message.channel.send("This command does not exist!");
    }
  },
};
