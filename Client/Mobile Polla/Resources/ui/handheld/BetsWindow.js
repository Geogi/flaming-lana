var network = require('Network/Network');

// items of the form [ [groupName, betSize], ...]
function BetsWindow(items) {

	var self = Ti.UI.createWindow({
		title : "Bets",
		backgroundColor : 'white'
	});

	// create empty array to add table data to
	var data = [];

	//create table view data object
	for (var c = 0; c < items.length; c++) {
		var group = items[c];
		var titleR = group[0];
		var betSize = group[1];
		var itemID = c;
		var progressBar = 'l' + c;

		Ti.API.info(progressBar);

		var progressBar = Titanium.UI.createProgressBar({
			height : 50,
			right: 15,
			min : 0,
			max : 1,
			value : 0,
			style : Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
			message : 'bets on ' + betSize + ' matches',
			font : {
				fontSize : 12,
				fontWeight : 'bold'
			},
			color : '#888'
		});

		var row = Ti.UI.createTableViewRow({
			height : 40,
			backgroundColor : '#fff'
		});

		var rowTitle = Ti.UI.createLabel({
			text : titleR,
			color : '#666666',
			left : 15,
			font : {
				fontSize : 13
			},
			height : 40,
		});

		var nestedView = Ti.UI.createView({
			height : 40,
		});

		progressBar.show();
		nestedView.add(progressBar);
		row.add(rowTitle);
		row.add(nestedView);
		data.push(row);

}

// create table view
var tableview = Titanium.UI.createTableView({
	data : data,
	style : Titanium.UI.iPhone.TableViewStyle.PLAIN
});

// create table view event listener
tableview.addEventListener('click', function(e) {
	// event data
	var index = e.index;
	//var section = e.section;
	var row = e.row;
	
	// if (section.rowdata.indexOf('clicked') == -1) {
		// section.rowdata = section.rowdata + ' (clicked)';
	// }
	 Titanium.UI.createAlertDialog({
		title : 'Table View',
		message : 'row ' + row + ' index ' + index 
	}).show();
});

var buttonBet = Ti.UI.createButton({
		height:44,
		width:200,
		title:L('Bet now'),
		bottom:20
});

buttonBet.addEventListener('click', function() {

		Titanium.UI.createAlertDialog({
		title : L('sendingbetalert'),
		message : 'success? ' 
	}).show();
				
});	
// add table view to the window
self.add(tableview);
self.add(buttonBet);

return self;
};

module.exports.BetsWindow = BetsWindow;
