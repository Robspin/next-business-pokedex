"use server"
import db from "../../../db/drizzle"
import { users, businessCards } from "../../../db/schema"
import { revalidatePath } from 'next/cache'
import { User as BDUserTyper } from '@/utils/types/user'
import { eq } from 'drizzle-orm'
// @ts-ignore
import { User as ClerkUser } from '@clerk/backend'
import { v4 as uuidv4 } from 'uuid'
import { BaseBusinessCard, FullBusinessCard, UpdateBusiness } from '@/utils/types/business-card'
import { unstable_noStore as no_store } from 'next/cache'

export const addDBUser = async (user: BDUserTyper) => {
    no_store()
    await db.insert(users).values({
        ...user,
        id: uuidv4(),
        createdAt: new Date()
    })
    revalidatePath("/")
}

export const addBusinessCard = async (businessCard: BaseBusinessCard) => {
    no_store()
    const id = uuidv4()

    await db.insert(businessCards).values({
        ...businessCard,
        id,
        createdAt: new Date()
    })
    revalidatePath("/")

    return id
}

export const updateBusinessCard = async (businessCard: UpdateBusiness, id: string) => {
    no_store()
    const card = await db.update(businessCards).set({
        ...businessCard
    }).where(eq(businessCards.id, id))
    revalidatePath("/")
    return card
}

export const deleteBusinessCard = async (id: string) => {
    no_store()
    await db.delete(businessCards).where(eq(businessCards.id, id))
    revalidatePath("/")
}

export const getDBUser = async (clerkUserId: string) => {
    no_store()
    return db.query.users.findFirst({
        where: ((strat, { eq }) => eq(strat.clerkUserId, clerkUserId)),
    })
}

export const getBusinessCard = async (id: string, userId: string | null): Promise<FullBusinessCard | undefined> => {
    if (!userId) return undefined

    no_store()
    const card = await db.query.businessCards.findFirst({
        where: ((strat, { eq }) => eq(strat.id, id)),
    }) as FullBusinessCard | undefined

    if (card && card.userId === userId) return card
    return undefined
}

export const getBusinessCards = async (userId: string | null): Promise<FullBusinessCard[]> => {
    if (!userId) return []
    no_store()
    return db.query.businessCards.findMany({ where: ((strat, { eq }) => eq(strat.userId, userId)) }) as Promise<FullBusinessCard[]>
}

export const createDBUser = async (user: ClerkUser) => {
    no_store()
    const DBUser: BDUserTyper = {
        clerkUserId: user.id,
        email: user.emailAddresses[0].emailAddress
    }
    await addDBUser(DBUser)
}