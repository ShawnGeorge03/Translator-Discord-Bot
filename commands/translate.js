const projectId = process.env.PROJECT_ID;
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
    var toLang = "";
    var text = "";

    const countOccurrences = (arr, val) =>
      arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    const indexOfOut = args.indexOf("to:");
    const occurOfOut = countOccurrences(args, "to:");

    //Checks if 'to:' command is part of the argument
    if (indexOfOut === -1) {
      message.channel.send("The 'to:' command was not used!");
      return;

    }
    //Checks if the are multiple 'to:' command in the argument
    else if (occurOfOut > 1) {
      message.channel.send("The 'to:' command was used multiple times!");
      return;
    }
    //Checks if there is language provided to translate to
    else if (!args[indexOfOut + 1] || args[indexOfOut + 1].startsWith('"')) {
      message.channel.send("A language to translate to was not provided!");
      return;
    }
    //Collects the language to be translated to
    else {
      toLang = args[indexOfOut + 1];
    }

    const initialMSG = orginalMSG.split("");
    const firstIndexOfQuote = initialMSG.indexOf('"');
    const lastIndexOfQuote = initialMSG.lastIndexOf('"');
    const occurOfQuote = countOccurrences(initialMSG, '"');

    //Checks if both the quotations exist or not
    if(firstIndexOfQuote == -1 && lastIndexOfQuote == -1){
      return message.channel.send("Missing text to be translated!");
    //Checks if the Quotations are in differnt places
    } else if( firstIndexOfQuote == lastIndexOfQuote) {
      return message.channel.send("Missing the opening/closing quotation");  
    //Checks if there is only two quotations being used
    } else if(occurOfQuote > 2) { 
      return message.channel.send("Multiple Quotations where used!");
    //Collects the text to be translated
    }else {
      text = initialMSG.slice(firstIndexOfQuote + 1, lastIndexOfQuote).join("");
    }

    if(text.length != 0){
       translateText(message, text, toLang);
    } else {
      return message.channel.send("Missing text to be translated!");
    }
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
    }
  } catch (error) {
    console.error(error.details);
    message.channel.send(
      "The language code invalid use !codes to look for correct language code"
    );
  }
}