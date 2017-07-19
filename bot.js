var Twit = require(‘twit’);
var TwitterBot = require(‘node-twitterbot’).TwitterBot;
var Bot = new TwitterBot({
	consumer_key: process.env.BOT_CONSUMER_KEY,
	consumer_secret: process.env.BOT_CONSUMER_SECRET,
	access_token: process.env.BOT_ACCESS_TOKEN,
	access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});
var phraseArray = [
	'Aywas rulez',
	'This is a major test of the emergency Aywas broadcasting system',
	'This is not a real Aywas emergency',
	'Aywas bot 4 life!',
	'Signs you might be addicted to aywas: You made a bot for scav',
	'Tired of cats? Try a Melo!'
];
function chooseRandom(myArray) {
	return myArray[Math.floor(Math.random() * myArray.length)];
}
var phrase = chooseRandom(phraseArray) + ", " + chooseRandom(phraseArray);
Bot.tweet(phrase);