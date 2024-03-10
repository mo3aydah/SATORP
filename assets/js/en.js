var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

// Set canvas dimensions
var canvasWidth = 1661;
var canvasHeight = 1661;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

var imageObj = new Image();

// It's good practice to set the src attribute after defining onload.
imageObj.onload = function() {
    // Ensure the canvas and the image have the same dimensions for proper scaling
    context.drawImage(imageObj, 0, 0, canvasWidth, canvasHeight);
};
imageObj.src = "assets/images/ramadan.jpg"; // Make sure this path is correct and accessible

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
    // Clear canvas from text and draw image Regards,
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.drawImage(imageObj, 0, 0, canvasWidth, canvasHeight);

    var text = document.getElementById('name').value;

    // Custom font
    context.textAlign = 'center';
    context.font = "40pt Calibri";

    // Text color
    context.fillStyle = '#2D378E';

    // Calculate center for the text
    var textWidth = canvasWidth / 2;
    var textHeight = canvasHeight - 170; // Adjust based on where you want the text
    
    context.fillText(text, textWidth, textHeight);

    e.preventDefault();
    document.getElementById('name').value = "";

    // Download the image
    DownloadCanvasAsImage();
});
