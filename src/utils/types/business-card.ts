
export type BaseBusinessCard = {
    name: string
    title: string
    company: string
    phone: string
    email: string
    notes: string
    pokemonId: number
    pokemonSpriteUrl: string
    user_id: string
}

export interface FullBusinessCard extends BaseBusinessCard {
    id?: string
    created_at?: string
}