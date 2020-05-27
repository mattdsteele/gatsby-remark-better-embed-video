import React from 'react';
export const onRenderBody = ({
  setHeadComponents,
  setHtmlAttributes,
  setBodyAttributes,
}: any) => {
  const youtube = (
    <script
      key="yt"
      type="module"
      src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@0.8.0/lite-youtube.js"
    />
  );
  const vimeo = (
    <script
      key="vimeo"
      type="module"
      src="https://cdn.jsdelivr.net/npm/@slightlyoff/lite-vimeo@0.1.1/lite-vimeo.js"
    />
  );
  setHeadComponents([youtube, vimeo]);
};
