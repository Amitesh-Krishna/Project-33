const Engine = Matter.Engine,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Play = 1,
      End = 0;

var particle;
var plinkos = [];
var divisions = [];

var divisionHeight=300;
var score = 0;
var turn = 0;
var gameState = Play;

function setup() {
    createCanvas(800, 800);
    engine = Engine.create();
    world = engine.world;
    ground = new Ground(width/2,height,width,20);

    for (var k = 0; k <=width; k = k + 80) {
        divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
    }

    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }   
}
 


function draw() {
    background("black");
    textSize(20);
    // The main score
    text("Score : "+score,20,30);

    // row 1 x= 10...70
    text("500",25,650);
    // row 2 x= 90...150
    text("400",105,650);
    // row 3 x= 170...230
    text("300",185,650);
    // row 4 x= 250...310
    text("200",265,650);
    // row 5 x= 330...390
    text("100",345,650);
    // row 6 x= 410...470
    text("100",425,650);
    // row 7 x= 490...550
    text("200",505,650);
    // row 8 x= 570...630
    text("300",585,650);
    // row 9 x= 650...710
    text("400",665,650);
    // row 10 x= 730...790
    text("500",745,650);

    Engine.update(engine);
    
    for (var i = 0; i < plinkos.length; i++) {
        plinkos[i].display();
    }
    for (var k = 0; k < divisions.length; k++) {
        divisions[k].display();
    }

    if(particle!=null){
        particle.display();
        //console.log("if(particle!=null)");
        // if particle is in the buckets
        if(particle.body.position.y>760){
            //console.log("if particle is in the buckets");
            // if the particle is in hundred-zone
            if(particle.body.position.x>330 && particle.body.position.x<470){
                //console.log("if the particle is in hundred-zone");
                score+=100;
                particle = null;
                turn++;
            }
            // if the particle is in two-hundred-zone
            else if((particle.body.position.x>250 && particle.body.position.x<310)||(particle.body.position.x>490 && particle.body.position.x<550)){
                //console.log("if the particle is in two-hundred-zone");
                score+=200;
                particle = null;
                turn++;
            }
            // if the particle is in three-hundred-zone
            else if((particle.body.position.x>170 && particle.body.position.x<230)||(particle.body.position.x>570 && particle.body.position.x<630)){
                //console.log("if the particle is in three-hundred-zone");
                score+=300;
                particle = null;
                turn++;
            }
            // if the particle is in four-hundred-zone
            else if((particle.body.position.x>90 && particle.body.position.x<150)||(particle.body.position.x>650 && particle.body.position.x<710)){
                //console.log("if the particle is in four-hundred-zone");
                score+=400;
                particle = null;
                turn++;
            }
            // if the particle is in !!FIVE-hundred-zone!!
            else if((particle.body.position.x>10 && particle.body.position.x<70)||(particle.body.position.x>730 && particle.body.position.x<790)){
                //console.log("if the particle is in five-hundred-zone");
                score+=500;
                particle = null;
                turn++;
            }
            if(turn>=5){
                //console.log("game is about to end");
                gameState=End;
                particle = null;
            }
        }
    }
    if(gameState==End){
        //console.log("game ended");
        textSize(50);
        text("Game Over",width/2-100,height/2-65)
    }
}

function mousePressed(){
    if(gameState!=End){
        particle = new Particle(mouseX,10,10)
    }
}