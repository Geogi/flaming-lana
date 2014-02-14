//var network = require('Network');
var network = require('Network/Network');


function ApplicationWindow(title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white'
	});

	var button = Ti.UI.createButton({
		height:44,
		width:200,
		title:L('to match center'),
		top:20
	});
	self.add(button);

	button.addEventListener('click', function() {
		//containingTab attribute must be set by parent tab group on
		//the window for this work

		var BetWindow = require('/ui/handheld/BetsWindow');
    	var myBetWindow = BetWindow.BetsWindow();
    
		self.containingTab.open(myBetWindow);
		
	});


	return self;
};

module.exports = ApplicationWindow;
