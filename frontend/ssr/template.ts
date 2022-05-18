export default function renderHTML(html: any, style: any, title?: string) {
  return `
    <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>${title}</title>
        ${style}
      </head>
      <body>
        <script>
        </script>
        <div id="root">${html}</div>
        <div id="notification"></div>
      </body>
    </html>
  `;
}
