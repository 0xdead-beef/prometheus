# prometheus
> bot for grad school :)

## prerequisitsesseses

- need node
- create `.env` at the root with `CLIENT_SECRET=token here` https://discord.com/developers/applications/
- create `credentials.json` and `token.json` in calendar directory https://developers.google.com/calendar/quickstart/nodejs
- `npm ci` to install dependencies
- `npm start` to start the bot

## commands
- `.syllabus`: links the syllabus for the respective class of the channel you're in
- `.setsyllabus`: sets the syllabus to something else in each respective channel
- `.articles`: links to articles when used in class channels
- `.assignments`: lists upcoming assignments for the next week in each respective class channel
- `.help`: gives a list of the four main commands (.syllabus, .articles, .assignments, .zoom) and how to use them
- `.time`: tells you the time! because why not
- `.coinflip`: gives you heads or tails, also because why not
- `.zoom`: links/meeting info for each respective class