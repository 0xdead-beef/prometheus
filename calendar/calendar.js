const {google} = require('googleapis');
const credentials = require('./credentials.json');
const token = require('./token.json');
const fs = require('fs').promises;

const {client_secret, client_id, redirect_uris} = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
oAuth2Client.setCredentials(token);
const auth = oAuth2Client;

oAuth2Client.on('tokens', async tokens => {
    if (tokens.refresh_token) {
        token = oAuth2Client.credentials;
        await fs.writeFile('./calendar/token.json', JSON.stringify(token), 'utf8');
    }
});

const nextWeek = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
}

function assignments(message) {
    const calendar = google.calendar({version: 'v3', auth});
    calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        timeMax: nextWeek().toISOString(),
        singleEvents: true,
        orderBy: 'startTime'
    }).then(res => {
        const events = res.data.items.filter(event => {
            return event.summary.toLowerCase().startsWith(message.channel.name.toLowerCase());
        });
        if (!events.length) {
            return message.channel.send('no upcoming assignments for this class! :) (or did you mean to do this in another channel?)');
        }
        let assignments = 'here are the assignments for the upcoming week:\n```';
        events.forEach(event => {
            assignments += `${event.start.date}: ${event.summary}\n`;
        });
        assignments += '```';
        message.channel.send(assignments);
    }).catch(err => {
        console.error(err);
        message.channel.send('google is being trashy sorry :(');
    });
}
module.exports = {
    assignments
}