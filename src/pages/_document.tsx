import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#0A0A0A" />
        <meta name="color-scheme" content="dark light" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="sMbq93NQtintZcX4NQ7H2w" async></script>
        {/* Prevent FOUC by applying theme before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const shouldBeLightTheme = theme === 'light' || (!theme && !prefersDark);
                const html = document.documentElement;
                
                // Prevent FOUC transition fade
                document.documentElement.classList.add('disable-transitions');
                
                // Ensure no conflicting classes
                html.classList.remove('dark');
                
                if (shouldBeLightTheme) {
                  html.classList.add('light');
                  document.documentElement.style.colorScheme = 'light';
                } else {
                  html.classList.remove('light');
                  document.documentElement.style.colorScheme = 'dark';
                }
              } catch (e) {
                console.error('Theme init error:', e);
              }
            `
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </Head>
      <body className="bg-background text-foreground transition-colors" style={{
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
      }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
