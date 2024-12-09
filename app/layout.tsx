import type { Metadata } from "next";
// import { useEffect, useState } from 'react';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import "../styles/globals.css";
import { josefin } from "@/src/app/utils/fonts";
import { cursive } from "@/src/app/utils/fonts";

import {
  ClerkProvider
} from '@clerk/nextjs'


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
    <ClerkProvider>
      <html lang="en">
        {/* <body className={`${josefin_init.variable} ${birthstone_init.variable}`}> */}
        <body className={`${josefin} ${cursive}`}>
          <Nav />
          <main className="bg-slate-800 min-h-screen text-white">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}

