
var network = require('Network/Network');

function ApplicationTabGroup(Window) {
	//create module instance
	var self = Ti.UI.createTabGroup();

	//create app tabs
	var win1 = new Window(L('standings')),
		myBetWindow = new Window(L('bet')),
		win3 = new Window(L('money'));

    // pull data to display
	// network.getGroups(function(response) {
		// var BetWindow = require('/ui/handheld/BetsWindow');
		// var groupData = [];
		// for (var c = 0; c < response.length; c++) {
			// var group = response[c];
			// var betSize = group.games.length;
			// if (betSize <= 0) { betSize = 6; };
				// groupData.push([group.name, betSize]);
		// };
		// this.myBetWindow = BetWindow.BetsWindow(groupData);		
	// });
	var BetWindow = require('/ui/handheld/BetsWindow');
	myBetWindow = BetWindow.BetsWindow([['Group A', 5], ['Group B', 6], ['Group C', 7]]);	
    
    
    
    var standingWindow = require('/ui/handheld/StandingWindow');
    var myStandingWindow = standingWindow.StandingWindow();

	var tab1 = Ti.UI.createTab({
		title: L('standings'),
		icon: '/images/list.png',
		window: myStandingWindow
	});
	myStandingWindow.containingTab = tab1;

	var tab2 = Ti.UI.createTab({
		title: L('bet'),
		icon: '/images/bet.jpg',
		window: myBetWindow
	});
	myBetWindow.containingTab = tab2;

    var tab3 = Ti.UI.createTab({
		title: L('money'),
		icon: '/images/sports_betting_money.jpg',
		window: win3
	});
	win3.containingTab = tab3;
	
	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);
	return self;
	
};

module.exports = ApplicationTabGroup;
