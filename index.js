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
		twitter
		.getByHash('meetjs')
		.then((tweets) => {
			this.emit(":tell", clearTag(`${tweets.statuses[0].text} <break time="1s"/> by ${tweets.statuses[0].user.name}`));
		});
	}
};

exports.handler = function(event, context, callback) {
	var alexa = Alexa.handler(event, context);
	alexa.registerHandlers(handlers);
	alexa.execute();
};