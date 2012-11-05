

function createAcequiaConnection() {

  var app = {

    acequiaHost: 'localhost',//'acequia.redfish.com',
    acequiaPort: 9091,
    ac: null,


    /*
     * Initializes the acequia connection and sets up the appropriate
     * callbacks.
     */
    initializeAcequiaSession: function() {
      var connectionUrl = 'http://' + app.acequiaHost + ':' + app.acequiaPort;
      console.log('Attempting to connect to acequia at ' + connectionUrl);
      app.ac = new AcequiaClient("user" + Math.random(), connectionUrl);
      // app.ac = new AcequiaClient("user" + Math.random());
      app.ac.on(msg.MSG_CONNECT, app.onconnect);
      app.ac.on(msg.MSG_GETCLIENTS, app.ongetClients);
      //app.ac.on("test", app.onmessage);
     // app.ac.on("/tuio/2Dcur/set", onTuio2Dcur);

      app.ac.addConnectionChangeHandler(app.onconnectionChanged);
      
      app.ac.connect();
      return app
    },
    
    
    /*
     * Called when acequia connection is ready
     */
    onconnect: function(msg, ac) {
      app.ac.getClients();
    },
    
    
    /*
     * Called when currently connected clients list is ready
     */
    ongetClients: function(message, ac) {
      // nameArray = message.body.split(',');
      console.log('There are ' + message.body.length + ' currently connected clients: ');
      for (var i = 0; i < message.body.length; i++) {
        console.log('  ' + (i + 1) + ': ' + message.body[i]);
      }
    },
            
    
    /*
     *
     */
    onmessage: function(message, ac) {
      // $("<div></div>").html(JSON.stringify(message))
      //                 .appendTo("#received-messages");
      console.log('Here is my message: ' + message);
    },
            
    
    /*
     *
     */
    onconnectionChanged: function(connected) {
      // $("#connect").button("option", "disabled", connected);
      // $("#send").button("option", "disabled", !connected);
    },
    
    
    /*
     *
     */
    sendMessage: function() {
      // var msgName = $("#sendMessageName").val().trim();
      // if (msgName) {
      //   app.ac.send(msgName);
      // }
    },
    
    
    /*
     *
     */
    subscribeMessage: function(msg, callback) {
        app.ac.on(msg, callback);
        console.log("registered callback for ", msg)
    }
  };
  
  return app;
}
