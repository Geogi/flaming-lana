 /*
  * Configuration of the URLS
  */
 var base_url = "http://10.221.54.225:8888";
 var getGroupsUrl     = base_url + "/groups/getgroup/";
 var getGamesByGroups = base_url + "/getGamesByGroup";

/*
 * Executes the request to the server.
 */
function  executeRequest(jobject,callback,url)  {
 	var client = Ti.Network.createHTTPClient({
     // function called when the response data is available
     onload : function(e) {
         callback(JSON.parse(this.responseText));
     },
     // function called when an error occurs, including a timeout
     onerror : function(e) {
         alert('Some error occured' + e.error);
     },
     timeout : 5000  // in milliseconds 
    });
     	 // Prepare the connection.
 	client.open("POST", getGroupsUrl);
 	client.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
 	// Send the request.
 	client.send(jobject);
};
 
/*
 * Network API calls
 */
module.exports.getGroups = function getGroups(jobject,callback) { 
	executeRequest(jobject,callback,getGroupsUrl); 
};

module.exports.getGamesByGroup = function getGamesByGroup(jobject,callback) {
	 executeRequest(jobject,callback,getGroupsUrl); 
};