"use client"
import ExampleTable from '@/components/example-table'
import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


export default function Home() {
    const { user } = useUser()

  return (
      <main className="w-full">
          <SignedOut>
              <div className="w-full justify-center items-center flex">
                  <SignInButton>
                      <Button>
                          Sign in to continue
                      </Button>
                  </SignInButton>
              </div>
          </SignedOut>
            <SignedIn>
                {/*{user?.emailAddresses[0].emailAddress}*/}
                <div className="flex justify-center py-20">
                    <Link href="/card/new">
                        <Button>Add new business card</Button>
                    </Link>
                </div>
                <ExampleTable />
            </SignedIn>
      </main>
  );
}
