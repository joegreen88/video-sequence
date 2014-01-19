$(document).ready(function(){

    var $video = $('#video');

    var aspectRatio = {X: 16, Y: 9};

    videoSequence.resizeVideo($video, aspectRatio.X, aspectRatio.Y);

    $(window).resize(function(){
        videoSequence.resizeVideo($video, aspectRatio.X, aspectRatio.Y);
    });

    var randomScenes = videoSequence.randomizeListOrder([
        '8e7a',
        '67e6',
        'ccdf',
        'dec3'
    ]);

    var scenes = [];
    for (i in randomScenes) {
        scenes.push([randomScenes[i]]);
    }

    console.log(scenes);

    $video.on('ended', videoSequence.next($video, scenes));

    videoSequence.queue.push('playNextVideo');
    videoSequence.queue.push('playNextVideo');
    videoSequence.queue.push('playNextVideo');
    videoSequence.queue.push('playNextVideo');

    $video.trigger('ended');

});