window.onload=init;

const startGame = document.querySelector('.start-game');
startGame.addEventListener('click',startLoop);
const stopGame = document.querySelector('.stop');
stopGame.addEventListener('click',stopLoop);

var canvas;
var ctx;
var box;
var ctxBox;
var isPlaing;
var boxes=[];

var setTime;

var mouseX;
var mouseY;

var score =document.querySelector('.score');
var kicks=0;

document.addEventListener('mousemove',mouseMove);
document.addEventListener('click',mouseClick);



var requestAnimFrame = window.mozRequestAnimationFrame||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame;
function mouseMove(e) {
    mouseX=e.pageX-canvas.offsetLeft;
    mouseY=e.pageY-canvas.offsetTop;
}
function mouseClick(e) {
    for(var i=0;i<boxes.length;i++){
        if(mouseX>boxes[i].drawX&&
            mouseY>boxes[i].drawY&&
            mouseX<boxes[i].drawX+20&&
            mouseY<boxes[i].drawY+20){
            kicks++;
            score.textContent=kicks;
            boxes.splice(i,1);
            }
    }
}

function init() {
    canvas = document.getElementById("canvas");
    ctx= canvas.getContext("2d");
    box = document.getElementById("box");
    ctxBox= box.getContext("2d");


}

function draw() {
    clearCtxBox();
    for(var i=0; i<boxes.length;i++){
        boxes[i].draw();
    }
}
function update() {
    for(var i=0; i<boxes.length;i++){
        boxes[i].update();
    }
}
function spawnBoxes() {
    boxes.push(new myBox());
}
function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}


myBox.prototype.destroy=function () {
    boxes.splice(boxes.indexOf(this),1);
}

function loop() {
    if(isPlaying){
        draw();
        update();
        requestAnimFrame(loop);
    }
}
function startLoop() {
    isPlaying=true;
    kicks=0;
    score.textContent = 0;
    loop();
    startCreatingBoxes();
}
function stopLoop() {
    isPlaying=false;
    ctxBox.clearRect(0,0, 640,480);
    boxes=[];
}

function myBox() {
    this.drawX=Math.floor(Math.random()*480);
    this.drawY=-15;
    this.color=getRandomColor();
}
function clearCtxBox() {
    ctxBox.clearRect(0,0, 640,480);
}

myBox.prototype.draw= function () {
    ctxBox.fillStyle=this.color;  //ЗДЕСЬ РАНДОМ ФОН
    ctxBox.fillRect(this.drawX,this.drawY,20,20);
}
myBox.prototype.update= function () {
    this.drawY+=randomInteger(0,5);
    if (this.drawY>640){
        this.destroy();
    }
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function startCreatingBoxes() {
    if (isPlaying){
        setTime= setTimeout(function(){
            spawnBoxes();
            startCreatingBoxes();
        }, 2000)
    }else{
        stopSetTime();
    }
}

function stopSetTime() {
    clearTimeout(setTime);
}