/*
 * Configuration of the URLS
 */
var base_url_andoni  = "http://10.221.54.225:8888";
var base_url         = "http://10.221.54.225:8888";
var getGroupsUrl     = base_url.concat("/groups/getgroups");
var postGroupUrl     = base_url.concat("/groups/getgroup");
var getTeamsUrl      = base_url.concat('/teams/getteams');
var getGamesUrl      = base_url.concat('/games/getgames');
var getGameUrl       = base_url.concat('/games/getgamebyid');
var getGamesByGroupURL  = base_url.concat("/games/getgamesbygroup");


/*
 * Executes the request to the server.
 */
function executeRequest(jobject, callback, url, method) {
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			var replyobject = JSON.parse(this.responseText);
			if (replyobject.meta.code == 200) {
				callback(replyobject.response);
			} else {
				alert('Some error occured meta:: ' + replyobject.meta.message);
			}
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			alert('Some error occured' + e.error);
		},
		timeout : 50000 // in milliseconds
	});
	
	client.open(method, url);
	// Prepare the connection.
	if (method == "GET") {
		client.send();
	} else {
		client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		// Send the request.
		client.send(jobject);
	}
};

/*
 * Network API calls
 */
module.exports.getGroups = function(callback) {
	executeRequest({}, callback, getGroupsUrl, "GET");
};

module.exports.getTeams = function(callback) {
	executeRequest({}, callback, getTeamsUrl, "GET");
};

module.exports.getGamesByGroup = function getGamesByGroup(id, callback) {
	executeRequest(
				{group_name : id}, 
				callback, 
				getGamesByGroupURL,"POST");
};

//module.exports.getGamesByGroup("Group A",function(e){Ti.API.info(e);});

