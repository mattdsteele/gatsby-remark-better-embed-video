"use strict";
/// <reference path="EmbedVideo.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbedVideo = exports.getKnownPlatforms = void 0;
const url_1 = require("url");
const getVideoId = require('get-video-id');
const VideoServices = {
    YOUTUBE: 'youtube',
    VIMEO: 'vimeo',
    VIDEOPRESS: 'videopress',
    TWITCH: 'twitch',
    TWITCHLIVE: 'twitchlive',
};
exports.getKnownPlatforms = () => {
    return Object.keys(VideoServices).map((val) => VideoServices[val]);
};
class EmbedVideo {
    constructor(type, id, options) {
        this.type = type;
        this.id = id;
        this.knownPlatforms = exports.getKnownPlatforms();
        let defaultOptions = {
            width: 560,
            ratio: 1.77,
            related: false,
            noIframeBorder: false,
            showInfo: true,
        };
        this.options = { ...defaultOptions, ...options };
        if (!this.options.height) {
            this.options.height = Math.round(this.options.width / this.options.ratio);
        }
    }
    getHTML() {
        try {
            let videoId = this.readVideoId();
            let url = this.createUrl(videoId.service, videoId.id);
            let componentHtml = this.createComponent(videoId.service, url);
            return componentHtml;
        }
        catch (e) {
            return `<p style="color: red">Error: ${e.message}</p>`;
        }
    }
    getTwitchId(input) {
        let url;
        try {
            url = new url_1.URL(input);
            if (url.origin == 'https://player.twitch.tv') {
                let videoParam = url.searchParams.get('video');
                if (videoParam !== null) {
                    return {
                        id: videoParam,
                        service: VideoServices.TWITCH,
                    };
                }
                let channelParam = url.searchParams.get('channel');
                if (channelParam !== null) {
                    return {
                        id: channelParam,
                        service: VideoServices.TWITCHLIVE,
                    };
                }
            }
            if (url.origin == 'https://www.twitch.tv') {
                let pathSplit = url.pathname.split('/');
                if (pathSplit.length >= 2) {
                    if (pathSplit[1] === 'videos') {
                        if (pathSplit.length > 2) {
                            return {
                                id: `v${pathSplit[2]}`,
                                service: VideoServices.TWITCH,
                            };
                        }
                    }
                    else {
                        return {
                            id: pathSplit[1],
                            service: VideoServices.TWITCHLIVE,
                        };
                    }
                }
            }
        }
        catch (e) {
            return {};
        }
        return {};
    }
    readVideoId() {
        let videoId = getVideoId(this.id);
        if (videoId.id === undefined) {
            videoId = this.getTwitchId(this.id);
        }
        if (videoId.id === undefined) {
            if (this.type === 'video') {
                throw new TypeError('Id could not be processed');
            }
            else {
                return {
                    id: this.id,
                    service: this.type.toLowerCase(),
                };
            }
        }
        return videoId;
    }
    createUrl(service, videoId) {
        if (service === VideoServices.TWITCH && !videoId.startsWith('v')) {
            videoId = `v${videoId}`;
        }
        const urls = {
            youtube: `https://www.youtube.com/embed/${videoId}`,
            vimeo: `https://player.vimeo.com/video/${videoId}`,
            videopress: `https://videopress.com/embed/${videoId}`,
            twitch: `https://player.twitch.tv/?autoplay=false&video=${videoId}`,
            twitchlive: `https://player.twitch.tv/?channel=${videoId}`,
        };
        const url = new url_1.URL(urls[service]);
        if (!url) {
            throw new TypeError('Unknown Video Service');
        }
        const liteServices = [VideoServices.YOUTUBE, VideoServices.VIMEO];
        if (liteServices.includes(service)) {
            return videoId;
        }
        return url.toString();
    }
    createComponent(videoPlatform, videoId) {
        switch (videoPlatform) {
            case VideoServices.YOUTUBE: {
                return ` <lite-youtube class="lite-video" videoid="${videoId}"></lite-youtube> `;
            }
            case VideoServices.VIMEO: {
                return `<lite-vimeo class="lite-video" videoid="${videoId}"></lite-vimeo>`;
            }
        }
        let iframeNode = `<iframe
              width="${this.options.width}"
              height="${this.options.height}"
              src="${videoId}"
              class="embedVideoIframe test-1"
              allowfullscreen
            ></iframe>`;
        if (this.options.noIframeBorder) {
            iframeNode += `
      <style>
        .embedVideoIframe {
          border: 0
        }
      </style>`;
        }
        if (videoPlatform === VideoServices.VIDEOPRESS) {
            iframeNode += `<script src="https://videopress.com/videopress-iframe.js"></script>`;
        }
        return iframeNode;
    }
}
exports.EmbedVideo = EmbedVideo;
