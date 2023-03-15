import Head from "next/head";
import React, { ReactNode } from "react"; 


type LayoutProps = {
    title?:string,
    children: ReactNode; 
}

export const Layout = ({title, children}:LayoutProps) =>{ 
return (
    <div>

        <Head> 
            <title>[{title? title:"Ecommerce" }]</title>
            <meta name="description" content="Ecommerce Wesite" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="layoutContainer"> 

            <header>

            </header>
            <main>
                {children}
            </main>
            <footer>

            </footer> 

        </div>
    </div>
)
}