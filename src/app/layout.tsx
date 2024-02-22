import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import LocalFont from 'next/font/local';

import '../styles/globals.css';

import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/utils/cn';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});
const fontCal = LocalFont({
  src: '../styles/calsans.ttf',
  variable: '--font-cal',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen font-sans antialiased',
          fontSans.variable,
          fontCal.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
