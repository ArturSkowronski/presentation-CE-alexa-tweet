var twitter = require("./src/twitter-client");

exports.handler = function(event, context, callback){
	twitter.client.get('search/tweets', {q: 'meetjs'}, function(error, tweets, response) {
		console.log(`${tweets.statuses[0].text} by ${tweets.statuses[0].user.name}`)			
	});	
};
