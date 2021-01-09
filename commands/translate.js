
module.exports = {
    name: 'translate',
    description: "this is a ping command!",
    //REQUIRED CMD
    //!translate to: en "text"
    //!translate "text" to: en

    //OPTIONAL CMD from:
    //!translate from: fr to: en "text"
    //!translate from: fr "text" to: en

    //!translate to: en from: fr "text"
    //!translate to: en "text" from: fr

    //!translate "text" from: fr to: en
    //!translate "text" to: en from: fr
    execute(message, args, orginalMSG){

        const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
        var toLang;
        var text;

        const indexOfOut = args.indexOf('to:');
        const occurOfOut = countOccurrences(args, 'to:');

        //Checks if 'to:' command is part of the argument
        if(indexOfOut === -1) 
        {
            message.channel.send("The 'to:' command was not used!")
        }
        //Checks if the are multiple 'to:' command in the argument 
        else if (occurOfOut > 1) 
        {
            message.channel.send("The 'to:' command was used multiple times!")
        }
        //Checks if there is language provided to translate to
        else if(!args[indexOfOut + 1] || args[indexOfOut + 1].startsWith("\""))
        {
            message.channel.send("A language to translate to was not provided!")
        }
        //Collects the language to be translated to
        else 
        {
            toLang = args[indexOfOut + 1];
        }
    
        const initialMSG =  orginalMSG.split("");
        const firstIndexOfQuote = initialMSG.indexOf("\"");
        const lastIndexOfQuote = initialMSG.lastIndexOf("\"");
        const occurOfQuote = countOccurrences(initialMSG, "\"");

        message.channel.send(firstIndexOfQuote + " " + lastIndexOfQuote + " " + occurOfQuote);

        if(firstIndexOfQuote == -1 && lastIndexOfQuote == -1 && occurOfQuote == 0) 
        {
            message.channel.send("Text to be translated to was not provided!");
        }
        else if(occurOfQuote > 2) 
        {
            message.channel.send("Multiple Quotation where used only requires one at the beginging of the text and end of the text!");
        }else
        {
            text = initialMSG.slice(firstIndexOfQuote + 1, lastIndexOfQuote).join("");
        }

        console.log(text);

    }
}

