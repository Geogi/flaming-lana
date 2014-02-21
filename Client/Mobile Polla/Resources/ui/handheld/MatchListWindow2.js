var network = require('Network/Network');

var game_scores = []; 

function MatchesWindow(games) {
	var self = Ti.UI.createWindow({
		title : L('Matches for Group 1'),
		backgroundColor : 'white'
	});

	// create table view data object
	var data = [];

	for (var c = 0; c < 2; c++) {
		var sec = Ti.UI.createTableViewSection({
			headerTitle : ' Game ' + (c+1),
			height : 30
		});
		var row1 = Ti.UI.createTableViewRow({
			className : 'row',
			objName : 'row1',
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
		sec.add(row1);
		
		var row2 = Ti.UI.createTableViewRow({
			className : 'row',
			objName : 'row2',
			touchEnabled : true,
			height : 40
		});

		row2.add(Titanium.UI.createLabel({
			text : '20',
			left : 30,
			top : 5
		}));
		
		var homeButtonUp = Titanium.UI.createButton({
			title: '+',
			left : 45,
			top : -5
		});
		var homeButtonDown = Titanium.UI.createButton({
			title: '-',
			left : 45,
			top : 6
		});
		row2.add(homeButtonUp);
		row2.add(homeButtonDown);
		
		row2.add(Titanium.UI.createLabel({
			text : '0',
			left : 240,
			top : 5
		}));
		
		var awayButtonUp = Titanium.UI.createButton({
			title: '+',
			top : -5,
			right : 20,
		});
		var awayButtonDown = Titanium.UI.createButton({
			title: '-',
			bottom : 5,
			right : 20,
		});
		row2.add(awayButtonUp);
		row2.add(awayButtonDown);
		sec.add(row2);
	}
					
		data.push(sec);


	var buttonSection = Ti.UI.createTableViewSection({
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
			for(var index=0; index<data.length; index++) {
				var aSection = data[index];
				var aRow = aSection.rows[1];
				Ti.API.info(aRow);
				Ti.API.info(aRow.children);
				var picker1 = aRow.children[0];
				var picker2 = aRow.children[1];
				Ti.API.info(picker1.value);
				Ti.API.info(picker2.value);
			}
	}); 
	
	buttonRow.add(rightButton);
	buttonSection.add(buttonRow);
	data.push(buttonSection);

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
