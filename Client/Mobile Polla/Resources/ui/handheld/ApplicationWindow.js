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
		title:L('openWindow'),
		top:20
	});
	self.add(button);

	button.addEventListener('click', function() {
		//containingTab attribute must be set by parent tab group on
		//the window for this work
		
		network.getTeams({name: "BOBY!!"});

		var BetWindow = require('/ui/handheld/BetsWindow');
    	var myBetWindow = BetWindow.BetsWindow();
    
		self.containingTab.open(myBetWindow);
		
		
		
	});
	
	
	// create table view data object
var data = [];
 
for (var c=0;c<4;c++)
{
    data[c] = Ti.UI.createTableViewSection({headerTitle:'Group '+(c+1)});
    for (var x=0;x<10;x++)
    {
        data[c].add(Ti.UI.createTableViewRow({title:'Group '+(c+1)+', Row '+(x+1)}));
    }
}
 
// create table view
var tableview = Titanium.UI.createTableView({
    data:data,
    style: Titanium.UI.iPhone.TableViewStyle.GROUPED
});
 
// create table view event listener
tableview.addEventListener('click', function(e)
{
    // event data
    var index = e.index;
    var section = e.section;
    var row = e.row;
    var rowdata = e.rowData;
    if (section.headerTitle.indexOf('clicked')==-1)
    {
        section.headerTitle = section.headerTitle + ' (clicked)';
    }
    Titanium.UI.createAlertDialog({title:'Table View',message:'row ' + row + ' index ' + index + ' section ' + section  + ' row data ' + rowdata}).show();
});
 
// add table view to the window
//self.add(tableview);



	return self;
};

module.exports = ApplicationWindow;
