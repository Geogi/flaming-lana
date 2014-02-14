//var network = require('Network');

var network = require('Network/Network');
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
			} // Binds a callback to the button's click event
		}]
	};

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

function createSection(n) {
	var data = [];
	for (var i = 0; i < n; i++) {
		data.push({
			// Maps to the rowtitle component in the template
			// Sets the text property of the Label component
			username : {
				text : 'Nicolas ' 
			},
			score : {
				text : '42'
			},
			// Sets the regular list data properties
			properties : {
				itemId : 'row' + (i + 1),
				accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
			}
		});
	}
	
	data.push({
			// Maps to the rowtitle component in the template
			// Sets the text property of the Label component
			username : {
				text : 'Elisa ' 
			},
			score : {
				text : '23'
			},
			// Sets the regular list data properties
			properties : {
				itemId : 'row' + (i + 1),
				accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
			}
		});

data.push({
			// Maps to the rowtitle component in the template
			// Sets the text property of the Label component
			username : {
				text : 'Andoni ' 
			},
			score : {
				text : '20'
			},
			// Sets the regular list data properties
			properties : {
				itemId : 'row' + (i + 1),
				accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
			}
		});
		
		
		data.push({
			// Maps to the rowtitle component in the template
			// Sets the text property of the Label component
			username : {
				text : 'Lode ' 
			},
			score : {
				text : '18'
			},
			// Sets the regular list data properties
			properties : {
				itemId : 'row' + (i + 1),
				accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
			}
		});


	data.push({
			// Maps to the rowtitle component in the template
			// Sets the text property of the Label component
			username : {
				text : 'Christophe ' 
			},
			score : {
				text : '7'
			},
			// Sets the regular list data properties
			properties : {
				itemId : 'row' + (i + 1),
				accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
			}
		});


	var section = Ti.UI.createListSection({
		items : data
	});
	return [section];
};


function StandingWindow() {
	var control = Ti.UI.createRefreshControl({
    	tintColor:'blue'
	});
	
	var listView = Ti.UI.createListView({
		headerView: createCustomView('User Scores'),
		templates : {
			'plain' : plainTemplate
		},
		defaultItemTemplate : 'plain',
		refreshControl:control
	});

	control.addEventListener('refreshstart', function(e) {
		Ti.API.info('refreshstart');
		setTimeout(function() {
			network.getGroups(function(response) {
				listView.sections = createSection(100);
				control.endRefreshing();
			}); 
		}, 2000);
	});

	var window = Ti.UI.createWindow({
		title : 'Standings',
		backgroundColor : 'white',
		updateWindow: function(newdata){
           	listView.sections = createSection(1);
        }		
	});
	listView.sections = createSection(1);
	window.add(listView);
		
	return window;
};

module.exports.StandingWindow = StandingWindow;