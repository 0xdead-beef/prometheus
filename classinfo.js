const {MessageEmbed} = require('discord.js');
const classes = require('./json/classes.json');
const fs = require('fs').promises;

module.exports = {
	getClassInfo(channel, property) {
        const name = channel.name;
        if (classes[name] && classes[name][property]) {
            channel.send(classes[name][property]);
        } else {
            channel.send(`please use this in a class channel to access the respective ${property}!`);
        }
	},
	async addClassInfo(channel, property, info) {
		const name = channel.name;
        if (classes[name]) {
            classes[name][property] = info;
            channel.send(`updated ${property}`);
        } else {
            classes[name] = {[property]: info};
            channel.send(`added ${property}`);
        }
        await fs.writeFile('./json/classes.json', JSON.stringify(classes), 'utf8');
	}
}