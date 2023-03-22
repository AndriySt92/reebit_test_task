export interface ICharacter {
    id: string
    name: string
    status: string
    species: string
    gender: string
    type?: string
    origin: {
        name: string
    }
    image: string
}


export interface CharacterState {
    characters: ICharacter[]
    characterDetails: ICharacter
    queryFilter: string
    isLoading: boolean
    error: string
}