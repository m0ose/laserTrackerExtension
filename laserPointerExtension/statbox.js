


function receiveMessage(ev) {
    //statusBeam.move(ev.x,ev.y)
   
    var x2 = Math.floor(document.width * ev.x);
    var y2 = Math.floor(document.height * ev.y);
    console.log( document.width, document.height,x2,y2);
    statusBeam.move(x2,y2)
}
var statusBeam = null;
statusBeam = new function(){
    this.minDist = 40;
    this.timeout = 1000;
    this.idleTimeout = 1000;
    this.initialX = 0;
    this.initialY = 0;
    this.lastTime = new Date().getTime();
    this.div = document.getElementById('statusBeamDiv');
    if( !this.div){    this.div = document.createElement('div')    }
    this.div.id = 'statusBeamDiv';
    this.div.style.cssText = " position:absolute";
    this.progressBar = document.getElementById('statusBeamBar');
    if( ! this.progressBar){    this.progressBar = document.createElement('progress') }
    this.progressBar.id = "statusBeamBar";
    this.progressBar.style.cssText = " border: 2px blue solid; border-radius: 6px";
    this.progressBar.max = 1;
    this.progressBar.value = 0;
    this.div.appendChild( this.progressBar);

    var states = {up:"UP", down:"down"}
    this.state = states.up;
    this.idleTimer = null;

    this.move=function(x,y){
        this.div.style.top = y + 1 + 'px';
        this.div.style.left = x + 1 + 'px';
        var now  = new Date().getTime();
        var dt = now - this.lastTime;
        var tratio = dt/this.timeout;
        var dist =  Math.sqrt( Math.pow(x-this.initialX,2) +  Math.pow( y-this.initialY,2))
        //console.log(tratio, dist)
        if( this.idleTimer){ window.clearTimeout( this.idleTimer )}
        this.idleTimer =  window.setTimeout( this.idle.bind( this ), this.idleTimeout )

        if( this.state == states.down){
            this.progress(100)
            if( tratio > 0.2){//idle start long press over
                this.state = states.up
                this.lastTime = now
            }
            else{
                // console.log("mouse move")
                var element = document.elementFromPoint(x, y);
                console.log(element)
                if( element){
                    syntheticEvent.simulate(element, "mousemove", {pointerX:x, pointerY:y} )
                }
            }
            this.lastTime = now
        }
        else if(this.state == states.up){
            if( dist > this.minDist){
                //reset counter
                this.lastTime = now
                this.initialX = x;
                this.initialY = y;
                this.progress(0)
            }
            if( tratio > 1){//initial mouse click
                this.state = states.down;
                this.lastTime = now
                this.initialX = x;
                this.initialY = y;
                //  console.log("mouse click")
                var element = document.elementFromPoint(x, y);
                if( element){
                    syntheticEvent.simulate(element, "mousemove", {pointerX:x, pointerY:y} )
                }
            }
            else{
                this.progress( tratio)
            }
        }
    }


    this.progress = function(ratio){
        this.div.style.visibility = "visible"
        //this.progressDiv.style.height = 100*(1-ratio)+"px";
        this.progressBar.value =  ratio;
        if( ratio > 1){
            this.progressBar.style.border=" 4px white solid "
        }
        else{
            this.progressBar.style.border=" 2px blue solid "
        }
        return ratio
    }


    this.idle = function(){
        //this.div.style.visibility = "hidden"
    }
    document.body.appendChild(this.div)
}()
console.log( 'made', statusBeam)

/*
 var statusbar = function(){

 this.container = document.getElementById('statusBeamDiv');

 if(!document.getElementById('statusBeamDiv') ){
 document.body.appendChild( document.createElement('div')).id = 'statusBeamDiv';
 document.getElementById('statusBeamDiv').style.cssText = ' position:absolute;z-index:2000';
 document.getElementById('statusBeamDiv').appendChild( document.createElement('progress')).id = 'statusBeamBar';
 document.getElementById('statusBeamBar').style.cssText = 'border: 2px blue solid; border-radius: 6px';
 document.getElementById('statusBeamBar').max = 1;
 document.getElementById('statusBeamBar').value = 0;
 document.getElementById('statusBeamDiv').style.visibility = 'visible';
 document.getElementById('statusBeamDiv').style.left = "10px";
 document.getElementById('statusBeamDiv').style.top = "10px";
 }

 }

 */
/*
 function receiveMessage(ev) {
 console.log(ev) ;
 if(ev.x >= 0 ){document.getElementById('statusBeamDiv').style.left = ev.x+'px' };
 if(ev.y >= 0){document.getElementById('statusBeamDiv').style.top = ev.y+'px' };
 if(ev.prog >= 0 ){document.getElementById('statusBeamBar').value = ev.prog };
 if(ev.state == 'UP'){document.getElementById('statusBeamBar').style.border='2px blue solid' };
 if(ev.state == 'DOWN'){document.getElementById('statusBeamBar').style.border='4px white solid' };
 if(ev.invisible){
 document.getElementById('statusBeamDiv').style.visibility='hidden'
 };
 if(!ev.invisible){
 document.getElementById('statusBeamDiv').style.visibility='visible'
 };
 }
 */