
export type BaseBusinessCard = {
    name: string
    title: string
    company: string
    phone: string
    mobile: string
    email: string
    notes: string
    pokemonId: number
    pokemonName: string
    pokemonSpriteUrl: string
    userId: string
}

export type UpdateBusiness = {
    name: string
    title: string
    company: string
    phone: string
    mobile: string
    email: string
    notes: string
}

export type FullBusinessCard = {
    id: string
    email: string | null
    createdAt: Date
    name: string | null
    userId: string
    title: string | null
    company: string | null
    phone: string | null
    mobile: string | null
    pokemonId: number | null
    pokemonName: string | null
    pokemonSpriteUrl: string | null
    notes: string | null
}