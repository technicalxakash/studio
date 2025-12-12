import type { Metadata } from 'next';
import { PT_Sans, Source_Code_Pro, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-code',
});

export const metadata: Metadata = {
  title: 'MediSys AI',
  description: 'A complete hospital system with AI-powered features.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${ptSans.variable} ${spaceGrotesk.variable} ${sourceCodePro.variable}`}
    >
      <body className={cn('font-sans antialiased')}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
