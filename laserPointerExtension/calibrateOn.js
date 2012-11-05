console.log("ck_identifier is being injected!");

var identifier = document.createElement('div');
identifier.innerText = "waiting for surface name...";
identifier.setAttribute("id","ck_identifier")
identifier.style.position = "fixed";
identifier.style.bottom = "0px";
identifier.style.right = "0px";
identifier.style.color = "white";
identifier.style.background = "#4A60A7";
identifier.style.padding = "20px";
	
document.body.appendChild(identifier);

chrome.extension.onMessage.addListener(function(message) {
	console.log("Received message", message);
	if (message.type == "calibrate") {
		var identifier = document.getElementById("ck_identifier");
		identifier.innerText = message.name;
		identifier.style.background = message.color;
		identifier.style.fontSize = "3em";
	}
});