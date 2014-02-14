var fs = require('fs');
var mongojs = require('mongojs');
var config = require('../auth/dbconfig');
var server = require('../server');
var utils = require('../utils');




function import_rounds() {
	var fileJSON = require('./data/rounds.json');
	console.log(fileJSON);


	rounds = fileJSON["rounds"];
	rounds.forEach(function(round) {
			
	});


	return 0;
}


exports.import_rounds = function(request, response) {
	var fileJSON = require('./data/rounds.json');
	console.log(fileJSON);


	rounds = fileJSON["rounds"];
	rounds.forEach(function(round) {
			
	});


	return 0;
}

import_game = function(i) {
	var fileJSON = require('./gamesimulator/data/'+i);
	console.log(fileJSON);


	games = fileJSON["games"];
	games.forEach(function(game) {

	    server.mongoConnectAndAuthenticate(function (err, conn, db) {
	        var collection = db.collection(config.gamesCollection);
	        collection.find({ 'team1_key': game.team1_key, 'play_at': game.play_at })
	            .each(function (err, docs) {
	                if (err) { 
	                    response.send({
	                        "meta": utils.createErrorMeta(500, "X_001", "Something went wrong with the MongoDB: " + err),
	                        "response": {}
	                    });
	                } else if (!docs) {
	                	delete game.score1ot;
	                	delete game.score2ot;
	                	delete game.score1p;
	                	delete game.score2p;
	                	game.score1 = 0;
	                	game.score2 = 0;
	                	game.start_at = fileJSON["round"].start_at;
	                	game.end_at = fileJSON["round"].end_at;
                        collection.insert(
                        	game
                        , function (err, docs) {
                            if (err) {
                                response.send({
                                    "meta": utils.createErrorMeta(500, "X_001", "Something went wrong with the MongoDB: " + err),
                                    "response": {}
                                });
                            } else {

                            	var groupsCollection = db.collection(config.groupsCollection);
                            	groupsCollection.find({ teams: game.team1_key })
                            		.each(function (err, docs2) {
		                        		if (err) { 
						                    response.send({
						                        "meta": utils.createErrorMeta(500, "X_001", "Something went wrong with the MongoDB: " + err),
						                        "response": {}
						                    });
						                } else if (!docs2) {
						                	// Add new game to groups.games
						                	docs2[0].games.push(docs[0]._id);
						                	groupsCollection.save(docs2[0]);
						                } else {
						                	alert("Error setting games in group");
		                        		}
		                        });

                                queryById(docs[0]._id, response);
                            }
                        });  
	                } else {
	                    // increase resultAmount so on next iteration the algorithm knows the id was found.
	                    resultAmount++;
	                    response.send({
	                           "meta": utils.createErrorMeta(400, "X_001", "This group already exists. " + err),
	                           "response": {}
	                    });         
	                }
	            });
	    });
	});
}


exports.import_games = function(request, response) {
	for (var i = 1; i < 21; i++) {
		//import_game(i);
	};
	import_game(1);
}



insert_group = function(obj) {
    server.mongoConnectAndAuthenticate(function (err, conn, db) {
        var collection = db.collection(config.groupsCollection);
        collection.find({ 'name': obj.name })
            .each(function (err, docs) {
                if (err) { 
                    response.send({
                        "meta": utils.createErrorMeta(500, "X_001", "Something went wrong with the MongoDB: " + err),
                        "response": {}
                    });
                } else if (!docs) {
                    collection.insert(obj, function (err, docs) {
                        if (err) {
                            response.send({
                                "meta": utils.createErrorMeta(500, "X_001", "Something went wrong with the MongoDB: " + err),
                                "response": {}
                            });
                        } 
                    });  
                } else {
                    // increase resultAmount so on next iteration the algorithm knows the id was found.
                    resultAmount++;
                    response.send({
                           "meta": utils.createErrorMeta(400, "X_001", "This group already exists. " + err),
                           "response": {}
                    });         
                }
            });
	});
}

exports.import_groups = function() {

	server.mongoConnectAndAuthenticate(function (err, conn, db) {
	        var collection = db.collection(config.groupsCollection);
	        collection.remove(function (err, docs) {
	        	if (err) {
	        		console.log("Could not remove old data: " + err);
	        	}
	        });

	// Group A
	insert_group({
                        	teams: ["bra", "cro", "mex", "cmr"],
                        	name: "Group A",
                        	firstToGroup: "1A-2B",
                        	secondToGroup: "1B-2A",
                        	start_at: "2014/06/12",
                        	end_at: "2014/06/23",
                        	games: []

	    });

	// Group B
	insert_group({
                        	teams: ["esp", "ned", "chi", "aus"],
                        	name: "Group B",
                        	firstToGroup: "1B-2A",
                        	secondToGroup: "1A-2B",
                        	start_at: "2014/06/13",
                        	end_at: "2014/06/23",
                        	games: []

	  	});

	// Group C
	insert_group({
                        	teams: ["col", "gre", "civ", "jpn"],
                        	name: "Group C",
                        	firstToGroup: "1C-2D",
                        	secondToGroup: "1D-2C",
                        	start_at: "2014/06/14",
                        	end_at: "2014/06/24",
                        	games: []

	  	});

	// Group D
	insert_group({
                        	teams: ["uru", "crc", "eng", "ita"],
                        	name: "Group D",
                        	firstToGroup: "1D-2C",
                        	secondToGroup: "1C-2D",
                        	start_at: "2014/06/14",
                        	end_at: "2014/06/24",
                        	games: []

	  	});

	// Group E
	insert_group({
                        	teams: ["sui", "ecu", "fra", "hon"],
                        	name: "Group E",
                        	firstToGroup: "1E-2F",
                        	secondToGroup: "1F-2E",
                        	start_at: "2014/06/15",
                        	end_at: "2014/06/25",
                        	games: []

	  	});

	// Group F
	insert_group({
                        	teams: ["arg", "bih", "irn", "nga"],
                        	name: "Group F",
                        	firstToGroup: "1F-2E",
                        	secondToGroup: "1E-2F",
                        	start_at: "2014/06/15",
                        	end_at: "2014/06/25",
                        	games: []

	  	});

	// Group G
	insert_group({
                        	teams: ["ger", "gha", "gha", "usa"],
                        	name: "Group G",
                        	firstToGroup: "1G-2H",
                        	secondToGroup: "1H-2G",
                        	start_at: "2014/06/16",
                        	end_at: "2014/06/26",
                        	games: []

	  	});

	// Group H
	insert_group({
                        	teams: ["bel", "alg", "rus", "kor"],
                        	name: "Group H",
                        	firstToGroup: "1G-2H",
                        	secondToGroup: "1H-2G",
                        	start_at: "2014/06/17",
                        	end_at: "2014/06/26",
                        	games: []

	  	});

	});

	return 0;
}



