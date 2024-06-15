"use server"
import { PokemonResponse } from '@/utils/types/pokemon'

export const getPokemon = async (id: number): Promise<PokemonResponse | undefined> => {
    try {
        return await (await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)).json()
    } catch (e) {
        console.log(e)
    }
}

