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

import_game = function(i, index, callback) {
	var fileJSON = require('./data/'+i+'.json');
	//console.log(fileJSON);

	var games = fileJSON["games"];
	var game = games[index];
	console.log("Adding game: "+game.team1_key+" vs "+game.team2_key+" at "+fileJSON["round"].title+" file "+i);
	server.mongoConnectAndAuthenticate(function (err, conn, db) {
	        var collection = db.collection(config.gamesCollection);
	        collection.find({ 'team1_key': game.team1_key, 'play_at': game.play_at })
	            .each(function (err, docs) {
	                if (err) { 
	                    console.log("Error IMPORT 5: "+err);
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
                        , function (err, ngames) {
                            if (err) {
	                    		console.log("Error IMPORT 4: "+err+" :: "+game.team1_key+" vs "+game.team2_key+" at "+game.start_at);
                            } else if (ngames && ngames[0]) {
                            	var game = ngames[0];
                            	var groupsCollection = db.collection(config.groupsCollection);
                            	groupsCollection.find({ teams: game.team1_key})
                            		.toArray(function (err, groups) {
		                        		if (err) { 
	                    					console.log("Error IMPORT 3");
						                } else if (groups && groups[0]) {
						                	// Add new game to groups.games
						                	groups[0].games.push(game._id);
						                	groupsCollection.save(groups[0], function(err, result) {
												if (err) { 
	                    							console.log("Error IMPORT 2");
						                    	}
						                    	if (index + 1 < games.length) {
						                    		import_game(i, index+1, callback);
						                    	} else {
						                    		callback();           
						                    	}         
						                    });
						                } else {
                            				console.log(game);
						                	console.log("Error setting ngames in group (could not find group for team '"+game.team1_key+"')");
		                        		}
		                        });
                            } else {
                            	console.log("failed to add "+game);
                            }
                        });  
	                }
	            });
	    });
}


import_games = function(callback) {
	server.mongoConnectAndAuthenticate(function (err, conn, db) {
	        var collection = db.collection(config.gamesCollection);
	        collection.remove(function (err, docs) {
	        	if (err) {
	        		console.log("Could not remove old data: " + err);
	        	}
				import_game(1,0,function() {
				import_game(2,0,function() {
				import_game(3,0,function() {
				import_game(4,0,function() {
				import_game(5,0,function() {
				import_game(6,0,function() {
				import_game(7,0,function() {
				import_game(8,0,function() {
				import_game(9,0,function() {
				import_game(10,0,function() {
				import_game(11,0,function() {
				import_game(12,0,function() {
				import_game(13,0,function() {
				import_game(14,0,function() {
				import_game(15,0, callback); })})})})})})})})})})})})})});
	        });
	    });
}



insert_group = function(obj, callback) {
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
                        callback();
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

import_groups = function(callback) {

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

	    }, function() {

	// Group B
	insert_group({
                        	teams: ["esp", "ned", "chi", "aus"],
                        	name: "Group B",
                        	firstToGroup: "1B-2A",
                        	secondToGroup: "1A-2B",
                        	start_at: "2014/06/13",
                        	end_at: "2014/06/23",
                        	games: []

	  	}, function() {

	// Group C
	insert_group({
                        	teams: ["col", "gre", "civ", "jpn"],
                        	name: "Group C",
                        	firstToGroup: "1C-2D",
                        	secondToGroup: "1D-2C",
                        	start_at: "2014/06/14",
                        	end_at: "2014/06/24",
                        	games: []

	  	}, function() {

	// Group D
	insert_group({
                        	teams: ["uru", "crc", "eng", "ita"],
                        	name: "Group D",
                        	firstToGroup: "1D-2C",
                        	secondToGroup: "1C-2D",
                        	start_at: "2014/06/14",
                        	end_at: "2014/06/24",
                        	games: []

	  	}, function() {

	// Group E
	insert_group({
                        	teams: ["sui", "ecu", "fra", "hon"],
                        	name: "Group E",
                        	firstToGroup: "1E-2F",
                        	secondToGroup: "1F-2E",
                        	start_at: "2014/06/15",
                        	end_at: "2014/06/25",
                        	games: []

	  	}, function() {

	// Group F
	insert_group({
                        	teams: ["arg", "bih", "irn", "nga"],
                        	name: "Group F",
                        	firstToGroup: "1F-2E",
                        	secondToGroup: "1E-2F",
                        	start_at: "2014/06/15",
                        	end_at: "2014/06/25",
                        	games: []

	  	}, function() {

	// Group G
	insert_group({
                        	teams: ["ger", "por", "gha", "usa"],
                        	name: "Group G",
                        	firstToGroup: "1G-2H",
                        	secondToGroup: "1H-2G",
                        	start_at: "2014/06/16",
                        	end_at: "2014/06/26",
                        	games: []

	  	}, function() {

	// Group H
	insert_group({
                        	teams: ["bel", "alg", "rus", "kor"],
                        	name: "Group H",
                        	firstToGroup: "1G-2H",
                        	secondToGroup: "1H-2G",
                        	start_at: "2014/06/17",
                        	end_at: "2014/06/26",
                        	games: []

	  	}, callback)})})})})})})});


	});


	return 0;
}


exports.import_all = function(callback) {
	import_groups(function() {
		import_games(callback)
	});
};





