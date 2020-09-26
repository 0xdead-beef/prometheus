require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('message', message => {
    if (message.content === '!ping') {
        message.channel.send('Pong.');
    }
});

client.once('ready', () => {
    console.log('neato');
});

client.login(process.env.CLIENT_SECRET);