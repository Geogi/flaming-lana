var network = require('Network/Network');

function MatchesWindow(groupName) {
	var self = Ti.UI.createWindow({
		title : L('matches') + groupName,
		backgroundColor : 'white',
		updateWindow: function(data) {
			tableview.updateTableView(data);
		}
	});

	function updateView(groupName) {
		network.getGamesByGroup(groupName, function(response) {
		 self.updateWindow(response);
		 //control.endRefreshing();		 
	 });
	};
	
	updateView(groupName);
	// create empty array to add table data to
	var data = [];
	
	// create table view
	var tableview = Titanium.UI.createTableView({
		data : data,
		style : Titanium.UI.iPhone.TableViewStyle.GROUPED,
		updateTableView: function(data) {
			var data = inflateListView(data);
			// re-add data to table view to the window
			tableview.setData(data);
		},
	});

	// create table view event listener
	/*	tableview.addEventListener('click', function(e) {
	// event data
	var index = e.index;
	var section = e.section;
	var row = e.row;
	var rowdata = e.rowData;
	if (section.headerTitle.indexOf('clicked') == -1) {
	section.headerTitle = section.headerTitle + ' (clicked)';
	}
	Titanium.UI.createAlertDialog({
	title : 'Table View',
	message : 'row ' + row + ' index ' + index + ' section ' + section + ' row data ' + rowdata
	}).show();
	});
	*/
	// add table view to the window
	self.add(tableview);

	return self;
};

function inflateListView(items) {	

	// create table view data object
	var data = [];

	for (var c = 0; c <items.length; c++) {
		var game = items[c];
		
		data[c] = Ti.UI.createTableViewSection({
			headerTitle : '  ',
			height : 30
		});
		var row1 = Ti.UI.createTableViewRow({
			className : 'row',
			objName : 'row',
			touchEnabled : true,
			height : 50
		});
		row1.add(Titanium.UI.createImageView({
			image : "/images/" + game.team1_code + ".png",
			left : 10,
			height : 20,
			width : 30
		}));
		row1.add(Titanium.UI.createLabel({
			text : game.team1_code,
			top : 13,
			left : 50
		}));
		row1.add(Titanium.UI.createImageView({
			image : "/images/" + game.team2_code + ".png",
			left : 220,
			height : 20,
			width : 30
		}));
		row1.add(Titanium.UI.createLabel({
			text : game.team2_code,
			top : 13,
			left : 260
		}));
		data[c].add(row1);
		var row2 = Ti.UI.createTableViewRow({
			className : 'row',
			objName : 'row',
			touchEnabled : true,
			height : 100
		});

		var picker = Titanium.UI.createPicker({
			left : 10,
			width : 40,
			heigh : 50
		});
		var data2 = [];
		var data3 = [];
		data2.push(Titanium.UI.createPickerRow({
			title : ' '
		}));
		data3.push(Titanium.UI.createPickerRow({
			title : ' '
		}));
		for (var j = 1; j < 11; j++) {
			data2.push(Titanium.UI.createPickerRow({
				title : j.toString()
			}));
			data3.push(Titanium.UI.createPickerRow({
				title : j.toString()
			}));
		}
		var picker2 = Titanium.UI.createPicker({
			left : 220,
			width : 40,
			heigh : 50
		});

		picker.add(data2);
		picker2.add(data3);
		row2.add(picker);
		row2.add(picker2);
		data[c].add(row2);
	}

	data[7] = Ti.UI.createTableViewSection({
		headerTitle : '  ',
		height : 40
	});
	var buttonRow = Ti.UI.createTableViewRow({
		className : 'row',
		objName : 'row',
		touchEnabled : true,
		height : 50
	});
	var rightButton = Titanium.UI.createButton({
			title: 'OK',
			right : 10,
		});
	rightButton.addEventListener('click', function(e) {
			Ti.API.info('clicked button');
			
	}); 
	
	buttonRow.add(rightButton);
	data[7].add(buttonRow);
	
	return data;

};
module.exports.MatchesWindow = MatchesWindow;
