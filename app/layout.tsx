import './globals.css';

import { GeistSans } from 'geist/font/sans';

let title = 'Next.js + SQL Auth Starter';
let description =
  'This is a Next.js starter kit that uses NextAuth.js for simple email + password login and a SQL database to persist the data.';

export const metadata = {
  title,
  description,//25021007 010625
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.variable}>{children}</body>
    </html>
  );
}
