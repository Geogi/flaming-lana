var dbname = "MobilePolla";

// Define collection names here...
var teamsCollection = "mobilepolla_teams";
var groupsCollection = "mobilepolla_groups";
var gamesCollection = "mobilepolla_games";
var betsCollection = "mobilepolla_bets";
var usersCollection = "mobilepolla_users";


// In case of local MongoDB, use the default port for a MongoDB. Change this if your config is different.
var mongourl = "mongodb://localhost:27017";

var secret = "xxxxxxxx";


exports.dbname = dbname;
exports.mongourl = mongourl;
exports.teamsCollection = teamsCollection;
exports.groupsCollection = groupsCollection;
exports.gamesCollection = gamesCollection;
exports.betsCollection = betsCollection;
exports.usersCollection = usersCollection;
