"use client"
import Layout from "../components/Layout"
import "../../app/globals.css"

/* export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
} */

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}
