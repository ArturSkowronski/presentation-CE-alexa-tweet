var twitter = require("./src/twitter-client");
var Alexa = require('alexa-sdk');

var handlers = {
	'LaunchRequest': function () {
		twitter
		.getByHash('meetjs')
		.then((tweets) => {
			this.emit(":tell", `${tweets.statuses[0].text} by ${tweets.statuses[0].user.name}`);
		});
	}
};

exports.handler = function(event, context, callback) {
	var alexa = Alexa.handler(event, context);
	alexa.registerHandlers(handlers);
	alexa.execute();
};