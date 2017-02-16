var twitter = require("./src/twitter-client");
var Alexa = require('alexa-sdk');

var clearTag = function(value){
	value = value.replace(/meetjs/ig, "Meet JS")
	value = value.replace(/#/g, '')
	value = value.replace(/@/g, '')
	return value;
} 

var handlers = {
	'LaunchRequest': function () {
		this.emit(':ask', 'Hello my dear MeetJS! For which query do you want to check?', 'Which query to check?');
	},
	'HashIntent': function() {
		var hash = this.event.request.intent.slots.Hash.value;
		this.attributes['item'] = 0;
		this.attributes['hash'] = hash;

		twitter
		.getByHash(hash)
		.then((tweets) => {
			this.emit(":ask", clearTag(`${tweets.statuses[0].text} <break time="1s"/> by ${tweets.statuses[0].user.name}. Do you want next?`));
		});
	},
	'NextIntent': function() {
		var index = this.attributes['item'];
		var hash = this.attributes['hash'];
		this.attributes['item'] = index+1;
		twitter
		.getByHash(hash)
		.then((tweets) => {
			this.emit(":ask", clearTag(`${tweets.statuses[index+1].text} <break time="1s"/> by ${tweets.statuses[index+1].user.name}. Do you want next?`));
		});
	},
	'AMAZON.CancelIntent': function() {
		this.emit(":tell", "Ok, Bye Bye.")
	}
};

exports.handler = function(event, context, callback) {
	var alexa = Alexa.handler(event, context);
	alexa.registerHandlers(handlers);
	alexa.execute();
};