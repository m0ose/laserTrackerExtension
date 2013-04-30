document.addEventListener('DOMContentLoaded', function () {
  //var button = document.getElementById('upload');
  //button.addEventListener('click', uploadPage);
});

function uploadPage() {
	console.log("Inserting content script.");
	chrome.tabs.executeScript(null, {file: "getContent.js"}, function(result) {
		uploadData(result[0]);
	});
}

function uploadData(dataArray) {
	// assume data is json for now
	var data = dataArray[0];
	
	var json;
	try {
		 json = JSON.parse(data);
	}
	catch (error) {
		throw error;
	}

	var title = json.meta.view.name;
	var content = json.data;

	var dataURL = "http://gamma.firebase.com/cityKnowledge/testdata";
	var groupURL = "http://gamma.firebase.com/cityKnowledge/testgroups/"+title;

	// in [groupname]/query, stick a query object that represents the group
	// var newGroupQuery = createGroupQuery(groupURL.split("/").pop());
	// new Firebase(groupURL).child("query_instruction").set(newGroupQuery);

	function extractHumanAddress(addressString) {
		var addressJSON = JSON.parse(addressString);
		return addressJSON.address + ", " + addressJSON.city + ", " + addressJSON.state + " " + addressJSON.zip;
	}

	var grades = ["***","**","*","PASS"];

	// in [groupname]/[id], stick the ids of all the agents in the group
	for (var i=0; i<content.length; i++) {
		var data = content[i];
		var id = i;
		var randIdx = Math.floor(1+Math.random()*3);
		var newObj = {
			data: {
				businessName: data[8],
				licenseStatus: data[10],
				licenseCategory: data[11],
				description: data[12],
				licenseDate: data[13],
				phoneNumber: data[14],
				address: extractHumanAddress(data[15][0]),
				lat: data[15][1],
				lon: data[15][2],
				grade: grades[randIdx],
				groupname: title
			}
		};
		console.log(newObj);
		new Firebase(groupURL).child("members").child(id).set(id, function(success) {
			if (success) {
				new Firebase(dataURL).child(this.id).set(this.newObj, function(success) {
					if (!success) console.log("Failed to upload " + this.id + " to data.");
				});
			}
			else console.log("Failed to upload " + this.id + " to group.");
		}.bind({"id":id,"newObj":newObj}));
	}
}