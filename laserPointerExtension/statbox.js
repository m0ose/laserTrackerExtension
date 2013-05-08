


function receiveMessage(ev) {
    //statusBeam.move(ev.x,ev.y)

    var x2 = Math.floor(window.innerWidth * ev.x) //+ window.pageXOffset;
    var y2 = Math.floor(window.innerHeight * ev.y) //+ window.pageYOffset;
    //console.log( document.width, document.height,x2,y2);
    statusBeam.move(x2,y2)
}
var statusBeam = null;
if( true ){
    statusBeam = new function(){

        this.minDist = 20;
        this.initialX = 0;
        this.initialY = 0;
        this.x = 0;
        this.y = 0;

        this.verbose = false;
        this.energy = 0;
        this.energyPerMove = 0.0014; //ms
        this.energyLoss = 0.0009; //ms
        this.clickEnergy = 1.0;
        this.distancePenalty = 0.5;
        this.lastTickTime = -1;
        this.lastMoveTime = -1;
        this.mouseDown = false;
        this.animFramID = null;
        this.animating = false;
        this.rootClickNode = null;

        this.div = document.getElementById('statusBeamDiv');
        if( !this.div){    this.div = document.createElement('div')    }
        this.div.id = 'statusBeamDiv';
        this.div.style.cssText = " z-index:3000; position:fixed; color:white";
        this.div.innerHTML = ""
        this.img = new Image();
        this.div.appendChild( this.img)
        this.circleImg = new Image();
        this.circleImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QQdEi0daQnN+wAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAT4SURBVHja7ZtLSGNXGMe/k6oRbCEUJDBqdEKR0jHKBKMgXdRSFykIKhQtqYaK0DKts+giLrowBQst2E1m0SJol1IfOx1oo1XEQRqqWEUXhZRolJpoXPhCG82/i1a43tx7c2Ne9zh+8C1yT87j9z+Pe16X6N5ebmPZyghAPhHVEFEFERVKlCNIREHGmP9OKAvgdQBPADwH8A+Ssz8BeAC8zSP4EwCbSK/9COBNrYO7kXnzAbBpagwA0EdE36j9/+npKQUCATo5OSEiolgsRmazmYxGYzLZ/k5ErYyxnVzW+EMAfyWqsoWFBbhcLlitVjDGQESybjKZ0NbWhqGhIRwdHalpEf25gu9UKtXW1hZ6enoUYdV4dXU1RkZGEomwBqAAAMsW/DO5kvj9ftjt9pTBxa7X6+HxeOSyjQGIAniQDfjncqVwOp1pBxe7wWDA7OysUmuoyjr80tISioqKMg4v9K6uLiURLJmA/0Eqp4GBgayCC72kpAQHBweIxWLiYkUBGNMJ/4kUfGdnZ87gr72wsBCbm5Jzrki64N+QSr29vT3n8ELf3d2Vagm/pEOAv8Wput1uTcETEfLy8nBxcSFVVx+mAj8gTm1xcVFz8EQExhgsFovcoPjKbeD14lSurq6g0+k0KcC1u92SyxHPbQSIm3W0tLRoGv7ag8GglAj6ZOAL45ZgPh8X8ESE2tpaKQGeJSPAl+LYNpuNGwGICD6fL06BZAQ4FEZcWVnhCp6I0NDQINUKPlIDXyOO1dzczJ0ARIRAICBGmVMjwNcSTYdL7+vrS74bAPhDGGF0dJRbAYxGo1Q3aBQz60S/q4U/pqenud2VDoVCFInELQnekxUAQKU4cGZmhuutea/XK370WKkFVIsD9/b2uBbA5/OJH1mUBCgXBmxsbHB/OLO+vi5+VKokwGvCgO3tbe4FUMOgkws4PDzkXgA1DDp6yU1WgFgsxj2cmrmPrABlZWXcC6CGQShASBhgMpnuogAXSgLcGDLNZjP3AlitVvGjoJIAcS/NyspKrgWoq6uLmxokGjRuWG9vL7eLIQkcAPgikQBzPOwCp7A1VpNIgKfiGPn5+VwKMDg4GHdkpua9abwr3eDs7EyM8pPaycONTZFQKMQdvMPhkGr+76gV4GNxTIfDwZUA+/v7YoTkFjYAzoWxw+EwN/BOp1Oq9p8mK0DcYNjf3695eJ1Oh8vLS3HRz2+7kIg7bi0vL9e0AFNTU6nXvkCAD+JuHUQimoXv7u6Wgk9tTw/Ar3GnC3NzmoOvqqqSOxp/K1UB9OIBEQCGh4c1A19cXJzZS5QArFKpT05O5hzeYrEgGo1KFW8x3TsrbVK5LC8vQ6/X5wS+o6ND7tJkIFPbS59J5Xh+fo7Gxsaswo+Pj8vBh5K6DHELET6X63BjY2MoKCjIKHhrayuOj4/lirCbUXiBCO8rXdP0eDxp7xZ2ux1+v18p29+yvdtaASCiVKKJiQk0NTWldLrrcrkQDocT3Rb/NhUWlqIQ3xPRp4n+Nz8/T16vl1ZXV2ltbY12dm5+52AwGMhkMlF9fT3ZbDay2+1UWlqaKNkjInqXMbac6733R/9/ypJN+0qLhxA2AC8yCH0JwM3DaUwFgO8SjRFJ2AsA7ZkqL8uwGA+JqJn+u5nxiIgSHTZEiWiFiHxE9DNjLONXVFgOWsirJPHlKGNsn+7t3u4t2/YvTX+jIYE7AMUAAAAASUVORK5CYII="
        this.burstImg = new Image();
        this.burstImg.src = "data:image/png;base64,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"
        document.body.appendChild(this.div)

        this.move=function(x,y){
            this.div.style.top = y -32 +  'px';
            this.div.style.left = x -32 + 'px';

            var dist =  Math.sqrt( Math.pow(x-this.initialX,2) +  Math.pow( y-this.initialY,2))
            var time = new Date().getTime();
            if( this.lastMoveTime < 0 ){
                this.lastMoveTime = time -100;
                this.initialX = x;
                this.initialY = y;
                dist = 0;
            }
            var dt = time - this.lastMoveTime ;
            dt = Math.min(dt, 300)

            this.energy += this.energyPerMove * dt;
            this.energy = Math.min( this.energy, this.clickEnergy * 1.7)
            this.lastMoveTime = time;

            // Simulate event
            //
            if( this.energy < this.clickEnergy && dist/dt > this.minDist){
                this.energy -= this.distancePenalty;
            }
            if( this.energy > this.clickEnergy){
                //I stupidly didn't realize the underliying element would be the pointer image
                //   so as a ghetto hack we move it out of the way, get the underlying element, then put it back.
                this.div.style.top = -32 + 'px';  // move it away
                this.div.style.left = -32 + 'px';
                if(this.mouseDown){
                    var element = document.elementFromPoint(x, y);
                    if( element){
                        if( element != this.rootClickNode){
                            syntheticEvent.simulate(element, "mouseover", {pointerX:x, pointerY:y} )
                        }
                        //syntheticEvent.simulate(element, "focus", {pointerX:x, pointerY:y} )
                    }
                    if( this.rootClickNode ){
                        if( element == this.rootClickNode) {
                            if(this.verbose){console.log('mousemove')}
                            syntheticEvent.simulate( this.rootClickNode, "mousemove", {pointerX:x, pointerY:y} )
                        }
                        else{
                            if(this.verbose){console.log('mouse out')}
                            syntheticEvent.simulate( this.rootClickNode, "mouseout", {pointerX:x, pointerY:y} )
                            //   syntheticEvent.simulate( this.rootClickNode, "blur", {pointerX:x, pointerY:y} )
                            //syntheticEvent.simulate( this.rootClickNode, "mouseup", {pointerX:x, pointerY:y} )
                            this.rootClickNode = element
                        }
                    }
                }
                else{
                    var element = document.elementFromPoint(x, y);
                    if( element){
                        //click
                        syntheticEvent.simulate(element, "mouseover", {pointerX:x, pointerY:y} )
                        syntheticEvent.simulate(element, "mousedown", {pointerX:x, pointerY:y} )
                        syntheticEvent.simulate(element, "click", {pointerX:x, pointerY:y} )
                        console.log(element)
                        // syntheticEvent.simulate(element, "focus", {pointerX:x, pointerY:y} )


                        this.rootClickNode = element;
                    }
                    this.mouseDown = true;
                }
                this.div.style.top = y -32 + 'px';  // put it back
                this.div.style.left = x -32 + 'px';
            }
            else{
                this.mouseDown = false;
            }

            if( !this.animating ){ //start Animation
                this.tick()
            }
        }

        this.tick = function(){
            if( this.energy > 0){
                var time = new Date().getTime();
                if( this.lastTickTime < 0 ){
                    this.lastTickTime = time;
                }
                var dt = time - this.lastTickTime ;
                this.energy -= this.energyLoss * dt;
                this.lastTickTime = time;
                this.animating = true;
                this.animFramID = window.requestAnimationFrame( this.tick.bind(this))
            }
            else{
                this.energy = 0;
                window.cancelAnimationFrame( this.animFramID)
                this.animFramID = null;
                this.animating = false;
                this.lastMoveTime = -1
                this.lastTickTime = -1
                this.initialX = 0;
                this.initialY = 0;
                if( this.rootClickNode ){
                    if(this.verbose){console.log('mouse out') }
                    syntheticEvent.simulate( this.rootClickNode, "mouseup", {pointerX:0, pointerY:0} )
                    syntheticEvent.simulate( this.rootClickNode, "mouseout", {pointerX:0, pointerY:0} )

                    this.rootClickNode = null;
                }
            }
            //change ui
            if( this.energy > this.clickEnergy * 0.9){
                this.img.src = this.burstImg.src
                this.div.style.opacity = "1.0"

            }
            else{
                this.img.src = this.circleImg.src
                this.div.style.opacity = "0.5"
            }
            this.div.style.visibility = "visible"
            this.div.style.webkitTransform = 'scale('+this.energy+',' +this.energy+')'
        }
    }()
    console.log( 'made', statusBeam)
}
