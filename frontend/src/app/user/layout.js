import { Inter } from "next/font/google";
import "../globals.css";
import MaxWidthWrapper from "../components/MaxWidthWrapper";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PMF Alumni | Authentication",
  description: "Registracija za PMF Alumni zajednicu - pridružite se mreži alumnae Prirodno-matematičkog fakulteta Univerziteta u Sarajevu.",
};



export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}

