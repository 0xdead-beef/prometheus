require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const classes = require('./json/classes.json');
const fs = require('fs').promises;
const calendar = require('./calendar/calendar.js');
const articles = require('./json/articles.json');

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
    } else if (text === '.coinflip') {
        const x = (Math.floor(Math.random() * 2) == 0);
        if (x) {
            message.channel.send('heads');
        }
        else {
            message.channel.send('tails');
        }
    } else if (text === '.assignments') {
        calendar.assignments(message);
     } else if (text === '.zoom') {
        const channel = message.channel.name;
        if (zoom[channel] && zoom[channel].zoom) {
            message.channel.send(zoom[channel].zoom);
        } else {
            message.channel.send('you can use discord for video calls!')
        }
    } else if (text === '.articles') {
        const channel = message.channel.name;
        if (articles[channel] && articles[channel].articles) {
            message.channel.send(articles[channel].articles);
          } else {
                message.channel.send('please use this in a class channel to access the respective articles!')
            }
    } else if (text === '.help') {
        message.channel.send("hi there! I'm prometheus, the friendly neighborhood bot! here are some of my functions:\n`.articles:` links to a document containing all article links, separated by sessions, for each class in its respective channel\n`.assignments:` lists assignments in each class channel upcoming for the week\n.`syllabus:` links to a document with the syllabus for each respective class\n`.zoom:` provides the weekly zoom link for each class in its respective channel");
    }
});

client.once('ready', () => {
    console.log('neato');
});

client.login(process.env.CLIENT_SECRET);