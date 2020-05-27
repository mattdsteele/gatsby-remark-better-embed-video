"use strict";
const EmbedVideo_1 = require("./EmbedVideo");
const util_1 = require("util");
const fs_1 = require("fs");
const visit = require(`unist-util-visit`);
const addVideoIframe = ({ markdownAST }, options) => {
    visit(markdownAST, `inlineCode`, (node) => {
        const { value } = node;
        let knownPlatforms = EmbedVideo_1.getKnownPlatforms();
        let keywords = [...knownPlatforms, 'video'].join('|');
        let re = new RegExp(`\(${keywords}\):\(\.\*\)`, 'i');
        const processValue = value.match(re);
        if (processValue) {
            let type = processValue[1];
            let id = processValue[2];
            id = id.trim();
            let embedVideo = new EmbedVideo_1.EmbedVideo(type, id, options);
            node.type = `html`;
            node.value = embedVideo.getHTML();
        }
    });
    const copy = util_1.promisify(fs_1.copyFile);
    // return Promise.all([
    //   copy(
    //     resolve(
    //       'node_modules/gatsby-remark-embed-video-lite/node_modules/@justinribeiro/lite-youtube/lite-youtube.js'
    //     ),
    //     'public/js/lite-youtube.js'
    //   ),
    //   copy(
    //     resolve(
    //       'node_modules/gatsby-remark-embed-video-lite/node_modules/@slightlyoff/lite-vimeo/lite-vimeo.js'
    //     ),
    //     'public/js/lite-vimeo.js'
    //   ),
    // ]);
};
module.exports = addVideoIframe;
