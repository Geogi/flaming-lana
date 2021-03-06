/*
 * A group object looks as follows:
 *
 *  {
 *      name:     		Name of the group,
        teams:    		Teams in the group,
        firstToGroup:   The winner goes to this group,
        secondToGroup:  The second goes to this group,
        start_at:       Start of the group/round,
        end_at:         End of the group/round,
        games:          the games played by this group 
 *  }
 */


// Finds a group by name in response to POST call
// Returns the group object if found.
exports.getGroupByName = function(request, response) {
    var name = request.body.name;
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
        collection.find({ 'name': name })
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
                    response.send({
                        "meta": utils.createOKMeta(),
                        "response": docs
                    });             
                }
            });
    });
}


// Get all groups
exports.getGroups = function(request, response) {
    // declare external files
    var utils = require("../utils");
    var mongojs = require('mongojs');
    var config = require('../auth/dbconfig');
    var querystring = require('querystring');
    var https = require('https');
    var requestlib = require('request');
    var server = require('../server');

    server.mongoConnectAndAuthenticate(function (err, conn, db) {
        var collection = db.collection(config.groupsCollection);
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
                }
            });
    });
}