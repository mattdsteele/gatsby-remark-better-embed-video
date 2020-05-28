<div align="center">

  <h1><code>gatsby-remark-embed-video-lite</code></h1>

[![npm](https://img.shields.io/npm/dt/gatsby-remark-embed-video-lite.svg?style=flat)](https://www.npmjs.com/package/gatsby-remark-embed-video-lite)

</div>

<div align="center">
<table width='100%' align="center">
    <tr>
        <td align='left' width='100%' colspan='2'>
            <strong><code>gatsby-remark-embed-video-lite</code></strong><br />
            📺 Embed a Youtube Video in your Markdown using high-performance web components
        </td>
    </tr>
</table>
</div>

<br>

Embed a Youtube or Vimeo video in your Markdown, using high-performance web components

Inspired by [gatsby-remark-embed-video](https://github.com/ahmadawais/gatsby-remark-better-embed-video)

## Install

1. Install plugin to your site:

```sh
npm i gatsby-remark-embed-video-lite
```

2. Add following to your `gatsby-config.js`:

```js
    plugins: [
      {
        resolve: "gatsby-transformer-remark",
        options: {
          plugins: [
          {
            resolve: "gatsby-remark-embed-video-lite",
          }
          ]
        }
      },
```

Uses the following components under the hood:

- https://www.npmjs.com/package/@justinribeiro/lite-youtube
- https://www.npmjs.com/package/@slightlyoff/lite-vimeo

3. Restart gatsby.

## Usage

```markdown
# Look at this Video:

`youtube: https://www.youtube.com/watch?v=2Xc9gXyf2G4`
`youtube: 2Xc9gXyf2G4`

`vimeo: https://vimeo.com/5299404`
`vimeo: 5299404`
```

## License

MIT
