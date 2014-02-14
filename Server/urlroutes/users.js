/*
 * A user object looks as follows:
 *
 *  {
 *      username:     	Name of the user
 *  }
 */



exports.login = function (request, response) {
    var utils = require("../utils");
    var https = require('https');
    var querystring = require('querystring');
    var requestlib = require('request');
    var mongojs = require('mongojs');
    var config = require('../auth/dbconfig');
    var server = require('../server');

    // blabla
}



exports.getUser = function (request, response) {
	 // declare external files
    var utils = require("../utils");
    var mongojs = require('mongojs');
    var config = require('../auth/dbconfig');
    var querystring = require('querystring');
    var https = require('https');
    var requestlib = require('request');
    var server = require('../server');
    var score = require('../Betting/Score.js');

    var user_id = request.body.user_id;

    server.mongoConnectAndAuthenticate(function (err, conn, db) {
        var collection = db.collection(config.usersCollection);
        collection.find({ '_id': user_id })
            .each(function (err, user) {
                if (err) {
                    response.send({
                        "meta": utils.createErrorMeta(500, "X_001", "Something went wrong with the MongoDB: " + err),
                        "response": {}
                    });
                } else if (!user) {
                    // we visited all docs in the collection
                    // if docs is empty
                        response.send({
                            "meta": utils.createErrorMeta(400, "X_001", "The user was not found. " + err),
                            "response": {}
                        });
                } else {
                	var betsCollection = db.collection(config.betsCollection);

 					betsCollection.find({ 'user_id': user_id })
            			.each(function (err, bet) {
            				if (err) {
                    			response.send({
                        			"meta": utils.createErrorMeta(500, "X_001", "Something went wrong with the MongoDB: " + err),
                        			"response": {}
                    			});
                			} else if (!bet) {
                    			// we visited all docs in the collection
                    			// if docs is empty
                        		response.send({
                        			"meta": utils.createOKMeta(),
                        			"response": { user: user, score: null }
                    			});
            				} else {
            					var gamesCollection = db.collection(config.gamesCollection);
        						collection.find()
            						.toArray(function (err, games) {
                						if (err) {
                    						response.send({
                        						"meta": utils.createErrorMeta(500, "X_001", "Something went wrong with the MongoDB: " + err),
                        						"response": {}
                    						});
                						} else if (!games) {
                    						// we visited all docs in the collection
                    						// if docs is empty
                        					response.send({
                            					"meta": utils.createErrorMeta(400, "X_001", "No games found. " + err),
                            					"response": {}
                        					});
                						} else {
                							// CHRISTOPHE SCORE LOGIC: USER + BET + GAMES
                							var score_games = [];
                							var user_bets = [];
                							for (var i = 0; i < games.length; i++) {
                								var game = games[i];
                								var game_id = game._id;
                								var score_game = { score_score1: game.score_1, game: score_2 };
                								var bet = bet.bets.filter(function (el) { return (el.game_id == game_id); });
                								if (bet.length > 0) {
                									score_games.push({ score_score1: game.score_1, score_score2: game.score_2 });
                									user_bets.push({ score_score1: bet[0].score_1, score_score2: bet[0].score_2 });
                								}
                								var points = score.computeScore(user_bets, score_games);

                								response.send({
                        							"meta": utils.createOKMeta(),
                        							"response": { user: user, score: points }
                    							});
                							};
       
                    					};             
                					});
            					};

            				});
            			}            
                });
            });
}

