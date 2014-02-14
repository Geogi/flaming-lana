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

import_game = function(db, i, index, callback) {
	var fileJSON = require('./data/'+i+'.json');
	//console.log(fileJSON);

	var games = fileJSON["games"];
	var game = games[index];
	console.log("Adding game: "+game.team1_key+" vs "+game.team2_key+" at "+fileJSON["round"].title+" file "+i);
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
	                	game.score1 = Math.floor((Math.random()*4));
						game.score2 = Math.floor((Math.random()*4));
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
						                    		import_game(db, i, index+1, callback);
						                    	} else {
						                    		if (callback) {
							                    		callback();   
						                    		}       
						                    	}         
						                    });
						                } else {
						                	console.log("Error setting ngames in group (could not find group for team '"+game.team1_key+"')");
		                        		}
		                        });
                            } else {
                            	console.log("failed to add "+ngames);
                            }
                        });  
	                }
	            });
}

import_game_round2 = function(db, callback) {
	var collection = db.collection(config.gamesCollection);

	var game = { 'team1_key': '1A',
				'team1_title': 'First team of Group A',
				'team1_code': '1A',
				'team2_key': '2B',
				'team2_title': 'Second team of Group B',
				'team2_code': '2B',
				'play_at': '2014/06/28',
				'score1': Math.floor((Math.random()*4)),
				'score2': Math.floor((Math.random()*4))
	};
	game.start_at = game.play_at;
	game.end_at = game.play_at;
	collection.insert(game, function (err, ngames) {
		if (err) { console.log("Error inserting game: "+game); };
		game = { 'team1_key': '1C',
				'team1_title': 'First team of Group C',
				'team1_code': '1C',
				'team2_key': '2D',
				'team2_title': 'Second team of Group D',
				'team2_code': '2D',
				'play_at': '2014/06/28',
				'score1': Math.floor((Math.random()*4)),
				'score2': Math.floor((Math.random()*4))
		};
		game.start_at = game.play_at;
		game.end_at = game.play_at;
		collection.insert(game, function (err, ngames) {
			if (err) { console.log("Error inserting game: "+game); };
			game = { 'team1_key': '1E',
					'team1_title': 'First team of Group E',
					'team1_code': '1E',
					'team2_key': '2F',
					'team2_title': 'Second team of Group F',
					'team2_code': '2F',
					'play_at': '2014/06/30',
					'score1': Math.floor((Math.random()*4)),
					'score2': Math.floor((Math.random()*4))
				};
			game.start_at = game.play_at;
			game.end_at = game.play_at;
			collection.insert(game, function (err, ngames) {
				if (err) { console.log("Error inserting game: "+game); };
				game = { 'team1_key': '1G',
						'team1_title': 'First team of Group G',
						'team1_code': '1G',
						'team2_key': '2H',
						'team2_title': 'Second team of Group H',
						'team2_code': '2H',
						'play_at': '2014/06/30',
						'score1': Math.floor((Math.random()*4)),
						'score2': Math.floor((Math.random()*4))
					};
				game.start_at = game.play_at;
				game.end_at = game.play_at;
				collection.insert(game, function (err, ngames) {
					if (err) { console.log("Error inserting game: "+game); };
					game = { 'team1_key': '1B',
							'team1_title': 'First team of Group B',
							'team1_code': '1B',
							'team2_key': '2A',
							'team2_title': 'Second team of Group A',
							'team2_code': '2A',
							'play_at': '2014/06/29',
							'score1': Math.floor((Math.random()*4)),
							'score2': Math.floor((Math.random()*4))
						};
					game.start_at = game.play_at;
					game.end_at = game.play_at;
					collection.insert(game, function (err, ngames) {
						if (err) { console.log("Error inserting game: "+game); };
						game = { 'team1_key': '1D',
								'team1_title': 'First team of Group D',
								'team1_code': '1D',
								'team2_key': '2C',
								'team2_title': 'Second team of Group C',
								'team2_code': '2C',
								'play_at': '2014/06/29',
								'score1': Math.floor((Math.random()*4)),
								'score2': Math.floor((Math.random()*4))
							};
						game.start_at = game.play_at;
						game.end_at = game.play_at;
						collection.insert(game, function (err, ngames) {
							if (err) { console.log("Error inserting game: "+game); };
							game = { 'team1_key': '1F',
									'team1_title': 'First team of Group F',
									'team1_code': '1F',
									'team2_key': '2E',
									'team2_title': 'Second team of Group E',
									'team2_code': '2E',
									'play_at': '2014/07/01',
									'score1': Math.floor((Math.random()*4)),
									'score2': Math.floor((Math.random()*4))
								};
							game.start_at = game.play_at;
							game.end_at = game.play_at;
							collection.insert(game, function (err, ngames) {
								if (err) { console.log("Error inserting game: "+game); };
								game = { 'team1_key': '1H',
										'team1_title': 'First team of Group H',
										'team1_code': '1H',
										'team2_key': '2G',
										'team2_title': 'Second team of Group G',
										'team2_code': '2G',
										'play_at': '2014/07/01',
										'score1': Math.floor((Math.random()*4)),
										'score2': Math.floor((Math.random()*4))
									};
								game.start_at = game.play_at;
								game.end_at = game.play_at;
								collection.insert(game, function (err, ngames) {
									if (err) { console.log("Error inserting game: "+game); };
									game = { 'team1_key': 'W49',
											'team1_title': 'Winner of 1A and 2B',
											'team1_code': 'W49',
											'team2_key': 'W50',
											'team2_title': 'Winner of 1C and 2D',
											'team2_code': 'W50',
											'play_at': '2014/07/04',
											'score1': Math.floor((Math.random()*4)),
											'score2': Math.floor((Math.random()*4))
										};
									game.start_at = game.play_at;
									game.end_at = game.play_at;
									collection.insert(game, function (err, ngames) {
										if (err) { console.log("Error inserting game: "+game); };
										game = { 'team1_key': 'W53',
												'team1_title': 'Winner of 1E and 2F',
												'team1_code': 'W53',
												'team2_key': 'W54',
												'team2_title': 'Winner of 1G and 2H',
												'team2_code': 'W54',
												'play_at': '2014/07/04',
												'score1': Math.floor((Math.random()*4)),
												'score2': Math.floor((Math.random()*4))
											};
										game.start_at = game.play_at;
										game.end_at = game.play_at;
										collection.insert(game, function (err, ngames) {
											if (err) { console.log("Error inserting game: "+game); };
											game = { 'team1_key': 'W51',
													'team1_title': 'Winner of 1B and 2A',
													'team1_code': 'W51',
													'team2_key': 'W52',
													'team2_title': 'Winner of 1D and 2C',
													'team2_code': 'W52',
													'play_at': '2014/07/04',
													'score1': Math.floor((Math.random()*4)),
													'score2': Math.floor((Math.random()*4))
												};
											game.start_at = game.play_at;
											game.end_at = game.play_at;
											collection.insert(game, function (err, ngames) {
												if (err) { console.log("Error inserting game: "+game); };
												game = { 'team1_key': 'W55',
														'team1_title': 'Winner of 1F and 2E',
														'team1_code': 'W55',
														'team2_key': 'W56',
														'team2_title': 'Winner of 1H and 2G',
														'team2_code': 'W56',
														'play_at': '2014/07/05',
														'score1': Math.floor((Math.random()*4)),
														'score2': Math.floor((Math.random()*4))
													};
												game.start_at = game.play_at;
												game.end_at = game.play_at;
												collection.insert(game, function (err, ngames) {
													if (err) { console.log("Error inserting game: "+game); };
													game = { 'team1_key': 'W57',
															'team1_title': 'Winner of W49 and W50',
															'team1_code': 'W57',
															'team2_key': 'W58',
															'team2_title': 'Winner of W53 and W54',
															'team2_code': 'W58',
															'play_at': '2014/07/08',
															'score1': Math.floor((Math.random()*4)),
															'score2': Math.floor((Math.random()*4))
														};
													game.start_at = game.play_at;
													game.end_at = game.play_at;
													collection.insert(game, function (err, ngames) {
														if (err) { console.log("Error inserting game: "+game); };
														game = { 'team1_key': 'W61',
																'team1_title': 'Winner of W57 and W58',
																'team1_code': 'W61',
																'team2_key': 'W62',
																'team2_title': 'Winner of W59 and W60',
																'team2_code': 'W62',
																'play_at': '2014/07/13',
																'score1': Math.floor((Math.random()*4)),
																'score2': Math.floor((Math.random()*4))
															};
														game.start_at = game.play_at;
														game.end_at = game.play_at;
														collection.insert(game, function (err, ngames) {
															if (err) { console.log("Error inserting game: "+game); };
															game = { 'team1_key': 'L61',
																	'team1_title': 'Winner of W57 and W58',
																	'team1_code': 'L61',
																	'team2_key': 'L62',
																	'team2_title': 'Winner of W59 and W60',
																	'team2_code': 'L62',
																	'play_at': '2014/07/12',
																	'score1': Math.floor((Math.random()*4)),
																	'score2': Math.floor((Math.random()*4))
																};
															game.start_at = game.play_at;
															game.end_at = game.play_at;
															collection.insert(game, function (err, ngames) {
																if (err) { console.log("Error inserting game: "+game); };
																callback();
															})})})})})})})})})})})})})})});

}


import_games = function(callback) {
	server.mongoConnectAndAuthenticate(function (err, conn, db) {
	        var collection = db.collection(config.gamesCollection);
	        collection.remove(function (err, docs) {
	        	if (err) {
	        		console.log("Could not remove old data: " + err);
	        	}
				import_game(db,1,0,function() {
				import_game(db,2,0,function() {
				import_game(db,3,0,function() {
				import_game(db,4,0,function() {
				import_game(db,5,0,function() {
				import_game(db,6,0,function() {
				import_game(db,7,0,function() {
				import_game(db,8,0,function() {
				import_game(db,9,0,function() {
				import_game(db,10,0,function() {
				import_game(db,11,0,function() {
				import_game(db,12,0,function() {
				import_game(db,13,0,function() {
				import_game(db,14,0,function() {
				import_game(db,15,0,function() {
				import_game_round2(db, callback); })})})})})})})})})})})})})});
	        });
	    });
	  });
}



insert_group = function(db, obj, callback) {
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
	insert_group(db, {
                        	teams: ["bra", "cro", "mex", "cmr"],
                        	name: "Group A",
                        	firstToGroup: "1A-2B",
                        	secondToGroup: "1B-2A",
                        	start_at: "2014/06/12",
                        	end_at: "2014/06/23",
                        	games: []

	    }, function() {

	// Group B
	insert_group(db, {
                        	teams: ["esp", "ned", "chi", "aus"],
                        	name: "Group B",
                        	firstToGroup: "1B-2A",
                        	secondToGroup: "1A-2B",
                        	start_at: "2014/06/13",
                        	end_at: "2014/06/23",
                        	games: []

	  	}, function() {

	// Group C
	insert_group(db, {
                        	teams: ["col", "gre", "civ", "jpn"],
                        	name: "Group C",
                        	firstToGroup: "1C-2D",
                        	secondToGroup: "1D-2C",
                        	start_at: "2014/06/14",
                        	end_at: "2014/06/24",
                        	games: []

	  	}, function() {

	// Group D
	insert_group(db, {
                        	teams: ["uru", "crc", "eng", "ita"],
                        	name: "Group D",
                        	firstToGroup: "1D-2C",
                        	secondToGroup: "1C-2D",
                        	start_at: "2014/06/14",
                        	end_at: "2014/06/24",
                        	games: []

	  	}, function() {

	// Group E
	insert_group(db, {
                        	teams: ["sui", "ecu", "fra", "hon"],
                        	name: "Group E",
                        	firstToGroup: "1E-2F",
                        	secondToGroup: "1F-2E",
                        	start_at: "2014/06/15",
                        	end_at: "2014/06/25",
                        	games: []

	  	}, function() {

	// Group F
	insert_group(db, {
                        	teams: ["arg", "bih", "irn", "nga"],
                        	name: "Group F",
                        	firstToGroup: "1F-2E",
                        	secondToGroup: "1E-2F",
                        	start_at: "2014/06/15",
                        	end_at: "2014/06/25",
                        	games: []

	  	}, function() {

	// Group G
	insert_group(db, {
                        	teams: ["ger", "por", "gha", "usa"],
                        	name: "Group G",
                        	firstToGroup: "1G-2H",
                        	secondToGroup: "1H-2G",
                        	start_at: "2014/06/16",
                        	end_at: "2014/06/26",
                        	games: []

	  	}, function() {

	// Group H
	insert_group(db, {
                        	teams: ["bel", "alg", "rus", "kor"],
                        	name: "Group H",
                        	firstToGroup: "1G-2H",
                        	secondToGroup: "1H-2G",
                        	start_at: "2014/06/17",
                        	end_at: "2014/06/26",
                        	games: []

	  	}, function() {

	// Round of 16
	insert_group(db, {
                        	teams: ["1A", "2A", "1B", "2B", "1C", "2C", "1D", "2D", "1E", "2E", "1F", "2F", "1G", "1H", "2H"],
                        	name: "Round of 16",
                        	firstToGroup: "",
                        	start_at: "2014/06/28",
                        	end_at: "2014/06/30",
                        	games: []

	  	}, function() {

	// Quarter-finals
	insert_group(db, {
                        	teams: ["W49", "W50", "W51", "W52", "W53", "W54", "W55", "W56"],
                        	name: "Quarter-finals",
                        	start_at: "2014/07/04",
                        	end_at: "2014/07/04",
                        	games: []

	  	}, function() {

	// Semi-finals
	insert_group(db, {
                        	teams: ["W57", "W58", "W59", "W60"],
                        	name: "Semi-finals",
                        	start_at: "2014/07/08",
                        	end_at: "2014/07/09",
                        	games: []

	  	}, function() {

	// Final
	insert_group(db, {
                        	teams: ["W61", "W62", "L61", "L62"],
                        	name: "Final",
                        	start_at: "2014/07/13",
                        	end_at: "2014/07/13",
                        	games: []

	  	}, callback)})})})})})})})})})})});


	});


	return 0;
}

import_bet = function(user_id, db, callback) {
	server.mongoConnectAndAuthenticate(function (err, conn, db) {
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
						if (callback)
							callback();
					})});
		});
}

import_users = function(callback) {
	server.mongoConnectAndAuthenticate(function (err, conn, db) {
	        var collection = db.collection(config.usersCollection);
	        collection.remove(function (err, docs) {
	        	if (err) {
	        		console.log("Could not remove old data: " + err);
	        	}
	        	var betsCollection = db.collection(config.betsCollection);
	        	betsCollection.remove(function (err, docs) {
		        	if (err) {
		        		console.log("Could not remove old data: " + err);
		        	}
					var user = { 'username': 'Lode' };
					collection.insert(user, function (err, nusers) {
						if (err) { console.log("Error inserting user: "+user); };
						import_bet(nusers[0]._id, db, function() {
							user = { 'username': 'Christophe' };
							collection.insert(user, function (err, nusers) {
								if (err) { console.log("Error inserting user: "+user); };
								import_bet(nusers[0]._id, db, function() {
									user = { 'username': 'Elisa' };
									collection.insert(user, function (err, nusers) {
										if (err) { console.log("Error inserting user: "+user); };
										import_bet(nusers[0]._id, db, function() {
											user = { 'username': 'Nicolas' };
											collection.insert(user, function (err, nusers) {
												if (err) { console.log("Error inserting user: "+user); };
												import_bet(nusers[0]._id, db, function() {
													user = { 'username': 'Andoni' };
													collection.insert(user, function (err, nusers) {
														if (err) { console.log("Error inserting user: "+user); };
														if (callback)
															callback();
													})})})})})})})})})})});
		});
}


exports.import_all = function(callback) {
	import_groups(
		import_games(
			import_users(
				callback)));
};



