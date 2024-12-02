import { Josefin_Sans, Birthstone } from "next/font/google";

const josefin_init = Josefin_Sans({ 
    subsets: ["latin"],
    weight : ['300','400'],
    variable: '--font-josefin',
});

const birthstone_init = Birthstone({ 
    subsets: ["latin"],
    weight : ['400'],
    variable: '--font-cursive',
});

export const josefin = josefin_init.variable; 
export const cursive = birthstone_init.variable; 