module.exports = {
    name: "detectLang",
    description: "this is a help command!",
    execute(message, args) {
      return message.channel.send("detectLang Command");
    },
  };

  async function detectLanguage() {
    // Construct request
    const request = {
      parent: `projects/${projectId}/locations/${location}`,
      content: text,
    };
  
    try {
      // Run request
      const [response] = await translationClient.detectLanguage(request);
  
      console.log('Detected Languages:');
      for (const language of response.languages) {
        console.log(`Language Code: ${language.languageCode}`);
        console.log(`Confidence: ${language.confidence}`);
      }
    } catch (error) {
      console.error(error.details);
    }
  }
  