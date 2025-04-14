"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/multiplication", label: "Multiplication" },
    { href: "/division", label: "Division" },
    { href: "/addition", label: "Addition" },
    { href: "/subtraction", label: "Subtraction" },
  ];

  return (
    <html lang="en">
      <head>
        <title>Math Practice</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${inter.className} bg-[#CCE5FF] min-h-screen flex flex-col`}>
        <header className="bg-[#99CCFF] shadow-md relative z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              {/* Logo/Title */}
              <div className="flex-shrink-0 flex items-center">
                <span className="text-lg font-semibold">Math Practice</span>
              </div>
              
              {/* Desktop navigation - hidden on mobile and tablet */}
              <nav className="hidden lg:flex space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={clsx(
                      'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      pathname === link.href
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-blue-500 hover:text-white'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Burger menu button - visible on mobile and tablet */}
              <div className="flex items-center lg:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-blue-800 hover:text-white hover:bg-blue-500 focus:outline-none"
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-expanded={menuOpen}
                >
                  <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
                  {/* Icon when menu is closed */}
                  {!menuOpen ? (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  ) : (
                    /* Icon when menu is open */
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile and tablet menu, show/hide based on menu state */}
          <div className={`${menuOpen ? 'block' : 'hidden'} lg:hidden`}>
            <div className="px-2 pt-2 pb-3 space-y-1 shadow-lg">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'block px-3 py-2 rounded-md text-base font-medium',
                    pathname === link.href
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-blue-500 hover:text-white'
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col justify-center items-center px-4 py-6 sm:px-6 sm:py-8">
          {children}
        </main>

        <footer className="bg-[#99CCFF] py-4 px-4 mt-auto text-center">
          <p>© {new Date().getFullYear()} Math Practice App</p>
        </footer>
      </body>
    </html>
  );
}
