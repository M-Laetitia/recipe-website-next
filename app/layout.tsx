import type { Metadata } from "next";

import Nav from '@/components/Nav';
import "../styles/globals.css";
import { josefin } from "@/src/app/utils/fonts";
import { cursive } from "@/src/app/utils/fonts";


export const metadata: Metadata = {
  title: "Recipe",
  description: "Exercice Recipe NextJS ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={`${josefin_init.variable} ${birthstone_init.variable}`}> */}
      <body className={`${josefin} ${cursive}`}>
        <main className="bg-slate-800 min-h-screen text-white">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
}

