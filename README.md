# Translator-Discord-Bot

This is a simple Discord Translator Bot which used Cloud Translation API from Google Cloud to return translation, detect language of text and others

## Available commands 

1. !translate to: "LANGCODE" "TEXT"
    <ul>
      <li>Translates the TEXT to the given LANGCODE and prints it to the channel</li>
      <li>Example : !translate to: fr "Hello World</li>
      <li>Translation: Bonjour le monde</li>
      <li>Example : !translate to: French "Hello World</li>
      <li>A language to translate to was not provided!</li>
    </ul>
    
2. !langCodes for: "LANGUAGE" 
    <ul>
      <li>Returns the LANGCODE that is used for the given LANGUAGE</li>
      <li>Example : !langCodes for: English</li>
      <li>The language code for English is en</li>
      <li>Example : !langCodes English</li>
      <li>The 'for:' command was not used!</li>
    </ul>
    
3. !detectLang "TEXT"
    <ul>
      <li>Returns the LANGUAGE for the given TEXT</li>
      <li>Example : !detectLang "Halló heimur"</li>
      <li>Icelandic with confidence : 100</li>
      <li>Example : !detectlang</li>
      <li>Missing text to be detected!</li>
    </ul>
    
4. !help cmd: "COMMAND" 
    <ul>
      <li>Returns a description for how to use the COMMAND if the COMMAND is all prints all supported commands</li>
      <li>Example : !help cmd: !translate</li>
      <li>Returns the description for how to use !translate command</li>
    </ul>

## How to use



## Add to a server ?


