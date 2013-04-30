/*
 cody smmith, 2012
 The network interface with acequia

 TODO make a connection timeout routine, so it doesn't lock up when it can't connect.


 */
var acequiaLaser2 = null
define(['',
    //this also needs open layers, but i'm imprting it with a script tag in the html
],function(){

    /*
     Make sure you can get acequia
     */
    requirejs([
        'http://localhost:9091/acequia/acequia.js',
    ],function(){
        console.log('acequia loaded')
        acequiaLaser2.Init()
    });

    acequiaLaser2 = new function(mymap){
        var this2=this;
        var ac
        this.laserx = 0;
        this.lasery = 0;

        this2 = this;
        var callbacks=[]
        this.addCallback = function( callback){
            callbacks.push(callback);
        }

        function onlaser( msg){

            //console.log("acequia msg ",msg)
            var x = parseFloat(msg.body[1])
            var y = parseFloat(msg.body[2])
            this.laserx = x
            this.lasery = y

            // call the callbacks
            for( var i=0; i < callbacks.length; i++){
                callbacks[i]({ x:x, y:y});
            }
        }

        this.Init = function(){
            //TODO delete hard coded one named ac
            //  var ac = new AcequiaClient("DELETEME-" + Math.random(), "http://192.168.1.136:9091" );
            // ac.addListener("/tuio/2Dcur/set", onlaser);
            // ac.connect();
            var ac2 = new AcequiaClient("SNOOP-DAWG-" + Math.random(), "http://127.0.0.1:9091" );
            ac2.addListener("/tuio/2Dcur/set", onlaser);
            ac2.connect();
            console.log( "acequia laser client loaded",  ac2)
        }
    }
})
