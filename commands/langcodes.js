const projectId = process.env.PROJECT_ID;
const location = 'global';

// Imports the Google Cloud Translation library
const {TranslationServiceClient} = require('@google-cloud/translate');

// Instantiates a client
const translationClient = new TranslationServiceClient();

let languagNames = [];
let languageCode = [];

module.exports = {
    name: "langCodes",
    description: "Prints out all supported language codes",
    execute(message, args) {

      var language = "";
  
      const countOccurrences = (arr, val) =>
        arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
      const indexOfFor = args.indexOf("for:");
      const occurOfFor = countOccurrences(args, "for:");

      if(indexOfFor == -1){
        return message.channel.send("The 'for:' command was not used!");
      }else if (occurOfFor > 1) {
        return message.channel.send("The 'for:' command was used multiple times!");
      } else if (!args[indexOfFor + 1]) {
        return message.channel.send("A language was not provided!");
      }else {
        language = args[indexOfFor + 1];
      }
      getSupportedLanguages(message,language.trim());
    },
};

function getSupportedLanguages(message, args) {
  if(args.length != 0 && args.includes("Chinese")) {
    var codesForChinese = "The language code for Chinese has the following options and they are" +
    "Chinese (Simplified)	for which is it is zh-CN or zh  and Chinese (Traditional)	 for which it is zh-TW"; 
    return message.channel.send(codesForChinese);
  } else {
    var index = languagNames.indexOf(args);
    if(index === -1){
      return message.channel.send("The language code for " + args + " does not exist");
    }else {
      return message.channel.send("The language code for " + args + " is " + languageCode[index]);
    } 
  }
}

module.exports.setSupportedLanguages = async function() {
   // Construct request
   const request = {
    parent: `projects/${projectId}/locations/${location}`,
    displayLanguageCode: 'en',
  };
  try {
    // Get supported languages
    const [response] = await translationClient.getSupportedLanguages(request);
    for (const language of response.languages) {
      languageCode.push(`${language.languageCode}`);
      languagNames.push(`${language.displayName}`);
    }
  } catch (error) {
    console.error(error.details);
  } 
}