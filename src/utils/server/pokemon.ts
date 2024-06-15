"use server"

export const getPokemon = async (id: number) => {
    try {
        return await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    } catch (e) {
        console.log(e)
    }
}

