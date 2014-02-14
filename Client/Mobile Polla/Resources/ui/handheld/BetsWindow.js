var network = require('Network/Network');

// items of the form [ [groupName, betSize], ...]
function BetsWindow(items) {

	var self = Ti.UI.createWindow({
		title : "Betting Overview",
		backgroundColor : 'white',
		updateWindow: function(data) {
			tableview.updateTableView(data);
		}
	});
	
	function updateView() {
		network.getGroups(function(response) {
		var groupData = [];
		 for (var c = 0; c < response.length; c++) {
			 var group = response[c];
			 var betSize = group.games.length;
			 groupData.push([group.name, betSize]);
		 };
		 self.updateWindow(groupData);
		 control.endRefreshing();		 
	 });
	};
	
	updateView();
// create empty array to add table data to
	var data = [];

var control = Ti.UI.createRefreshControl({
    tintColor:'blue'
});

// create table view
var tableview = Titanium.UI.createTableView({
	data : data,
	style : Titanium.UI.iPhone.TableViewStyle.PLAIN,
	updateTableView: function(data) {
		var data = inflateListView(data);
		// re-add data to table view to the window
		tableview.setData(data);
	},
	refreshControl:control
});

control.addEventListener('refreshstart',function(e){
    Ti.API.info('refreshstart');
    setTimeout(function(){
        Ti.API.debug('Timeout');
        updateView();
    }, 2000);
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
	 

function inflateListView(items) {	

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
		return data;
}
};

module.exports.BetsWindow = BetsWindow;
module.exports.inflateListView = inflateListView;
