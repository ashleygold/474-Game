//https://stackoverflow.com/questions/962033/what-underlies-this-javascript-idiom-var-self-this

var doggyworldGame = function() {
    var self=this;
    this.options={
        //not sure what we will or won't need for options, left as example of what should go here
        /*height:500,
        width:680,
        goalHeight:188,
        goalRight:50,
        goalWidth:50,
        minRange:600,
        minX:50,
        minY:100,
        mindelay:1000,
        maxdelay:5000,
        minballSpeed:70,
        maxballSpeed:150,
        errorPercent:1.25,
        goalieHeight:60*/

        //for the grid
        minX: 0,
        minY: 0,
        maxX: 9,
        maxY: 9,
        
        //speed of tick - 1000 is about one second.
        speed: 1000,
        icounter: 0


    }
    this.height = 500;
    this.time = 0;

    //im making a lot of arbitrary decisions
    this.player=new dogPlayer(1,0,self.minY,self.maxY,self.minX,self.maxX); //playerid = 0,   xPos,yPos,minY,maxY,minX, maxX
    this.dogAI1=new dogAI(1, 0, 8, self.minY,self.maxY,self.minX,self.maxX);
    this.dogAI2=new dogAI(2, 9, 1, self.minY,self.maxY,self.minX,self.maxX);
    this.dogAI3=new dogAI(3, 9, 8, self.minY,self.maxY,self.minX,self.maxX);
    this.plain = "grass"; //not sure if we'll want to do something else later, otherwise I'd change this to a string
    
    this.dogs = [self.player, self.dogAI1, self.dogAI2, self.dogAI3];

    this.landmarks = [new landmark(12, 1, 7, 0, ""), new landmark(1, 1, 7, 2, ""), new landmark(2, 1, 9, 4, ""), new landmark(3, 1, 6, 3, ""),  
        new landmark(4, 2, 2, 9, ""), new landmark(5, 2, 2, 7, ""), new landmark(6, 2, 0, 5, ""), new landmark(7, 2, 3, 6, ""),
        new landmark(8, 3, 9, 7, ""), new landmark(9, 3, 7, 7, ""), new landmark(10, 3, 6, 9, ""), new landmark(11, 3, 6, 6, "")];
    this.kennels = [new kennel(0, 0, 0), new kennel(1, 9, 0), new kennel(2, 0, 9), new kennel(3, 9, 9)];

    this.board = [new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10)];
    this.board.forEach(function(subarray) {
        subarray.fill(self.plain);
    });
    
    /*
    this.reset_board=function(time){
        
    };
    */

    this.landmarks.forEach(function(alandmark) {
        self.board[alandmark.yPosition][alandmark.xPosition] = alandmark;
    });
    
    this.kennels.forEach(function(akennel) {
        self.board[akennel.yPosition][akennel.xPosition] = akennel;
    });
    
    this.dogs.forEach(function(adog) {
        self.board[adog.yPosition][adog.xPosition] = adog;
    });
    
    this.initialize=function(){
        self.reset();
        setInterval(function () { 
            //if running? TODO
                self.time++;
                self.update(self.time);
            //end if
        }, self.options.speed);
    };

    this.reset=function(){
        //put all dogs back in their kennels
        //make all territories owned by the correct dogs

        //may generate/regenerate board
        
        //reset time to 0
        self.time = 0;
    };
	
	this.startGameButton=function(){
	    	
	};
	
	this.stopGameButton=function(){
		
	};
	
	this.quitGameButton=function(){
		
	};

    //update all the ai dog's positions and on the board.
    this.update=function(time){
        //update time on board - should we have game running bool in here, not ui?
        document.querySelector('#Time').innerHTML = '<span>' + time + 'sec</span>'
        /*
        self.dogAI1.move();
        self.dogAI2.move();
        self.dogAI3.move();
        moveOnBoard(self.dogAI1);
        moveOnBoard(self.dogAI2);
        moveOnBoard(self.dogAI3);
        */
        return 0;
    };

    //moves a specific character on the board - player or ai.
    this.moveOnBoard=function(item) {
        if (self.board.includes(item)) {
            //if nothing there, put it there
            if (self.board[item.yPosition][item.xPosition] == self.plain) {
                self.board[item.yPosition][item.xPosition] = item;
                self.board[item.oldYPosition][item.oldYPosition] = self.plain;
            } else {
                //don't do anything to board for now, put them back where they were.
                item.xPosition = item.oldXPosition;
                item.yPosition = item.oldYPosition;
            }
        }
    };

    this.initialize();
}

/*
    Dog Player: starting position, range of where it can go.
*/
var dogPlayer = function(xPos,yPos,minY,maxY,minX, maxX) {
    //do they need landmarks? other dogs won't attack I think
    var self=this;
    this.dogID = 0;
    this.oldYPosition=yPos;
    this.oldXPosition=xPos;
    this.yPosition=yPos;
    this.xPosition=xPos;
    this.minY=minY;
    this.maxY=maxY;
    this.minX=minX;
    this.maxX=maxX;

    this.initialize=function(){

    };

    //after this is called you must update game board
    this.setXPosition=function(xPos){
        self.oldXPosition=self.xPosition;
        if (xPos<=self.minX) {
            self.xPosition=self.minX;
        } else if (xPos>=self.maxX){
            self.xPosition=self.maxX;
        } else {
            self.xPosition=xPos;
        }
    }

    //after this is called you must update game board
    this.setYPosition=function(yPos){
        self.oldYPosition=self.yPosition;
        if (yPos<=self.minY) {
            self.yPosition=self.minY;
        } else if (yPos>=self.maxY){
            self.yPosition=self.maxY;
        } else {
            self.yPosition=yPos;
        }
    };
    this.moveH=function(amount){
        self.setXPosition(self.xPosition+amount);
    };
    
    this.moveV=function(amount){
        self.setYPosition(self.yPosition+amount);
    };

    this.bark=function() {
        
    };

    this.barkedAt=function() {
        
    };
    
    this.pee=function() {
        
    };

    this.initialize();
}

/*
    artificial dog opponents. has an id, position, range (given territory).
*/
var dogAI = function(dogID, yPos, xPos, minY, maxY, minX, maxX) {
    var self=this;
    this.dogID = dogID;
    this.oldYPosition=yPos;
    this.oldXPosition=xPos;
    this.yPosition=yPos;
    this.xPosition=xPos;
    this.minY=minY;
    this.maxY=maxY;
    this.minX=minX;
    this.maxX=maxX;

    this.options={

    }

    this.initialize=function(){

    };

    //after this is called you must update game board
    this.setXPosition=function(xPos){
        self.oldXPosition=self.xPosition;
        if (xPos<self.minX) {
            self.xPosition=self.minX;
        } else if (xPos>self.maxX){
            self.xPosition=self.maxX;
        } else {
            self.xPosition=xPos;
        }
    }

    //after this is called you must update game board
    this.setYPosition=function(yPos){
        self.oldYPosition=self.yPosition;
        if (yPos<self.minY) {
            self.yPosition=self.minY;
        } else if (yPos>self.maxY){
            self.yPosition=self.maxY;
        } else {
            self.yPosition=yPos;
        }
    };
    
    this.moveH=function(amount){
        self.setXPosition(self.xPosition+amount);
    };
    
    this.moveV=function(amount){
        self.setYPosition(self.yPosition+amount);
    };

    this.move=function() {
        //check if any of its landmarks are still owned by itself.
        //also check if the player is in its territory and barks at it?

        /*
        if () {

        } else if (self.landmark1.owner == self.dogID &&
        self.landmark2.owner == self.dogID &&
        self.landmark3.owner == self.dogID &&
        self.landmark4.owner == self.dogID) {
            //randomly move around territory, calling moveH and moveV
        } else if (self.landmark1.owner != self.dogID) {
            //move towards it and pee on it?
        } else if (self.landmark2.owner != self.dogID) {
            //move towards it
        } else if (self.landmark3.owner != self.dogID) {
            //move towards it
        } else if (self.landmark4.owner != self.dogID) {
            //move towards it
        } else {
            //make sure it's located in kennel/send it back.
            if (self.kennel.xPosition != self.xPosition && self.kennel.yPosition != self.yPosition) {
                //move it back
            }
        }
        */

    }

    this.bark=function() {

    };

    this.barkedAt=function() {

    };
    
    this.pee=function() {
        
    };

    this.initialize();

}

/*
    Landmarks: owned by dog, ownership can be taken by peeing on it, has a location,
    ownership may be taken back to the original owner from the player
    has a type if we want a variety (hydrant, squeaky toy, shrubs, etc)
*/
var landmark = function(lID, dogID, xPos, yPos, type) {
    var self=this;
    this.yPosition=yPos;
    this.xPosition=xPos;
    this.originalowner=dogID;
    this.owner=dogID;
    this.type=type;
    this.landmarkID = lID;
    
    this.options={

    }

    this.initialize=function(){
        self.owner=self.originalowner;
    };

    this.initialize();
}

/*
    Kennels: owned by dog, ownership can not be taken, has a location
    may want to have a few colors for different dogs...
    maybe pick your dog's kennel color or something
*/
var kennel = function(dogID, xPos, yPos) {
    var self=this;
    this.yPosition=yPos;
    this.xPosition=xPos;
    this.owner = dogID;
    this.options={

    }

    this.initialize=function(){

    };

    this.initialize();
}
