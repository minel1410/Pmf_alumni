import { Inter } from "next/font/google";
import "../../globals.css";
import Nav from "../../components/Nav";
import Sidebar from "../../components/Sidebar"


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PMF Alumni | Authentication",
  description: "Registracija za PMF Alumni zajednicu - pridružite se mreži alumnae Prirodno-matematičkog fakulteta Univerziteta u Sarajevu.",
};



export default function RootLayout({ children }) {
  return (
    <html>
      <body>
      
<Nav></Nav>
<Sidebar></Sidebar>




<div class="p-4 sm:ml-64 w-full h-full">
   <div class="p-4 mt-14 w-full">
    {children}
   </div>
</div>

      </body>
    </html>
  );
}

