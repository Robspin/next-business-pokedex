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
import { useRouter } from 'next/navigation'
import FormInput from '@/components/form-input'
import { Textarea } from '@/components/ui/textarea'
import { getPokemon } from '@/utils/server/pokemon'
import { capitalizeFirstLetter, getRandomPokemonId } from '@/utils/helpers'
import { BaseBusinessCard, FullBusinessCard, UpdateBusiness } from '@/utils/types/business-card'
import { addBusinessCard, updateBusinessCard } from '@/utils/server/db-actions'
import { serverRequestHandler } from '@/utils/server/server-request-handler'
import Image from 'next/image'

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
    notes: z.string().optional(),
    createdAt: z.string().optional()
})

type Props = {
    businessCard: FullBusinessCard,
    userId: string
}

export default function EditCardForm({ businessCard, userId }: Props) {
    const { name, company, title, notes, phone, mobile, email, createdAt, pokemonSpriteUrl, pokemonName, pokemonId, id } = businessCard
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: name ?? '',
            company: company ?? '',
            title: title ?? '',
            notes: notes ?? '',
            phone: phone ?? '',
            mobile: mobile ?? '',
            email: email ?? '',
            createdAt: createdAt.toLocaleString() ?? ''
        }
    })
    const router = useRouter()

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const { name, company, title, notes, mobile, phone, email } = data

        await serverRequestHandler({
            serverFunction: async () => {
                const businessCard: UpdateBusiness = {
                    name,
                    company,
                    title,
                    phone: phone ?? '',
                    mobile: mobile ?? '',
                    email: email ?? '',
                    notes: notes ?? '',
                }
                return await updateBusinessCard(businessCard, id)
            },
            successMessage: 'Success'
        })
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between relative">
                    <CardTitle className="text-xl">{name}</CardTitle>
                    <div className="absolute right-0 -top-8 flex items-center">
                        <p className="max-md:hidden text-stone-300 italic">{capitalizeFirstLetter(pokemonName ?? '')} #{pokemonId}</p>
                        <Image src={pokemonSpriteUrl ?? ''} alt={pokemonName ?? 'Pokemon'} height={120} width={120} />
                    </div>
                </div>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="grid lg:grid-cols-2 gap-4">
                        <FormInput formControl={form.control} name="name" />
                        <FormInput formControl={form.control} name="title" />
                        <FormInput formControl={form.control} name="company" />
                        <FormInput formControl={form.control} name="phone" />
                        <FormInput formControl={form.control} name="mobile" />
                        <FormInput formControl={form.control} name="email" />
                        <FormInput formControl={form.control} disableInput name="createdAt" />
                        <div className="lg:col-span-2">
                            <FormField
                                control={form.control}
                                name="notes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Notes</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter notes..."
                                                // className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t border-t-stone-800 px-6 py-4 flex justify-end">
                        <Button type="submit">Save</Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}
