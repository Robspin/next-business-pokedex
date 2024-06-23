"use server"
import BusinessCardsTable from '@/components/business-cards-table'
import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getBusinessCards, getDBUser } from '@/utils/server/db-actions'
import { currentUser } from '@clerk/nextjs/server'
import { Plus } from 'lucide-react'
import UploadImageButton from '@/components/upload-image-button'
import CreateNewButtons from '@/components/create-new-buttons'


export default async function Home() {
    const user = await currentUser()
    const dbUser = await getDBUser(user?.id ?? '')
    const businessCards = await getBusinessCards(dbUser?.id ?? '')

    return (
      <main className="w-full">
          <SignedOut>
              <div className="w-full justify-center items-center flex">
                  <SignInButton>
                      <div className="py-10">
                          <Button>
                              Sign in to continue
                          </Button>
                      </div>
                  </SignInButton>
              </div>
          </SignedOut>
            <SignedIn>
                <CreateNewButtons />
                <BusinessCardsTable businessCards={businessCards} />
            </SignedIn>
      </main>
    );
}
