"use client"
import ExampleTable from '@/components/example-table'
import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'


export default function Home() {
    const { user } = useUser()

  return (
      <main className="w-full py-20">
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
                {user?.emailAddresses[0].emailAddress}
                <ExampleTable />
            </SignedIn>
      </main>
  );
}
