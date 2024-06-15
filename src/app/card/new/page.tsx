import CreateCardForm from '@/components/create-card-form'
import { RedirectToSignIn, SignedIn } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { createDBUser, getDBUser } from '@/utils/server/db-actions'
import ClientAutoRefresh from '@/components/client-auto-refresh'


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
                <CreateCardForm userId={DBUser.id} />
            </SignedIn>
        </div>
    )
}
