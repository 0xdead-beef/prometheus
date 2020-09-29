require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const classes = require('./json/classes.json');
const fs = require('fs').promises;

client.on('message', async message => {
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
        } else {
            classes[channel] = {syllabus: args[2]};
            message.channel.send('added syllabus');
        }
        await fs.writeFile('./json/classes.json', JSON.stringify(classes), 'utf8');
    } else if (text === '.time') {
        let d = new Date();
        message.channel.send('the time is '+d.toString());
    }
});

client.once('ready', () => {
    console.log('neato');
});

client.login(process.env.CLIENT_SECRET);