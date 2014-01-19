videoSequence = (function(){

    return {

        queue: [],

        sequence: [],

        scene: 0,

        playing: null,

        /**
         * @param $video  Required  JQuery video element
         * @param scenes  Required
         * @param chains  Optional  Array
         *
         * @returns {Function}
         */
        next: function($video, scenes) {
            if (arguments.length > 2) {
                var chains = arguments[2];
            } else {
                var chains = [];
            }
            return function() {
                if (this.queue.length > 0) {
                    var f = this.queue.shift();
                    if ('playRandomVideo' == f) {
                        videoSequence[f]($video, scenes, this.scene);
                    }
                    else if('playChainedVideo' == f) {
                        videoSequence[f]($video, scenes, this.scene, chains);
                    }
                }
            }
        },

        /**
         * @param $video         Required  JQuery video element
         * @param scenes         Required
         * @param sceneCriteria  Optional  Int
         */
        playRandomVideo: function($video, scenes) {
            if (arguments.length > 2) {
                var sceneCriteria = parseInt(arguments[2]);
            } else {
                var sceneCriteria = this.getRandomInt(0, scenes.length);
            }

            if (sceneCriteria >= scenes.length) {
                sceneCriteria = this.getRandomInt(0, scenes.length);
            }

            var videoCriteria = this.getRandomInt(0, scenes[sceneCriteria].length - 1);
            this.switchVideo($video, scenes, sceneCriteria, videoCriteria);
        },

        /**
         * @param $video         Required  JQuery video element
         * @param scenes         Required
         * @param sceneCriteria  Required  Int
         * @param chains         Required  Array
         */
        playChainedVideo: function($video, scenes, sceneCriteria, chains) {
            for (var i in chains[sceneCriteria]) {
                var link = chains[sceneCriteria][i];
                if (this.sequence[link[0]] == link) {
                    this.switchVideo($video, scenes, sceneCriteria, i);
                    break;
                }
                console.error('no matching video chain found');
            }
        },

        /**
         * @param $video         Required  JQuery video element
         * @param scenes         Required
         * @param sceneCriteria  Required  Int
         * @param videoCriteria  Required  Int
         */
        switchVideo: function($video, scenes, sceneCriteria, videoCriteria) {
            var basename = scenes[sceneCriteria][videoCriteria];
            var mp4Filename = 'video/' + basename + '.mp4';
            var webmFilename = ''; // todo
            $video.find('#mp4-source').attr('src', mp4Filename);
            $video.find('#webm-source').attr('src', webmFilename); // todo
            $video.load();
            this.sequence.push([sceneCriteria, videoCriteria]);
            this.playing = [sceneCriteria, videoCriteria];
            this.scene = this.scene + 1;
        },

        /**
         * @param $video        Required  JQuery video element
         * @param aspectRatioX  Required  Int
         * @param aspectRatioY  Required  Int
         */
        resizeVideo: function($video, aspectRatioX, aspectRatioY) {
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
        },

        /**
         * @param min  Required  Int
         * @param max  Required  Int
         *
         * @returns {number}
         */
        getRandomInt: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
}());
