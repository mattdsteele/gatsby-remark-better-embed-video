import React from 'react';
export const onRenderBody = ({
  setHeadComponents,
  setHtmlAttributes,
  setBodyAttributes,
}: any) => {
  const youtube = (
    <script key="yt" type="module" src="/static/lite-youtube.js" />
  );
  const vimeo = (
    <script key="vimeo" type="module" src="/static/lite-vimeo.js" />
  );
  setHeadComponents([youtube, vimeo]);
};
