"use server"
import BusinessCardsTable from '@/components/business-cards-table'
import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getBusinessCards, getDBUser } from '@/utils/server/db-actions'
import { currentUser } from '@clerk/nextjs/server'


export default async function Home() {
    const user = await currentUser()
    const dbUser = await getDBUser(user?.id ?? '')
    const businessCards = await getBusinessCards(dbUser?.id ?? '')

    console.log(businessCards)

    return (
      <main className="w-full">
          <SignedOut>
              <div className="w-full justify-center items-center flex">
                  <SignInButton>
                      <div className="py-20">
                          <Button>
                              Sign in to continue
                          </Button>
                      </div>
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
                <BusinessCardsTable businessCards={businessCards} />
            </SignedIn>
      </main>
    );
}
