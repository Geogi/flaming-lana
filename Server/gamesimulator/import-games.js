var fs = require('fs');
var mongojs = require('mongojs');
var config = require('../auth/dbconfig');
var server = require('../server');
var utils = require('../utils');
var async = require('async');


import_game = function(db, i, index, callback) {
	var fileJSON = require('./data/'+i+'.json');
	//console.log(fileJSON);

	var games = fileJSON["games"];
	var game = games[index];
	console.log("Adding game: "+game.team1_key+" vs "+game.team2_key+" at "+fileJSON["round"].title+" file "+i);
	var gamecollection = db.collection(config.gamesCollection);
    var groupsCollection = db.collection(config.groupsCollection);
    gamecollection.find({ 'team1_key': game.team1_key, 'play_at': game.play_at })
        .each(function (err, docs) {
            if (err) { console.log("Error finding game "+err); return; }
            if (docs) { console.log("Error importing: game already exists: "+docs); return; }
            // Remove garbage input data fields
        	delete game.score1ot;
        	delete game.score2ot;
        	delete game.score1p;
        	delete game.score2p;
        	game.score1 = Math.floor((Math.random()*4));
			game.score2 = Math.floor((Math.random()*4));
        	game.start_at = fileJSON["round"].start_at;
        	game.end_at = fileJSON["round"].end_at;
            gamecollection.insert(game
            	, function (err, ngames) {
                    if (err) { console.log("Error importing game: "+err+" :: "+game.team1_key+" vs "+game.team2_key+" at "+game.start_at); }
                    if (ngames && ngames[0]) {
                    	var game = ngames[0];
                    	groupsCollection.find({ teams: game.team1_key })
                    		.toArray(function (err, groups) {
                        		if (err) { console.log("Error importing game when searching for group of team "+game.team1_key+" "+err); }
				                if (groups && groups[0]) {
				                	// Add new game to groups.games
				                	groups[0].games.push(game._id);
				                	groupsCollection.save(groups[0], function(err, result) {
										if (err) { console.log("Error importing game: "+err); }
				                    	if (index + 1 < games.length) {
				                    		import_game(db, i, index+1, callback);
				                    	} else {
				                    		callback(null, true);
			                    		}
				                    });
				                } else { console.log("Error importing game in group (could not find group for team '"+game.team1_key+"')"); }
                    	});
               		} else { console.log("failed to add "+ngames); }
            	}); 
    });
}

import_game_round2_matches = function(db, game, callback) {
	var groupsCollection = db.collection(config.groupsCollection);
	groupsCollection.find({ 'teams': game.team1_key })
			.toArray(function (err, groups) {
		   		if (err) { console.log("Error game round2 matches "+err);
		   		} else if (groups && groups[0]) {
					console.log("Adding game "+game._id+" "+game.team1_key+"-"+game.team2_key+" to group "+groups[0].name);
		   			groups[0].games.push(game._id);
                	groupsCollection.save(groups[0], function(err, result) {
						if (err) { console.log("Error game round 3 - "+err); }
                    	callback(err, groups[0]);
                    });
                } else { console.log("Did not find group for team "+game.team1_key); }
            });
}

import_game_round2 = function(db, callback) {
	var collection = db.collection(config.gamesCollection);
	var games = [{
				'team1_key': '1A',
				'team1_title': 'First team of Group A',
				'team1_code': '1A',
				'team2_key': '2B',
				'team2_title': 'Second team of Group B',
				'team2_code': '2B',
				'play_at': '2014/06/28'
			}, {
				'team1_key': '1C',
				'team1_title': 'First team of Group C',
				'team1_code': '1C',
				'team2_key': '2D',
				'team2_title': 'Second team of Group D',
				'team2_code': '2D',
				'play_at': '2014/06/28'
			}, {
				'team1_key': '1E',
				'team1_title': 'First team of Group E',
				'team1_code': '1E',
				'team2_key': '2F',
				'team2_title': 'Second team of Group F',
				'team2_code': '2F',
				'play_at': '2014/06/30'
			}, {
				'team1_key': '1G',
				'team1_title': 'First team of Group G',
				'team1_code': '1G',
				'team2_key': '2H',
				'team2_title': 'Second team of Group H',
				'team2_code': '2H',
				'play_at': '2014/06/30'
			}, {
				'team1_key': '1B',
				'team1_title': 'First team of Group B',
				'team1_code': '1B',
				'team2_key': '2A',
				'team2_title': 'Second team of Group A',
				'team2_code': '2A',
				'play_at': '2014/06/29'
			}, {
				'team1_key': '1D',
				'team1_title': 'First team of Group D',
				'team1_code': '1D',
				'team2_key': '2C',
				'team2_title': 'Second team of Group C',
				'team2_code': '2C',
				'play_at': '2014/06/29'
			}, {
				'team1_key': '1F',
				'team1_title': 'First team of Group F',
				'team1_code': '1F',
				'team2_key': '2E',
				'team2_title': 'Second team of Group E',
				'team2_code': '2E',
				'play_at': '2014/07/01'
			}, {
				'team1_key': '1H',
				'team1_title': 'First team of Group H',
				'team1_code': '1H',
				'team2_key': '2G',
				'team2_title': 'Second team of Group G',
				'team2_code': '2G',
				'play_at': '2014/07/01'
			}, {
				'team1_key': 'W49',
				'team1_title': 'Winner of 1A and 2B',
				'team1_code': 'W49',
				'team2_key': 'W50',
				'team2_title': 'Winner of 1C and 2D',
				'team2_code': 'W50',
				'play_at': '2014/07/04'
			}, {
				'team1_key': 'W53',
				'team1_title': 'Winner of 1E and 2F',
				'team1_code': 'W53',
				'team2_key': 'W54',
				'team2_title': 'Winner of 1G and 2H',
				'team2_code': 'W54',
				'play_at': '2014/07/04'
			}, {
				'team1_key': 'W51',
				'team1_title': 'Winner of 1B and 2A',
				'team1_code': 'W51',
				'team2_key': 'W52',
				'team2_title': 'Winner of 1D and 2C',
				'team2_code': 'W52',
				'play_at': '2014/07/04'
			}, {
				'team1_key': 'W55',
				'team1_title': 'Winner of 1F and 2E',
				'team1_code': 'W55',
				'team2_key': 'W56',
				'team2_title': 'Winner of 1H and 2G',
				'team2_code': 'W56',
				'play_at': '2014/07/05'
			}, {
				'team1_key': 'W57',
				'team1_title': 'Winner of W49 and W50',
				'team1_code': 'W57',
				'team2_key': 'W58',
				'team2_title': 'Winner of W53 and W54',
				'team2_code': 'W58',
				'play_at': '2014/07/08'
			}, {
				'team1_key': 'W59',
				'team1_title': 'Winner of W51 and W52',
				'team1_code': 'W59',
				'team2_key': 'W60',
				'team2_title': 'Winner of W55 and W56',
				'team2_code': 'W60',
				'play_at': '2014/07/09'
			}, {
				'team1_key': 'W61',
				'team1_title': 'Winner of W57 and W58',
				'team1_code': 'W61',
				'team2_key': 'W62',
				'team2_title': 'Winner of W59 and W60',
				'team2_code': 'W62',
				'play_at': '2014/07/13'
			}, {
				'team1_key': 'L61',
				'team1_title': 'Winner of W57 and W58',
				'team1_code': 'L61',
				'team2_key': 'L62',
				'team2_title': 'Winner of W59 and W60',
				'team2_code': 'L62',
				'play_at': '2014/07/12'
			}];
	async.eachSeries(games, function(game, callback) {
		game.score1 = Math.floor((Math.random()*4));
		game.score2 = Math.floor((Math.random()*4));
		game.start_at = game.play_at;
		game.end_at = game.play_at;
		collection.insert(game, function (err, ngames) {
			if (err) { console.log("Error inserting game: "+game+" -- "+err); }
			import_game_round2_matches(db, ngames[0], callback);
		});
	});
}


import_games = function(db, callback) {
    var collection = db.collection(config.gamesCollection);
    collection.remove(function (err, docs) {
    	if (err) { console.log("Could not remove old data: " + err); }
    	// Group 1 (Using json file)
    	async.timesSeries(15, function(n, callback2) {
			import_game(db,n+1,0,function(err,val) {
				callback2(err, val);
			});
    	// Group 2 (Using function)
    	}, function(err, vals) {
    		if (err) { console.log("Could not remove old data: " + err); }
    		import_game_round2(db, callback);
    	});
    });
}


import_groups = function(db, callback) {
    var collection = db.collection(config.groupsCollection);
    collection.remove(function (err, docs) {
    	if (err) {
    		console.log("Could not remove old data: " + err);
    	}
		var groups = [
		{
			// Group A
	    	teams: ["bra", "cro", "mex", "cmr"],
	    	name: "Group A",
	    	firstToGroup: "1A-2B",
	    	secondToGroup: "1B-2A",
	    	start_at: "2014/06/12",
	    	end_at: "2014/06/23",
	    	games: []
	    }, {
			// Group B
	    	teams: ["esp", "ned", "chi", "aus"],
	    	name: "Group B",
	    	firstToGroup: "1B-2A",
	    	secondToGroup: "1A-2B",
	    	start_at: "2014/06/13",
	    	end_at: "2014/06/23",
	    	games: []
		}, {
			// Group C
	    	teams: ["col", "gre", "civ", "jpn"],
	    	name: "Group C",
	    	firstToGroup: "1C-2D",
	    	secondToGroup: "1D-2C",
	    	start_at: "2014/06/14",
	    	end_at: "2014/06/24",
	    	games: []
	  	}, {
			// Group D
			teams: ["uru", "crc", "eng", "ita"],
	    	name: "Group D",
	    	firstToGroup: "1D-2C",
	    	secondToGroup: "1C-2D",
	    	start_at: "2014/06/14",
	    	end_at: "2014/06/24",
	    	games: []
	    }, {
			// Group E
			teams: ["sui", "ecu", "fra", "hon"],
	    	name: "Group E",
	    	firstToGroup: "1E-2F",
	    	secondToGroup: "1F-2E",
	    	start_at: "2014/06/15",
	    	end_at: "2014/06/25",
	    	games: []

		}, {
	    	teams: ["arg", "bih", "irn", "nga"],
	    	name: "Group F",
	    	firstToGroup: "1F-2E",
	    	secondToGroup: "1E-2F",
	    	start_at: "2014/06/15",
	    	end_at: "2014/06/25",
	    	games: []

		}, {
			teams: ["ger", "por", "gha", "usa"],
	    	name: "Group G",
	    	firstToGroup: "1G-2H",
	    	secondToGroup: "1H-2G",
	    	start_at: "2014/06/16",
	    	end_at: "2014/06/26",
	    	games: []
	    }, {
	    	teams: ["bel", "alg", "rus", "kor"],
	    	name: "Group H",
	    	firstToGroup: "1G-2H",
	    	secondToGroup: "1H-2G",
	    	start_at: "2014/06/17",
	    	end_at: "2014/06/26",
	    	games: []
		}, {
	    	teams: ["1A", "2A", "1B", "2B", "1C", "2C", "1D", "2D", "1E", "2E", "1F", "2F", "1G", "1H", "2H"],
	    	name: "Round of 16",
	    	firstToGroup: "",
	    	start_at: "2014/06/28",
	    	end_at: "2014/06/30",
	    	games: []
		}, {
	    	teams: ["W49", "W50", "W51", "W52", "W53", "W54", "W55", "W56"],
	    	name: "Quarter-finals",
	    	start_at: "2014/07/04",
	    	end_at: "2014/07/04",
	    	games: []
		}, {
	    	teams: ["W57", "W58", "W59", "W60"],
	    	name: "Semi-finals",
	    	start_at: "2014/07/08",
	    	end_at: "2014/07/09",
	    	games: []
	  	}, {
	    	teams: ["W61", "W62", "L61", "L62"],
	    	name: "Final",
	    	start_at: "2014/07/13",
	    	end_at: "2014/07/13",
	    	games: []
		}];
		async.each(groups, function(group, callback) {
			collection.insert(group, function (err, docs) {
    			if (err) { console.log("Error inserting group: "+group+" -- "+err); }
                callback(err, group);
            });
        }, callback);
	});
}

import_bet = function(db, user_id, callback) {
    var betsCollection = db.collection(config.betsCollection);
    var gamesCollection = db.collection(config.gamesCollection);
    gamesCollection.find()
    	.toArray(function (err, games) {
    		for (var i = 0; i < games.length; i++) {
    			games[i].game_id = games[i]._id;
    			games[i].score_1 = Math.floor((Math.random()*4));
    			games[i].score_2 = Math.floor((Math.random()*4));
    		};
			var bet = {
				'user_id': user_id,
				'amount': 500,
				'bets': games
			};
			betsCollection.insert(bet, function (err, nbets) {
				if (err) { console.log("Error inserting bet: "+bet); };
				callback(err, user_id);
			})});
}

import_users = function(db, callback) {
    var userscollection = db.collection(config.usersCollection);
    var betsCollection = db.collection(config.betsCollection);
    userscollection.remove(function (err, docs) {
    	if (err) { console.log("Could not remove old data: " + err); }
    	betsCollection.remove(function (err, docs) {
	      	if (err) { console.log("Could not remove old data: " + err); }
	      	var users = [
	      		{ 'username': 'Lode' },
				{ 'username': 'Christophe' },
				{ 'username': 'Elisa' },
				{ 'username': 'Nicolas' },
				{ 'username': 'Andoni' }
	      	]
			async.each(users, function(user, callback) {
				userscollection.insert(user, function (err, docs) {
					if (err) { console.log("Error inserting user: "+user+" -- "+err); }
					import_bet(db, user._id, callback);
		        });
		    }, callback);
		});
    });
}

exports.import_all = function(callback) {
	server.mongoConnectAndAuthenticate(function (err, conn, db) {
		async.applyEachSeries([
				import_groups,
				import_games,
				import_users
			], db, callback);
	});
};



