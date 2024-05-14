import { Inter } from "next/font/google";
import "../globals.css";
import "../auth/auth.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PMF Alumni | Password recovery",
  description: "Registracija za PMF Alumni zajednicu - pridružite se mreži alumnae Prirodno-matematičkog fakulteta Univerziteta u Sarajevu.",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="w-full h-screen flex justify-center items-center">
        {children}
      </body>
    </html>
  );
}
