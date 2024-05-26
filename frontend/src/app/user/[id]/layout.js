"use client"

import { Inter } from "next/font/google";
import { useEffect } from "react";
import Layout from "@/app/components/Layout";
import "../../globals.css";


const inter = Inter({ subsets: ["latin"] });




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

