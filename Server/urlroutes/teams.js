/*
 * A team object looks as follows:
 *
 *  {
 *      name:     	Name of the team,
        games:    	Games of the team,
        key:  		Short name of the team
 *  }
 */


 // Get all teams
exports.getTeams = function(request, response) {
    // declare external files
    var utils = require("../utils");
    var mongojs = require('mongojs');
    var config = require('../auth/dbconfig');
    var querystring = require('querystring');
    var https = require('https');
    var requestlib = require('request');
    var server = require('../server');

    server.mongoConnectAndAuthenticate(function (err, conn, db) {
        var collection = db.collection(config.teamsCollection);
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
            	};
            });
    });
}