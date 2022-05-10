song = "";
left_Wrist_x = "" ;
right_Wrist_x = "" ;

left_Wrist_y = "" ;
right_Wrist_y = "" ;

leftWristScore = "" ;
rightWristScore = "" ;

function preload() {
    song = loadSound("music.mp3")
}

function setup() {
     canvas = createCanvas(600,500);
     canvas.center();

     video = createCapture(VIDEO);
     video.hide();

     poseNet = ml5.poseNet(video, modelLoaded);
     poseNet.on("pose",gotPosses);

}

 function modelLoaded() {
     console.log('Model is Loaded');
 }

 function gotPosses(results) {
     if (results.length>0) {
         console.log(results);
         left_Wrist_x = results[0].pose.leftWrist.x;
         left_Wrist_y = results[0].pose.leftWrist.y;

         right_Wrist_x = results[0].pose.rightWrist.x;
         right_Wrist_y = results[0].pose.rightWrist.y;

        console.log("Left wrist x is "+ left_Wrist_x + " and Right wrist x is "+right_Wrist_x);
        console.log("Left wrist y is "+ left_Wrist_y + " and Right wrist y is "+right_Wrist_y);
        leftWristScore = results[0].pose.keypoints[9].score ; 
        rightWristScore = results[0].pose.keypoints[10].score ; 
        console.log(leftWristScore);
        console.log(rightWristScore);
     }
 }

 function draw() {
     image(video,0,0,600,500);
     fill("#384a59");
     stroke("#fa8682");

     if (leftWristScore>0.2) {
         circle(left_Wrist_x,left_Wrist_y,20);
         nolwy = Number(left_Wrist_y);
         decimaly = floor(left_Wrist_y);
         volume = decimaly/500;
         song.setVolume(volume);
         document.getElementById("volume").innerHTML = "Volume : " + volume

     if (rightWristScore>0.2) {
         circle(right_Wrist_x,right_Wrist_y,20);
         if (right_Wrist_y>0 && right_Wrist_y<=100) {
             song.rate(0.5);
             document.getElementById("speed").innerHTML = "Speed : 0.5x"
         }

         if (right_Wrist_y>100 && right_Wrist_y<=200) {
            song.rate(1);
            document.getElementById("speed").innerHTML = "Speed : 1x"
        }

        if (right_Wrist_y>200 && right_Wrist_y<=300) {
            song.rate(1.5);
            document.getElementById("speed").innerHTML = "Speed : 1.5x"
        }

        if (right_Wrist_y>300 && right_Wrist_y<=400) {
            song.rate(2);
            document.getElementById("speed").innerHTML = "Speed : 2x"
        }

        if (right_Wrist_y>400 && right_Wrist_y<=500) {
            song.rate(2.5);
            document.getElementById("speed").innerHTML = "Speed : 2.5x"
        }

        

     }    

        }
 }

  function play() {
      song.play();
      song.setVolume(1);
      song.rate(1);
  }


  function stop() {
      song.stop();
  }