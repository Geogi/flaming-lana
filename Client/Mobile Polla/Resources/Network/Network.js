 /*
  * Configuration of the URLS
  */
 var base_url = "http://10.221.54.225:8888";
 var getGroupsUrl     = base_url.concat("/groups/getgroups/");
 var getGamesByGroups = base_url.concat("/getGamesByGroup/");


/*
 * Executes the request to the server.
 */
function  executeRequest(jobject,callback,url,method)  {
 	var client = Ti.Network.createHTTPClient({
     // function called when the response data is available
     onload : function(e) {
     	var replyobject = JSON.parse(this.responseText);
     	if(replyobject.meta.code == 200) {
         callback( replyobject.response );
       } else {
         alert('Some error occured' + replyobject.meta.message);
       }
     },
     // function called when an error occurs, including a timeout
     onerror : function(e) {
         alert('Some error occured' + e.error);
     },
     timeout : 50000  // in milliseconds 
    });
     	 // Prepare the connection.
 	client.open(method, url);
 	//client.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
 	// Send the request.
 	client.send();
};
 
/*
 * Network API calls
 */
module.exports.getGroups = function(callback) { 
	executeRequest({},callback,getGroupsUrl,"GET"); 
};

module.exports.getGamesByGroup = function getGamesByGroup(jobject,callback) {
	 executeRequest(jobject,callback,getGroupsUrl,"POST"); 
};


