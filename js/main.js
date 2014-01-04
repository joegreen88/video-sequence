$(document).ready(function(){

    var $video = $('#video');
    var aspectRatio = {X: 16, Y: 9};

    videoSequence.resizeVideo($video, aspectRatio.X, aspectRatio.Y);

    $(window).resize(function(){
        videoSequence.resizeVideo($video, aspectRatio.X, aspectRatio.Y);
    });

    var scenes = [
        [
            'MVI_9027',
            'MVI_9028',
            'MVI_9029'
        ],
        [
            'MVI_9038',
            'MVI_9041',
            'MVI_9043'
        ],
        [
            'MVI_9044',
            'MVI_9047',
            'MVI_9054'
        ]
    ];

    var chains = [
        null,
        null,
        [
            [0, 0],
            [0, 1],
            [0, 2]
        ]
    ];

    $video.on('ended', videoSequence.next($video, scenes, chains));

    videoSequence.queue.push('playRandomVideo');
    videoSequence.queue.push('playRandomVideo');
    videoSequence.queue.push('playChainedVideo');

    $video.play();

});