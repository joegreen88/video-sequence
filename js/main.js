$(document).ready(function(){

    var aspectRatio = {X: 16, Y: 9};
    videoSequence.resizeVideo($('#video'), aspectRatio.X, aspectRatio.Y);

    $(window).resize(function(){
        videoSequence.resizeVideo($('#video'), aspectRatio.X, aspectRatio.Y);
    });

});