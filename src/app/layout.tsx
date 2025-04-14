"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <head><title>Multiplication</title></head>
      <body className={`${inter.className} bg-[#CCE5FF] min-h-screen flex flex-col `}>
        <header className="flex gap-[20px] p-[10px] bg-[#99CCFF]">
          <Link
            href="/multiplication"
            className={clsx(
              'px-3 py-1 rounded transition-colors hover:bg-blue-500 hover:text-white',
              pathname === '/multiplication' ? 'bg-blue-600 text-white' : ''
            )}
          >
            Multiplication
          </Link>
          <Link
            href="/division"
            className={clsx(
              'px-3 py-1 rounded transition-colors hover:bg-blue-500 hover:text-white',
              pathname === '/division' ? 'bg-blue-600 text-white' : ''
            )}
          >
            Division
          </Link>
          <Link
            href="/addition"
            className={clsx(
              'px-3 py-1 rounded transition-colors hover:bg-blue-500 hover:text-white',
              pathname === '/addition' ? 'bg-blue-600 text-white' : ''
            )}
          >
            Addition
          </Link>
          <Link
            href="/subtraction"
            className={clsx(
              'px-3 py-1 rounded transition-colors hover:bg-blue-500 hover:text-white',
              pathname === '/subtraction' ? 'bg-blue-600 text-white' : ''
            )}
          >
            Subtraction
          </Link>
        </header>
        <main className="flex-1 flex flex-col justify-center items-center px-[10px] py-[20px]">{children}</main>
        <footer className="p-[10px] bg-[#99CCFF] mt-auto">TBD...</footer>
      </body>
    </html>
  );
}
