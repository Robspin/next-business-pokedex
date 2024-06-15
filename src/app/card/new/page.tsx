import CreateCardForm from '@/components/create-card-form'
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs'


export default async function Page() {
    return (
        <div>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
            <SignedIn>
                <CreateCardForm />
            </SignedIn>
        </div>
    )
}
