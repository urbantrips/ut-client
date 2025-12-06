import type { Metadata } from 'next';
import { Montserrat, Dancing_Script } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-dancing-script',
});

export const metadata: Metadata = {
  title: 'Urban Trips',
  description: 'Discover amazing urban destinations',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} ${dancingScript.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

