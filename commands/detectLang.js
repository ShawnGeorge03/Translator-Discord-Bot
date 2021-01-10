const projectId = process.env.PROJECT_ID;
const location = "global";

// Imports the Google Cloud Translation library
const { TranslationServiceClient } = require("@google-cloud/translate");

// Instantiates a client
const translationClient = new TranslationServiceClient();

var langs = require("langs");

module.exports = {
  name: "detectLang",
  description: "this command allows the language to be detected",
  execute(message, orginalMSG) {
    const countOccurrences = (arr, val) =>
      arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

    const initialMSG = orginalMSG.split("");
    const firstIndexOfQuote = initialMSG.indexOf('"');
    const lastIndexOfQuote = initialMSG.lastIndexOf('"');
    const occurOfQuote = countOccurrences(initialMSG, '"');

    var text;

    //Checks if both the quotations exist or not
    if (firstIndexOfQuote == -1 && lastIndexOfQuote == -1) {
      return message.channel.send("Missing text to be detected!");
      //Checks if the Quotations are in differnt places
    } else if (firstIndexOfQuote == lastIndexOfQuote) {
      return message.channel.send("Missing the opening/closing quotation");
      //Checks if there is only two quotations being used
    } else if (occurOfQuote > 2) {
      return message.channel.send("Multiple Quotations where used!");
      //Collects the text to be translated
    } else {
      text = initialMSG.slice(firstIndexOfQuote + 1, lastIndexOfQuote).join("");
    }

    if (text.length != 0) {
      detectLanguage(message, text);
    } else {
      return message.channel.send("Missing text to be detected!");
    }
  },
};

async function detectLanguage(message, text) {
  // Construct request
  const request = {
    parent: `projects/${projectId}/locations/${location}`,
    content: text,
  };

  try {
    // Run request
    const [response] = await translationClient.detectLanguage(request);
    var output = "";

    let langCode = [];
    let confidence = [];
    let langName = [];

    for (const language of response.languages) {
      console.log(`Language Code: ${language.languageCode}`);
      console.log(`Confidence: ${language.confidence}`);

      langCode.push(`${language.languageCode}`);
      confidence.push(`${language.confidence}`);
    }

    for (var i = 0; i < langCode.length; i++) {
      var languageName = "";
      if (langCode[i] === "zh-CN" || langCode[i] === "zh") {
        languageName = "";
      } else if (langCode[i] === "zh-TW") {
        languageName = "";
      } else if (langs.has("1", langCode[i])) {
        languageName = langs.where("1", langCode[i]).name;
      } else if (lang.has("2", langCode[i])) {
        languageName = langs.where("2", langCode[i]).name;
      } else {
        languageName = langCode[i];
      }
      langName.push(languageName);
    }

    for (var i = 0; i < langName.length; i++) {
      output += langName[i] + " with confidence : " + confidence[i] * 100;
    }
    message.channel.send(output);
  } catch (error) {
    console.error(error.details);
  }
}
