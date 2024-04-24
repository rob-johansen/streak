import { Inter } from 'next/font/google';
import type { Metadata } from 'next'
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Streak - Rob Johansen'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="p-[100px]" id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
