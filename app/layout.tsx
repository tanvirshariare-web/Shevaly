import type {Metadata} from 'next';
import { Inter, Montserrat, Playfair_Display } from 'next/font/google';
import './globals.css'; // Global styles
import { Providers } from './Providers';
import LiveChat from './LiveChat';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-logo' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'Shevaly - Bangladesh\'s Favorite Online Fashion Mall',
  description: 'Shop at Shevaly for the best fashion, cosmetics, and more.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} ${playfair.variable}`}>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          {children}
          <LiveChat />
        </Providers>
      </body>
    </html>
  );
}
