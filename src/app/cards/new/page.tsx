import CreateCardForm from '@/components/create-card-form'
import { RedirectToSignIn, SignedIn } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { createDBUser, getDBUser } from '@/utils/server/db-actions'
import { MoveLeft } from "lucide-react"
import ClientAutoRefresh from '@/components/client-auto-refresh'
import Link from 'next/link'

export default async function Page() {
    const user = await currentUser()
    let DBUser = await getDBUser(user?.id ?? '')

    if (!DBUser && user) {
        createDBUser(user)
        return <ClientAutoRefresh />
    }

    if (!user) return <RedirectToSignIn />

    if (DBUser) return (
        <div>
            <SignedIn>
                <div className="inline-block">
                    <Link href='/' className="flex items-center hover:underline gap-2 mb-4"><MoveLeft size={16} />Back to overview</Link>
                </div>
                <CreateCardForm userId={DBUser.id} />
            </SignedIn>
        </div>
    )
}
