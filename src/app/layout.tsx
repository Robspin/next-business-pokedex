import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Business Pokedex",
  description: "Collect and manage your business cards"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <ClerkProvider>
          <html lang="en" className="dark">
          <body
              className={`${inter.className} w-full flex flex-col items-center overflow-y-scroll dark:bg-neutral-900 dark:text-neutral-100`}>
          <div className="w-full border-b dark:border-neutral-800 flex justify-center">
              <nav
                  className="px-6 md:px-16 py-3 max-lg:min-w-full lg:min-w-[1024px] max-w-[1024px] flex justify-between">
                  <Link href="/">
                    <h4 className="uppercase tracking-tighter font-semibold mt-1">Business Pokedex</h4>
                  </Link>
                  <SignedOut>
                      <SignInButton/>
                  </SignedOut>
                  <SignedIn>
                      <UserButton/>
                  </SignedIn>
              </nav>
          </div>
              <div className="p-6 md:p-16 max-lg:min-w-full lg:min-w-[1024px] max-w-[1024px]">
                  {children}
                  <Toaster />
              </div>
              <footer className="h-40 flex justify-center items-center w-full mt-40">
                  <p>Built by <a href="https://github.com/Robspin" target="_blank" className="underline">Robspin</a></p>
              </footer>
          </body>
          </html>
      </ClerkProvider>
  )
}
