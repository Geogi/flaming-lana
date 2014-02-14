 var base_url = "http://10.221.54.225:8888";
 var getTeamsUrl = base_url + "/groups/getgroup/";
 
 
 var client = Ti.Network.createHTTPClient({
     // function called when the response data is available
     onload : function(e) {
         Ti.API.info("Received text: " + this.responseText);
         alert(this.responseText);
     },
     // function called when an error occurs, including a timeout
     onerror : function(e) {
         Ti.API.debug(e.error);
         alert('error');
     },
     timeout : 5000  // in milliseconds
 });
 
exports.getTeams = function getTeams(jobject) {
 	 // Prepare the connection.
 		client.open("POST", getTeamsUrl);
 		client.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
 		// Send the request.
 		client.send(jobject);
};
