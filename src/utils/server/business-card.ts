"use server"
import { eq } from "drizzle-orm"
import db from "../../../db/drizzle"
import { users, businessCards } from "../../../db/schema"
import { revalidatePath } from 'next/cache'
import { User } from '@/utils/types/user'
import { v4 as uuidv4 } from 'uuid'
import { BaseBusinessCard } from '@/utils/types/business-card'

export const addUser = async (user: User) => {
    await db.insert(users).values({
        ...user,
        id: uuidv4(),
        createdAt: new Date()
    })
    revalidatePath("/")
}

export const addBusinessCard = async (businessCard: BaseBusinessCard, userId: string) => {
    await db.insert(businessCards).values({
        ...businessCard,
        userId,
        id: uuidv4(),
        createdAt: new Date()
    })
    revalidatePath("/")
}

export const getDBUser = async (clerkUserId: string) => {
    return db.query.users.findFirst({
        where: ((strat, { eq }) => eq(strat.clerkUserId, clerkUserId)),
    })
}

export const getBusinessCard = async (id: string, userId: string) => {
    return db.query.businessCards.findFirst({
        where: ((strat, { eq }) => eq(strat.id, id) && eq(strat.userId, userId)),
    })
}

export const getBusinessCards = async (userId: string) => {
    return db.query.businessCards.findMany({ where: ((strat, { eq }) => eq(strat.userId, userId)) })
}
