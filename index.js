var twitter = require("./src/twitter-client");
var Alexa = require('alexa-sdk');

var handlers = {
	'LaunchRequest': function () {
		this.emit(":tell", `Hello Meet JS`);
	}
};

exports.handler = function(event, context, callback) {
	var alexa = Alexa.handler(event, context);
	alexa.registerHandlers(handlers);
	alexa.execute();
};