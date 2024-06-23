import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import UploadImageButton from '@/components/upload-image-button'


export default function CreateNewButtons() {
    return (
        <div className="flex justify-center pt-4 pb-6 md:pb-10">
            <div className="flex flex-col gap-2">
                <Link href="/cards/new">
                    <Button className="min-w-[280px]"><Plus size={20} className="mr-2 -ml-1"/>Add new business
                        card</Button>
                </Link>
                <div className="w-full relative my-2 border-b-stone-700 border-b flex justify-center items-center">
                    <div className="dark:bg-neutral-900 px-2 absolute -top-3">or</div>
                </div>
                <UploadImageButton/>
            </div>
        </div>
    )
}