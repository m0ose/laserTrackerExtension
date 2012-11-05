requirejs([ 'http://localhost:9091/acequia/acequia.js'], function(){ console.log("requirejs loaded some files")
    onTuio2Dcur({body:[30,60,45]})
})

var selected = null;

$(document).ready( function(){
    var ac2 = createAcequiaConnection()
    ac2.initializeAcequiaSession()
    ac2.subscribeMessage( "/tuio/2Dcur/set", onTuio2Dcur)
});

function insertStuff(ch){
    console.log('inserting', ch)
    chrome.tabs.getSelected(function(v){
        selected = v;

        chrome.tabs.executeScript(selected.id , { file: "statbox.js" }, function() { console.log('statbox loaded')})
        chrome.tabs.executeScript(selected.id, { file: "syntheticEvents.js" }, function() { console.log('synthetic loaded')})

        chrome.tabs.executeScript(selected.id, { code: "console.log('hello') " }, function() { console.log('cons')})
    })
}

chrome.tabs.onUpdated.addListener(function(ch) {
    console.log('updated',ch)
    insertStuff(ch);
});
chrome.tabs.onActivated.addListener(function(changeInfo) {
    console.log('tabs changed',changeInfo)
    insertStuff(changeInfo);
})

var move = function(x,y){
    sendMessage({ type: "extension", x:x, y:y});
}
var sendMessage = function(val){
    //statBeam.sendMessage({x:30,y:10,state:'DOWN', prog:1})

    if( selected){
        chrome.tabs.executeScript(selected.id, { code: "receiveMessage(" + JSON.stringify(val) +" )" }, function() { console.log('msg sent',val)})
    }
}
var onTuio2Dcur = function (msg) {
    var x2 = parseFloat(msg.body[1]) ;
    var y2 = parseFloat(msg.body[2]) ;

    move(x2 * document.width, y2 * document.height )
    // timeout = setTimeout(onTimeout, 200);
};

//window.addEventListener('message', function(ev) {
//   console.log(ev) ;
//});
