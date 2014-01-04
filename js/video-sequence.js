videoSequence = (function(){

    return {

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
        },

        /**
         * @param $video         Required  JQuery video element
         * @param scenes         Required
         * @param sceneCriteria  Optional  Int
         */
        switchToRandomVideo: function($video, scenes) {
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
