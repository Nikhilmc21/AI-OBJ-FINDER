status_m="";
objects=[];
sound="";
function preload(){
    video = createCapture(VIDEO);
    video.hide();
    sound = loadSound("alarm.mp3");
}
function setup(){
    canvas= createCanvas(620,530);
    canvas.center();
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}
function start(){
    modelvar = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("what").innerHTML = "Detecting Objects...";
    desiredvalue=document.getElementById("gettext").value;
}
function draw(){
    image(video, 0, 0, 620, 530);
    if(status_m != ""){
        modelvar.detect(video, gotResult);
        document.getElementById("what").innerHTML="Object Detected";
        for(i=0; i<objects.length; i++){
            if (objects[i].label == desiredvalue){
                document.getElementById("status").innerHTML=desiredvalue+" Detected";
                fill("red");
                percent = floor(objects[i].confidence*100);
                text(objects[i].label, objects[i].x+15, objects[i].y+15);
                noFill();
                stroke("red");
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
            else{
                document.getElementById("what").innerHTML="Cannot find desired object";
                document.getElementById("status").innerHTML="";
                sound.play();
                sound.loop();

            }
        }
    }
}
function modelLoaded(){
    console.log("Model is Loaded");
    status_m=true;
}
