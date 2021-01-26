const {MessageEmbed} = require('discord.js');
const classes = require('./json/classes.json');
const fs = require('fs').promises;

module.exports = {
	getClassInfo(channel, property) {
        const name = channel.name;
        const info = classes[name][property];
        if (classes[name] && info) {
            if (property === 'zoom') {
                const zoomInfo = info.split(/, +/);
                const embed = new MessageEmbed()
                    .setTitle(`${name.toUpperCase()} Zoom`)
                    .setURL(zoomInfo[0])
                    .addFields([{
                        name: 'Meeting ID',
                        value: zoomInfo[1],
                        inline: true
                    }, {
                        name: 'Passcode',
                        value: zoomInfo[2],
                        inline: true
                    }, {
                        name: 'Dial by Location',
                        value: zoomInfo[3],
                        inline: true
                    }, {
                        name: 'Mobile Passcode',
                        value: zoomInfo[4],
                        inline: true
                    }])
                    .setColor('#7711bf');
                return channel.send(embed);
            }
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
        await fs.writeFile('./json/classes.json', JSON.stringify(classes, null, 4), 'utf8');
	}
}
