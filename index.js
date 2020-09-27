require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const classes = require('./json/classes.json')

client.on('message', message => {
    if (message.content === '.syllabus') {
        const channel = message.channel.name;
        if (classes[channel] && classes[channel].syllabus) {
            message.channel.send(classes[channel].syllabus);
        } else {
            message.channel.send('please use this in a class channel to access the respective syllabus!');
        }
    }
});

client.once('ready', () => {
    console.log('neato');
});

client.login(process.env.CLIENT_SECRET);