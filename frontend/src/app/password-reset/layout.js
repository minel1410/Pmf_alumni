import { Inter } from 'next/font/google';
import '../globals.css';
import '../auth/auth.css';
import { motion } from 'framer-motion';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'PMF Alumni | Password recovery',
  description: 'Registracija za PMF Alumni zajednicu - pridružite se mreži alumnae Prirodno-matematičkog fakulteta Univerziteta u Sarajevu.',
};

export default function RootLayout({ children }) {
  return (

      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </head>
        <body className="w-full h-screen flex justify-center items-center">
          {children}
        </body>
      </html>
  );
}
