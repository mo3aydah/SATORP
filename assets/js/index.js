var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");


var imageWidth = 1080;
var imageHeight = 1080;
canvas.width = imageWidth;
canvas.height = imageHeight;


var imageObj = new Image();


imageObj.onload = function() {
 
    context.drawImage(imageObj, 0, 0, imageWidth, imageHeight);
};


imageObj.src = "assets/images/employee-Eid-Greetings-Arabic-.jpg";

function DownloadCanvasAsImage(){
    let imageName = "moa3aydah.png";
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', imageName);
    let canvas = document.getElementById('myCanvas');
    canvas.toBlob(function(blob) {
        let url = URL.createObjectURL(blob);
        downloadLink.setAttribute('href', url);
        downloadLink.click();
    });
}

var downloadCardButton = document.getElementById('downloadCard');
downloadCardButton.addEventListener('click', function(e){
   
    context.clearRect(0, 0, imageWidth, imageHeight);
    context.drawImage(imageObj, 0, 0, imageWidth, imageHeight);

 
    var text = document.getElementById('name').value;

   
    context.font = "35pt Bahij";
    context.textAlign = 'center';
    context.fillStyle = '#FFFFFF';
    var textX = imageWidth / 2; 
    var textY = 900; 


    context.fillText(text, textX, textY);


    e.preventDefault();

  
    document.getElementById('name').value = "";

    DownloadCanvasAsImage();
});
