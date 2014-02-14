var fs = require('fs');

function import_wc_all() {
	var fileJSON = require('./data/rounds.json');
	console.log(fileJSON);


	rounds = fileJSON["rounds"];
	rounds.forEach(function(round) {
			
	});


	return 0;
}


import_wc_all();
