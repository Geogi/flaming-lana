function ApplicationTabGroup(Window) {
	//create module instance
	var self = Ti.UI.createTabGroup();

	//create app tabs
	var win1 = new Window(L('standings')),
		win2 = new Window(L('bets')),
		win3 = new Window(L('money'));
	
    var BetWindow = require('/ui/handheld/BetsWindow');
    var myBetWindow = BetWindow.BetsWindow();
    
    
    var standingWindow = require('/ui/handheld/StandingWindow');
    var myStandingWindow = standingWindow.StandingWindow();

	var tab1 = Ti.UI.createTab({
		title: L('Standings'),
		icon: '/images/list.png',
		window: myStandingWindow
	});
	myStandingWindow.containingTab = tab1;

	var tab2 = Ti.UI.createTab({
		title: L('Bets'),
		icon: '/images/bet.jpg',
		window: myBetWindow
	});
	myBetWindow.containingTab = tab2;

    var tab3 = Ti.UI.createTab({
		title: L('Money'),
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
