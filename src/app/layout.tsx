import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import LocalFont from 'next/font/local';
import { SpeedInsights } from '@vercel/speed-insights/next';

import '../styles/globals.css';
import '@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css';
import 'react-clock/dist/Clock.css';

import { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';

import { ThemeProvider } from '@/components/theme-provider';
import { TailwindIndicator, Toaster } from '@/components/ui';
import { cn } from '@/utils/cn';

import '../styles/wheel-picker.css';

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
          <TailwindIndicator />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <Suspense>
          <Toaster closeButton />
        </Suspense>
      </body>
    </html>
  );
}
