//var network = require('Network');
var network = require('Network/Network');

function StandingWindow() {
	var self = Ti.UI.createWindow({
		title : 'Standings',
		backgroundColor : 'white'
	});

	var plainTemplate = {
		childTemplates : [
		{
			type : 'Ti.UI.ImageView', // Use an image view
			bindId : 'pic', // Bind ID for this image view
			properties : {// Sets the ImageView.image property
				image : '/images/user.png',
				left : '10dp'
			}
		},
		
		{
			type : 'Ti.UI.Label', // Use a label
			bindId : 'username', // Bind ID for this label
			properties : {// Sets the Label.left property
			}
		},
		
		, {
			type : 'Ti.UI.Label', // Use a button
			bindId : 'score', // Bind ID for this button
			properties : {// Sets several button properties
				width : '80dp',
				height : '30dp',
				right : '10dp',
			},
			events : {
				click : report
			} // Binds a callback to the button's click event
		}]
	};

	function report(e) {
		Ti.API.info(e.type);
	}

	// Function to create a view with a label
	var createCustomView = function(title) {
		var view = Ti.UI.createView({
			backgroundColor : '#222',
			height : 40
		});
		var text = Ti.UI.createLabel({
			text : title,
			left : 20,
			color : '#fff'
		});
		view.add(text);
		return view;
	}; 



	var listView = Ti.UI.createListView({
		headerView: createCustomView('User Scores'),
		// Maps the plainTemplate object to the 'plain' style name
		templates : {
			'plain' : plainTemplate
		},
		// Use the plain template, that is, the plainTemplate object defined earlier
		// for all data list items in this list view
		defaultItemTemplate : 'plain'
	});

	var data = [];
	for (var i = 0; i < 10; i++) {
		data.push({
			// Maps to the rowtitle component in the template
			// Sets the text property of the Label component
			username : {
				text : 'User ' + (i + 1)
			},
			score : {
				text : '12'
			},
			// Sets the regular list data properties
			properties : {
				itemId : 'row' + (i + 1),
				accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
			}
		});
	}

	var section = Ti.UI.createListSection({
		items : data
	});
	listView.sections = [section];
	listView.addEventListener('itemclick', function(e) {
		// Only respond to clicks on the label (rowtitle) or image (pic)
		if (e.bindId == 'rowtitle' || e.bindId == 'pic') {
			var item = e.section.getItemAt(e.itemIndex);
			if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_NONE) {
				item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
			} else {
				item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
			}
			e.section.updateItemAt(e.itemIndex, item);
		}
	});
	
	self.add(listView);
	return self;
};

module.exports.StandingWindow = StandingWindow;