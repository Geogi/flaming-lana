var WebSocketServer = require('ws').Server
var express = require("express");
var utils = require("./utils");
var moment = require('moment');
var config = require("./auth/dbconfig.js");
var data_import = require("./gamesimulator/import-games.js");
var sleep = require('sleep');

// Project-specific modules
var groups = require("./urlroutes/groups");
var teams = require("./urlroutes/teams");
var games = require("./urlroutes/games");
var bets = require("./urlroutes/bets");


// use express and its bodyParser for POST requests.
var app = express();
app.use(express.bodyParser());

// prevent server death in case of uncaught exceptions
process.on('uncaughtException', function (exception) {
    console.log(exception);
});

/**
 * Check if there is a process.env db config (such as on Heroku) that stores the URL to the MongoDB.
 * If not, use the direct URL to a mongoDB stored in the db config.
 * Change to the correct provider (here example is MONGOHQ_URL).
 */
var mongourl;
if (process.env.MONGOHQ_URL) {
     mongourl = process.env.MONGOHQ_URL;
}
else {
    mongourl = config.mongourl;
}


exports.mongourl = mongourl;


// This function can be used to open a connection to the MongoDB.
// In case of a succesful connect or an error, the callback is called.
// In the first case the opened db is passed as a parameter.
function mongoConnectAndAuthenticate(callback) {
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(mongourl, function(err, db) {
        // ADD YOUR COLLECTIONS AND INDEXES ON THEM HERE TO MAKE SURE THEY'RE ALWAYS THERE
        (db.collection(config.groupsCollection)).ensureIndex( { name: 1 }, function(err, idxName) {
            (db.collection(config.teamsCollection)).ensureIndex( { shortName: 1 }, function(err, idxName) {
                //(db.collection(config.roundsCollection)).ensureIndex( { pos: 1 }, function(err, idxName) {
                    (db.collection(config.gamesCollection)).ensureIndex( { team1_key: 1, team2_key: 1 }, function(err, idxName) {
                if (err) {
                    console.log(err);
                }
                callback(err, null, db);
            });
            //});
            });
        });
    });
}

exports.mongoConnectAndAuthenticate = mongoConnectAndAuthenticate;


// INSERT INITIAL GAMES DATA
data_import.import_groups();
data_import.import_games();


// define the users API url routes.
//app.post("/users/login", users.login);
//app.get("/users/penis", users.getPenis);

// GROUPS

app.post("/groups/getgroup", groups.getGroupByName);
app.get("/groups/getgroups", groups.getGroups);

// TEAMS

app.get("/teams/getteams", teams.getTeams);

// GAMES

app.get("/games/getgames", games.getGames);
app.get("/games/getgamesbygroup", games.getGamesByGroup);

// BETS

app.post("/bets/postbet", bets.postBet);




app.use(express.static(__dirname + '/clientpage'));


// start server on port 8888 OR on the port in the cloud deployment config.
console.log("Listening on port " + (process.env.PORT || 8888) +  "...");
app.listen(process.env.PORT || 8888);




