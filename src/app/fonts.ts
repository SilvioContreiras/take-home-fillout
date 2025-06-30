import { Nunito, Inter } from 'next/font/google';

export const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  // display: 'swap',
});

export const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  // display: 'swap',
});