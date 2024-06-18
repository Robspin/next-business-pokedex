import { getBusinessCard, getDBUser } from '@/utils/server/db-actions'
import { currentUser } from '@clerk/nextjs/server'
import { RedirectToSignIn, SignedIn } from '@clerk/nextjs'
import Link from 'next/link'
import { MoveLeft } from 'lucide-react'
import EditCardForm from '@/components/edit-card-form'

type Props = {
    params: {
        id: string
    }
}

export default async function Page({ params }: Props) {
    const user = await currentUser()
    let DBUser = await getDBUser(user?.id ?? '')
    const businessCard = await getBusinessCard(params.id, DBUser?.id ?? null)

    if (!user) return <RedirectToSignIn />
    if (!businessCard) return (
        <div>
            <div className="inline-block">
                <Link href="/" className="flex items-center hover:underline gap-2 mb-4"><MoveLeft size={16}/>Back to
                    overview</Link>
            </div>
            <div className="text-center text-2xl font-semibold tracking-tight mt-8">
                Not found!
            </div>
        </div>
    )
    if (!DBUser?.id) return <div>Could not find user id!</div>

    return (
        <div>
            <SignedIn>
                <div className="inline-block">
                    <Link href="/" className="flex items-center hover:underline gap-2 mb-4"><MoveLeft size={16}/>Back to
                        overview</Link>
                </div>
                <EditCardForm businessCard={businessCard} userId={DBUser.id} />
            </SignedIn>
        </div>
    )
}