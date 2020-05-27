import { EmbedVideo, getKnownPlatforms } from './EmbedVideo';
import { promisify } from 'util';
import { copyFile } from 'fs';
import { resolve } from 'path';

const visit = require(`unist-util-visit`);

const addVideoIframe = ({ markdownAST }: any, options: EmbedVideoOptions) => {
  visit(markdownAST, `inlineCode`, (node: { type: string; value: string }) => {
    const { value } = node;
    let knownPlatforms = getKnownPlatforms();
    let keywords = [...knownPlatforms, 'video'].join('|');
    let re = new RegExp(`\(${keywords}\):\(\.\*\)`, 'i');

    const processValue = value.match(re);
    if (processValue) {
      let type = processValue[1];
      let id = processValue[2];
      id = id.trim();

      let embedVideo = new EmbedVideo(type, id, options);

      node.type = `html`;
      node.value = embedVideo.getHTML();
    }
  });
  const copy = promisify(copyFile);
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

export = addVideoIframe;
