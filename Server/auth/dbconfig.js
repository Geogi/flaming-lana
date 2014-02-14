var dbname = "MobilePolla";

// Define collection names here...
var teamsCollection = "mobilepolla_teams";
var groupsCollection = "mobilepolla_groups";
var roundsCollection = "mobilepolla_rounds";
var gamesCollection = "mobilepolla_games";


// In case of local MongoDB, use the default port for a MongoDB. Change this if your config is different.
var mongourl = "mongodb://localhost:27017";

var secret = "xxxxxxxx";


exports.dbname = dbname;
exports.teamsCollection = teamsCollection;
exports.groupsCollection = groupsCollection;
exports.roundsCollection = roundsCollection;
exports.gamesCollection = gamesCollection;
