var network = require('Network/Network');

userInfo = {
	id : "user_id",
	other_field : ' ',
	match_guesses : [] 
};


function ApplicationTabGroup(Window) {
	//create module instance
	var self = Ti.UI.createTabGroup();

	//create app tabs
	var betsWindow = require('/ui/handheld/BetsWindow');
    var myBetWindow = betsWindow.BetsWindow();
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

	var win3 = new Window(L('money'));
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
