"use client"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import FormInput from '@/components/form-input'
import { Textarea } from '@/components/ui/textarea'
import { getPokemon } from '@/utils/server/pokemon'
import { getRandomPokemonId } from '@/utils/helpers'
import { BaseBusinessCard } from '@/utils/types/business-card'
import { addBusinessCard } from '@/utils/server/db-actions'
import { serverRequestHandler } from '@/utils/server/server-request-handler'
import { useAtom } from 'jotai/index'
import { imageFileAtom } from '@/utils/jotai'
import Image from 'next/image'
import { uploadImageToUploadthing } from '@/utils/helpers/uploadthing'
import { useState } from 'react'

export const FormSchema = z.object({
    name: z.string()
        .min(3, 'This field should be at least 3 characters')
        .max(255, 'This field should be no more than 255 characters'),
    title: z.string()
        .min(1, 'This field should be at least 1 characters')
        .max(255, 'This field should be no more than 255 characters'),
    company: z.string()
        .min(1, 'This field should be at least 1 characters')
        .max(255, 'This field should be no more than 255 characters'),
    phone: z.string().max(255, 'This field should be no more than 255 characters').optional(),
    mobile: z.string().max(255, 'This field should be no more than 255 characters').optional(),
    email: z.string().max(255, 'This field should be no more than 255 characters').optional(),
    notes: z.string().optional()
})

type Props = {
    userId: string
}

export default function CreateCardForm({ userId }: Props) {
    const [imageFile,] = useAtom(imageFileAtom)
    const [creatingCard, setCreatingCard] = useState(false)
    const searchParams = useSearchParams()

    const form = useForm<z.infer<typeof FormSchema>>({ resolver: zodResolver(FormSchema), defaultValues: {
            name: searchParams.get('name') ?? '',
            title: searchParams.get('title') ?? '',
            company: searchParams.get('company') ?? '',
            phone: searchParams.get('phone') ?? '',
            mobile: searchParams.get('mobile') ?? '',
            email: searchParams.get('email') ?? '',
        }
    })
    const router = useRouter()

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const { name, company, title, notes, phone, mobile, email } = data
        setCreatingCard(true)

        await serverRequestHandler({
            serverFunction: async () => {
                const imageUrl = imageFile && await uploadImageToUploadthing(imageFile)
                const pokemonResponse = await getPokemon(getRandomPokemonId())
                if (!pokemonResponse) throw new Error('Failed to get pokemon api response!')

                const businessCard: BaseBusinessCard = {
                    name,
                    company,
                    title,
                    phone: phone ?? '',
                    mobile: mobile ?? '',
                    email: email ?? '',
                    notes: notes ?? '',
                    userId,
                    pokemonId: pokemonResponse.id,
                    pokemonSpriteUrl: pokemonResponse.sprites.front_default,
                    pokemonName: pokemonResponse.name,
                    imageUrl: imageUrl ?? undefined
                }

                return await addBusinessCard(businessCard)
            },
            successMessage: 'Success',
            onSuccess: (id) => router.push(`/cards/${id}?fresh=true`),
            onError: (err) => {
                console.log(err)
                setCreatingCard(false)
            }
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create new business card</CardTitle>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <FormInput formControl={form.control} name="name" />
                        <FormInput formControl={form.control} name="title" />
                        <FormInput formControl={form.control} name="company" />
                        <FormInput formControl={form.control} name="phone" />
                        <FormInput formControl={form.control} name="mobile" />
                        <FormInput formControl={form.control} name="email" />
                        <div className={`${!imageFile && 'lg:col-span-2'}`}>
                            <FormField
                                control={form.control}
                                name="notes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Notes</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter notes..."
                                                className={`${!imageFile && 'min-h-40'}`}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {imageFile &&
                            <div className="w-full">
                                <FormLabel>Selected image</FormLabel>
                                <Card className="overflow-hidden h-40 w-full mt-2 p-2">
                                    <div className="h-full w-full relative">
                                        <Image src={URL.createObjectURL(imageFile)} alt="Uploaded business card" className="w-full" objectFit="contain" fill />
                                    </div>
                                </Card>
                            </div>
                        }
                    </CardContent>
                    <CardFooter className="border-t border-t-stone-800 px-6 py-4 flex justify-end">
                        <Button type="submit" disabled={creatingCard}>Create</Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}
