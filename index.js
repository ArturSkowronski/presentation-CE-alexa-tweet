var twitter = require("./src/twitter-client");

exports.handler = function(event, context, callback){
	twitter
	.getByHash('meetjs')
	.then(function(tweets){
		console.log(`${tweets.statuses[0].text} by ${tweets.statuses[0].user.name}`)
	});
};
