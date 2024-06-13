var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var imageWidth = 1080;
var imageHeight = 1272;
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

    // Check if the input text contains Arabic characters
    var arabic = /[\u0600-\u06FF]/;
    if (arabic.test(text)) {
        context.font = "35pt 'Bahij_TheSansArabic-Bold'";
    } else {
        context.font = "35pt Calibri";
    }
    
    context.textAlign = 'center';
    context.fillStyle = '#FFFFFF';
    var textX = imageWidth / 2; 
    var textY = 1000; 

    // Draw the text
    context.fillText(text, textX, textY);

    e.preventDefault();
    document.getElementById('name').value = "";

    DownloadCanvasAsImage();
});
