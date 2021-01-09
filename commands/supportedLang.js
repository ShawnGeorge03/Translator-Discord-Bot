module.exports = {
    name: 'supportedLang',
    description: "this is a supportedLang command!",
    execute(message, args){
        message.channel.send('pong!');
    }
}