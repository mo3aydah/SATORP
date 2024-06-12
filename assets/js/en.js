var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");


var canvasWidth = 1080;
var canvasHeight = 1080;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

var imageObj = new Image();


imageObj.onload = function() {
   
    context.drawImage(imageObj, 0, 0, canvasWidth, canvasHeight);
};
imageObj.src = "assets/images/employee-Eid-Greetings-English.jpg"; 

function DownloadCanvasAsImage(){
    let imageName = "moa3aydah.png";
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', imageName);
    canvas.toBlob(function(blob) {
        let url = URL.createObjectURL(blob);
        downloadLink.setAttribute('href', url);
        downloadLink.click();
    });
}

var downloadCardButton = document.getElementById('downloadCard');
downloadCardButton.addEventListener('click', function(e){
   
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.drawImage(imageObj, 0, 0, canvasWidth, canvasHeight);

    var text = document.getElementById('name').value;

   
    context.textAlign = 'center';
    context.font = "35pt Calibri";


    context.fillStyle = '#FFFFFF';

   
    var textWidth = canvasWidth / 2;
    var textHeight = canvasHeight - 200; 
    
    context.fillText(text, textWidth, textHeight);

    e.preventDefault();
    document.getElementById('name').value = "";

 
    DownloadCanvasAsImage();
});
