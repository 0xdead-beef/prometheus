require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const classes = require('./json/classes.json');

client.on('message', message => {
    const text = message.content;
    let args = /^([^ ]+)(?: +(.+)$)?/.exec(text);

    if (text === '.syllabus') {
        const channel = message.channel.name;
        if (classes[channel] && classes[channel].syllabus) {
            message.channel.send(classes[channel].syllabus);
        } else {
            message.channel.send('please use this in a class channel to access the respective syllabus!');
        }
    } else if (args[1] === '.setsyllabus' && args[2]) {
        const channel = message.channel.name;
        if (classes[channel]) {
            classes[channel].syllabus = args[2];
            message.channel.send('updated syllabus');
        }
    }
});

client.once('ready', () => {
    console.log('neato');
});

client.login(process.env.CLIENT_SECRET);