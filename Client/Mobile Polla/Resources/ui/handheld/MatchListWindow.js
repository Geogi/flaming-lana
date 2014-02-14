var network = require('Network/Network');

function MatchesWindow(games) {
	var self = Ti.UI.createWindow({
		title : L('Matches for Group 1'),
		backgroundColor : 'white'
	});

	// create table view data object
	var data = [];

	for (var c = 0; c < 5; c++) {
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
			image : "/images/COL.png",
			left : 10,
			height : 20,
			width : 30
		}));
		row1.add(Titanium.UI.createLabel({
			text : 'COL',
			top : 13,
			left : 50
		}));
		row1.add(Titanium.UI.createImageView({
			image : "/images/BEL.png",
			left : 220,
			height : 20,
			width : 30
		}));
		row1.add(Titanium.UI.createLabel({
			text : 'BEL',
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

	// create table view
	var tableview = Titanium.UI.createTableView({
		data : data,
		style : Titanium.UI.iPhone.TableViewStyle.GROUPED
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

module.exports.MatchesWindow = MatchesWindow;
