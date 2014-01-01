$(document).ready(function(){

    function resizeVideo($video, aspectRatioX, aspectRatioY) {
        var width = 0, height = 0;
        var viewportWidth = $(window).width() - 25;
        var viewportHeight = $(window).height() - 25;
        while (width <= viewportWidth && height <= viewportHeight) {
            width = width + aspectRatioX;
            height = height + aspectRatioY;
        }
        width = width - aspectRatioX;
        height = height - aspectRatioY;
        $video.width(width).height(height);
    }

    function switchVideos($video, newVideoSources) {
        // todo
    }

    var aspectRatio = {X: 16, Y: 9};
    resizeVideo($('#video'), aspectRatio.X, aspectRatio.Y);

});
