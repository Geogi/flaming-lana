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
            .each(function (err, docs) {
                if (err) {
                    response.send({
                        "meta": utils.createErrorMeta(500, "X_001", "Something went wrong with the MongoDB: " + err),
                        "response": {}
                    });
                } else if (!docs) {
                    // we visited all docs in the collection
                    // if docs is empty
                    if (resultAmount == 0) {
                        response.send({
                            "meta": utils.createErrorMeta(400, "X_001", "The group was not found. " + err),
                            "response": {}
                        });
                    }
                } else {
                    // increase resultAmount so on next iteration the algorithm knows the id was found.
                    resultAmount++;
                    var group = docs[0];
                    var amount = 0;
       				var gamesCollection = db.collection(config.gamesCollection);
       				gamesCollection.find({ '_id': { $in: group.games } })
            			.each(function (err, docs) {
                			if (err) {
                    			response.send({
                        			"meta": utils.createErrorMeta(500, "X_001", "Something went wrong with the MongoDB: " + err),
                        			"response": {}
                    			});
                			} else if (!docs) {
                    			// we visited all docs in the collection
                    			// if docs is empty
                    			if (amount == 0) {
                        			response.send({
                            			"meta": utils.createErrorMeta(400, "X_001", "No games found. " + err),
                            			"response": {}
                        			});
                    			}
                			} else {
                    			// increase resultAmount so on next iteration the algorithm knows the id was found.
                    			amount++;
                    			response.send({
                        			"meta": utils.createOKMeta(),
                        			"response": docs
                    			});             
                			}
            			});
				}
			});
	});
}
