import { pgTable, varchar, integer, timestamp, uuid, text } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
    id: uuid('id').primaryKey(),
    clerkUserId: varchar('clerk_user_id', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow()
})

export const decks = pgTable('decks', {
    id: uuid('id').primaryKey(),
    userId: uuid('userId').notNull().references(() => users.id),
    name: varchar('name', { length: 255 }),
    title: varchar('title', { length: 255 }),
    company: varchar('company', { length: 255 }),
    phone: varchar('phone', { length: 255 }),
    email: varchar('email', { length: 255 }),
    notes: text('textColumn'),
    createdAt: timestamp('created_at').notNull().defaultNow()
})

