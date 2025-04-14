import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Make sure Tailwind CSS is included */}
        <link rel="stylesheet" href="/simple-calculation/_next/static/css/app/globals.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
