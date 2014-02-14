/*
 * A game object looks as follows:
 *
 *  {
 *      team1_key,
 		team2_key,
 		team1_title,
 		team2_title,
 		team1_code,
 		team2_code,
 		play_at,
 		score_1,
 		score_2
 *  }
 */

// Finds the list of games given a group
exports.getGamesByGroup = function(request, response) {
    var group_name = request.body.group_name;
    // declare external files
    var utils = require("../utils");
    var mongojs = require('mongojs');
    var config = require('../auth/dbconfig');
    var querystring = require('querystring');
    var https = require('https');
    var requestlib = require('request');
    var server = require('../server');
    
    var resultAmount = 0;

    server.mongoConnectAndAuthenticate(function (err, conn, db) {
        var collection = db.collection(config.groupsCollection);
        collection.find({ 'name': group_name })
            .toArray(function (err, docs) {
                if (err) {
                    response.send({
                        "meta": utils.createErrorMeta(500, "X_001", "Something went wrong with the MongoDB: " + err),
                        "response": {}
                    });
                } else if (!docs) {
                    // we visited all docs in the collection
                    // if docs is empty
                    //if (resultAmount == 0) {
                        response.send({
                            "meta": utils.createErrorMeta(400, "X_001", "The group was not found. " + err),
                            "response": {}
                        });
                    //}
                } else {
                    var group = docs[0];
       				var gamesCollection = db.collection(config.gamesCollection);
       				gamesCollection.find({ '_id': { $in: group.games } })
            			.toArray(function (err, games) {
                			if (err) {
                    			response.send({
                        			"meta": utils.createErrorMeta(500, "X_001", "Something went wrong with the MongoDB: " + err),
                        			"response": {}
                    			});
                			} else if (!games) {
                        			response.send({
                            			"meta": utils.createErrorMeta(400, "X_001", "No games found. " + err),
                            			"response": {}
                        			});
                			} else {
                    			response.send({
                        			"meta": utils.createOKMeta(),
                        			"response": games
                    			});             
                			}
            			});
				}
			});
	});
}



// Get all games
exports.getGames = function(request, response) {
    // declare external files
    var utils = require("../utils");
    var mongojs = require('mongojs');
    var config = require('../auth/dbconfig');
    var querystring = require('querystring');
    var https = require('https');
    var requestlib = require('request');
    var server = require('../server');

    server.mongoConnectAndAuthenticate(function (err, conn, db) {
        var collection = db.collection(config.gamesCollection);
        collection.find()
            .toArray(function (err, docs) {
                if (err) {
                    response.send({
                        "meta": utils.createErrorMeta(500, "X_001", "Something went wrong with the MongoDB: " + err),
                        "response": {}
                    });
                } else if (!docs) {
                    // we visited all docs in the collection
                    // if docs is empty
                        response.send({
                            "meta": utils.createErrorMeta(400, "X_001", "The group was not found. " + err),
                            "response": {}
                        });
                } else {
                    response.send({
                        "meta": utils.createOKMeta(),
                        "response": docs
                    });             
                }
            });
    });
}


// Get all game by id
exports.getGameById = function(request, response) {
    // declare external files
    var utils = require("../utils");
    var mongojs = require('mongojs');
    var config = require('../auth/dbconfig');
    var querystring = require('querystring');
    var https = require('https');
    var requestlib = require('request');
    var server = require('../server');

    var game_id = request.body.game_id;

    server.mongoConnectAndAuthenticate(function (err, conn, db) {
        var collection = db.collection(config.gamesCollection);
        collection.find({ '_id': game_id })
            .toArray(function (err, docs) {
                if (err) {
                    response.send({
                        "meta": utils.createErrorMeta(500, "X_001", "Something went wrong with the MongoDB: " + err),
                        "response": {}
                    });
                } else if (!docs) {
                    // we visited all docs in the collection
                    // if docs is empty
                        response.send({
                            "meta": utils.createErrorMeta(400, "X_001", "The group was not found. " + err),
                            "response": {}
                        });
                } else {
                    response.send({
                        "meta": utils.createOKMeta(),
                        "response": docs[0]
                    });             
                }
            });
    });
}