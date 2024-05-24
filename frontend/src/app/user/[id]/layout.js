import { Inter } from "next/font/google";
import Layout from "@/app/components/Layout";
import "../../globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PMF Alumni | Authentication",
  description: "Registracija za PMF Alumni zajednicu - pridružite se mreži alumnae Prirodno-matematičkog fakulteta Univerziteta u Sarajevu.",
};



export default function RootLayout({ children }) {
  return (
    <html>
      <body>
      

        <Layout>
            {children}
        </Layout>




      </body>
    </html>
  );
}

