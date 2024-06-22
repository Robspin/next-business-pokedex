"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { serverRequestHandler } from '@/utils/server/server-request-handler'
import { deleteBusinessCard } from '@/utils/server/db-actions'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

type Props = {
    name: string
    id: string
    children: ReactNode
}

export function DeleteDialog({ name, id, children }: Props) {
    const router = useRouter()

    async function deleteHandler() {
        await serverRequestHandler({
            serverFunction: () => deleteBusinessCard(id),
            successMessage: 'Success',
            onSuccess: () => router.refresh()
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        You will remove {name}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteHandler}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
