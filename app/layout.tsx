import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { MouseTrailProvider } from '@/components/providers/mouse-trail-provider';

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-space-grotesk',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Chronos - Time Travel Dashboard',
  description: 'Advanced time travel control system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link 
          rel="preload" 
          href={spaceGrotesk.variable} 
          as="font" 
          crossOrigin="anonymous" 
        />
      </head>
      <body className={`${spaceGrotesk.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="chronos-theme"
        >
          <MouseTrailProvider>
            {children}
            <Toaster />
          </MouseTrailProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}