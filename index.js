require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs').promises;
const calendar = require('./calendar/calendar.js');
const classinfo = require('./classinfo.js');

client.on('message', async message => {
    const text = message.content;
    let args = /^([^ ]+)(?: +(.+)$)?/.exec(text);
    if (!args) {
        return; // ??? wtf
    }

    if (text === '.syllabus') {
        classinfo.getClassInfo(message.channel, 'syllabus');
    } else if (args[1] === '.setsyllabus' && args[2]) {
        classinfo.addClassInfo(message.channel, 'syllabus', args[2]);
    } else if (text === '.articles') {
        classinfo.getClassInfo(message.channel, 'articles');
    } else if (args[1] === '.setarticles' && args[2]) {
        classinfo.addClassInfo(message.channel, 'articles', args[2]);
    } else if (text === '.zoom') {
        classinfo.getClassInfo(message.channel, 'zoom');
    } else if (args[1] === '.setzoom' && args[2]) {
        classinfo.addClassInfo(message.channel, 'zoom', args[2]);
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
    } else if (text === '.help') {
        message.channel.send("hi there! I'm prometheus, the friendly neighborhood bot! here are some of my functions:\n`.articles:` links to a document containing all article links, separated by sessions, for each class in its respective channel\n`.assignments:` lists assignments in each class channel upcoming for the week\n`.syllabus:` links to a document with the syllabus for each respective class\n`.zoom:` provides the weekly zoom link for each class in its respective channel");
    }
});

client.once('ready', () => {
    console.log('neato');
});

client.login(process.env.CLIENT_SECRET);
