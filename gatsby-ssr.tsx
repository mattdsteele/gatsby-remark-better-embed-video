import React from 'react';
import type { RenderBodyArgs } from 'gatsby';
export const onRenderBody = ({ setHeadComponents }: RenderBodyArgs) => {
  const youtube = (
    <script key="yt" type="module" src="/static/lite-youtube.js" />
  );
  const vimeo = (
    <script key="vimeo" type="module" src="/static/lite-vimeo.js" />
  );
  setHeadComponents([youtube, vimeo]);
};
