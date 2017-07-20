var Twit = require('twit');
var TwitterBot = require('node-twitterbot').TwitterBot;
var Bot = new TwitterBot({
	consumer_key: process.env.BOT_CONSUMER_KEY,
	consumer_secret: process.env.BOT_CONSUMER_SECRET,
	access_token: process.env.BOT_ACCESS_TOKEN,
	access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});
var Api = new Twit({
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
	'Tired of cats? Try a Melo!',
	'Don\'t be a square! Collect pixel pets!'
];
var addictArray = [
	'You made a bot for a user run contest for pixel currency',
	'You made a bot for scav',
	'You have been adventuring the last 14 hours',
	'Sleep?  What is sleep?',
	'You start referring to your money as USD, BP, and GP',
	'You name your pets off of an Aywas creature, instead of the other way around',
	'SCAV!',
	'You refer to Jak, Eve, or Mauri as a sibling, a parent, or a god',
	'You plan your week according to Aywas events',
	'You simply NEED that mayday Teo/Snoodle/Faux/Oët',
	'You realize you\'ve spent hundreds or thousands of dollars on the site',
	'You begin referring to your self by your Aywas username',
	'You can mask a Melo\'s or Teo\'s tail in your sleep'
];
var mustHavesArray = [
	'Breeding Pendant',
	'Glittering Slab',
	'Miniature Phoenix Tree',
	'Mini Fridge',
	'Platinum Breeding Coin',
	'Slashbot'
];
var hotOrNotArray = [
	'short skirts and flowy hair',
	'cute tank tops',
	'mermaid tails',
	'dresses',
	'wings, wings, wings!',
	'a beautiful location',
	'business suits',
	'Aywas fursuits',
	'over accessorizing'
];
function addict() {
	return 'You might be addicted to aywas if: ' + choosRandom(addictArray);
}
function mustHave() {
	return chooseRandom(['You aren\'t truly an aywas addict unless you have ', 'No adventure on aywas complete without ']) +
			chooseRandom(mustHavesArray);
}
function hotOrNot() {
	return chooseRandom([
		'Latest trend in aywas clothing? ',
		'Who comes up with these styles? ',
		'So I saw on aywas today '
	]) +
			chooseRandom(hotOrNotArray) +
			'!  What do you think?  Hot? or Not?';
}
function phrase() {
	return chooseRandom(phraseArray);
}
function chooseRandom(myArray) {
	return myArray[Math.floor(Math.random() * myArray.length)];
}
function generatePhrase() {
	var thisPhrase = chooseRandom([addict, mustHave, hotOrNot, phrase])();
	thisPhrase += ' Join Aywas: http://www.aywas.com/register/referral/407/';
	return thisPhrase;
}
Api.get('statuses/user_timeline', {count: 36}, function(err, data) {
	var tweets = data.map(function(tweet) {
		return tweet.text;
	});
	var valid = false;
	var tweetPhrase = generatePhrase();
	while (!valid) {
		valid = true;
		for (var i = 0; i < tweets.length; i++) {
			if (tweets[i] == tweetPhrase) {
				valid = false;
			}
		}
		if (!valid) {
			tweetPhrase = generatePhrase();
		}
	}
	Bot.tweet(tweetPhrase);
});