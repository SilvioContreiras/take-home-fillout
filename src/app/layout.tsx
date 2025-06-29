import './globals.css';
import { nunito, inter } from './fonts';

export const metadata = {
  title: 'Fillout Form Builder',
  keywords: ['form builder', 'react forms', 'next.js forms'],
  description: 'Fillout Form Builder',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
} >) {
  return (
    <html lang="en" className={`antialiased ${nunito.variable} ${inter.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}