import { pgTable, varchar, integer, timestamp, uuid, text } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
    id: uuid('id').primaryKey(),
    clerkUserId: varchar('clerk_user_id', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow()
})

export const businessCards = pgTable('business_cards', {
    id: uuid('id').primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id),
    name: varchar('name', { length: 255 }),
    title: varchar('title', { length: 255 }),
    company: varchar('company', { length: 255 }),
    phone: varchar('phone', { length: 255 }),
    mobile: varchar('mobile', { length: 255 }),
    email: varchar('email', { length: 255 }),
    pokemonId: integer('pokemon_id'),
    pokemonName: varchar('pokemon_name', { length: 255 }),
    pokemonSpriteUrl: varchar('pokemon_sprite_url', { length: 255 }),
    notes: text('notes'),
    createdAt: timestamp('created_at').notNull().defaultNow()
})

