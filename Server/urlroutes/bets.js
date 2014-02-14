/*
 * A bet object looks as follows:
 *
 *  {
 *      user_id:     	betting user,
        amount:    		Amount of money bet,
        bets:  			Prognosis for each game
        	[ { game_id:  Game,
        	    score_1:  Prognosis score team 1,
        	    score_2:  Prognosis score team 2
        	  },
        	  { game_id:  Game,
        	    score_1:  Prognosis score team 1,
        	    score_2:  Prognosis score team 2
        	  },
        	  ... ]
 *  }
 */

 exports.postBet = function(request, response) {
    // declare external files
    var mongojs = require('mongojs');
    var config = require('../auth/dbconfig');
    var server = require('../server');
    var utils = require('../utils');

    var name = request.body.user_id;
    var amount = request.body.amount;
    var bets = request.body.bets;

    var resultAmount = 0;

    server.mongoConnectAndAuthenticate(function (err, conn, db) {
        var collection = db.collection(config.betscollection);
        collection.find({ 'user_id': user_id })
            .each(function (err, docs) {
                if (err) { 
                    response.send({
                        "meta": utils.createErrorMeta(500, "X_001", "Something went wrong with the MongoDB: " + err),
                        "response": {}
                    });
                } else if (!docs) {
                	    var bet = {
                            "user_id": user_id,
                            "amount": amount,
                            "bets": bets
                        };
                        collection.insert(bet, function (err, docs) {
                            if (err) {
                                response.send({
                                    "meta": utils.createErrorMeta(500, "X_001", "Something went wrong with the MongoDB: " + err),
                                    "response": {}
                                });
                            } else {
                                response.send({
                        			"meta": utils.createOKMeta(),
                        			"response": docs
                    			}); 
                            }
                        });  
                } else {
                    // increase resultAmount so on next iteration the algorithm knows the id was found.
                    resultAmount++;
                    response.send({
                           "meta": utils.createErrorMeta(400, "X_001", "This user already betted. " + err),
                           "response": {}
                    });         
                }
            });
    });
}