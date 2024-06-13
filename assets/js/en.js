var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var canvasWidth = 1080;
var canvasHeight = 1272;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

var imageObj = new Image();

// Add console logs for debugging
imageObj.onload = function() {
    console.log('Image loaded successfully');
    context.drawImage(imageObj, 0, 0, canvasWidth, canvasHeight);
};
imageObj.onerror = function() {
    console.error('Failed to load image.');
};
imageObj.src = "assets/images/employee-Eid-Greetings-English.jpg"; // Adjust the image source for the Arabic version

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

    // Check if the input text contains Arabic characters
    var arabic = /[\u0600-\u06FF]/;
    if (arabic.test(text)) {
        context.font = "35pt 'Bahij_TheSansArabic-Bold'";
    } else {
        context.font = "35pt Calibri";
    }
    
    context.textAlign = 'center';
    context.fillStyle = '#FFFFFF';
    var textWidth = canvasWidth / 2;
    var textHeight = canvasHeight - 200; 
    
    // Draw the text
    context.fillText(text, textWidth, textHeight);

    e.preventDefault();
    document.getElementById('name').value = "";

    DownloadCanvasAsImage();
});
