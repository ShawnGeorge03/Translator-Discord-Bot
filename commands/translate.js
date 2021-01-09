const projectId = "discord-translater";
const location = "global";

const { TranslationServiceClient } = require("@google-cloud/translate");

const translationClient = new TranslationServiceClient();

module.exports = {
  name: "translate",
  description: "this is a ping command!",
  //REQUIRED CMD
  //!translate to: en "text"
  //!translate "text" to: en
  execute(message, args, orginalMSG) {
    const countOccurrences = (arr, val) =>
      arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    var toLang;
    var text;

    const indexOfOut = args.indexOf("to:");
    const occurOfOut = countOccurrences(args, "to:");

    //Checks if 'to:' command is part of the argument
    if (indexOfOut === -1) {
      message.channel.send("The 'to:' command was not used!");
    }
    //Checks if the are multiple 'to:' command in the argument
    else if (occurOfOut > 1) {
      message.channel.send("The 'to:' command was used multiple times!");
    }
    //Checks if there is language provided to translate to
    else if (!args[indexOfOut + 1] || args[indexOfOut + 1].startsWith('"')) {
      message.channel.send("A language to translate to was not provided!");
    }
    //Collects the language to be translated to
    else {
      toLang = args[indexOfOut + 1];
    }

    const initialMSG = orginalMSG.split("");
    const firstIndexOfQuote = initialMSG.indexOf('"');
    const lastIndexOfQuote = initialMSG.lastIndexOf('"');
    const occurOfQuote = countOccurrences(initialMSG, '"');

    //Checks if there is only two quotations being used
    if (occurOfQuote > 2) {
      message.channel.send("Multiple Quotations where used!");
    }
    //Checks if both the quotations exist or not
    else if (firstIndexOfQuote == -1 && lastIndexOfQuote == -1) {
      message.channel.send(
        "Mising either the beginning and last quotations for the text!"
      );
    }
    //Collects the text to be translated
    else {
      text = initialMSG.slice(firstIndexOfQuote + 1, lastIndexOfQuote).join("");
    }

    translateText(message, text, toLang);
  },
};

async function translateText(message, text, toLang) {
  // Construct request
  const request = {
    parent: `projects/${projectId}/locations/${location}`,
    contents: [text],
    mimeType: "text/plain",
    targetLanguageCode: toLang,
  };

  try {
    // Run request
    const [response] = await translationClient.translateText(request);

    for (const translation of response.translations) {
      message.channel.send(`Translation: ${translation.translatedText}`);
      console.log(`Translation: ${translation.translatedText}`);
    }
  } catch (error) {
    message.channel.send(
      "The 'to:' argument was invalid use !supportedLang to look for correct language code"
    );
  }
}
