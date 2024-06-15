
const totalPokemon = 1302
export const getRandomPokemonId = () => Math.floor(Math.random() * totalPokemon) + 1

export const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}
