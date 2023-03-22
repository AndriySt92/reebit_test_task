import { createAsyncThunk } from '@reduxjs/toolkit'
import { ICharacter } from '../interfaces/CharacterInterfases'

export const fetchCharacters = createAsyncThunk<ICharacter[], string | undefined , { rejectValue: string }>(
  'character/fetchCharacters',
  async function (queryFilter, { rejectWithValue }) {
    const response = await fetch(`https://rickandmortyapi.com/api/character${queryFilter ? "/?name=" + queryFilter : ''}`, {
      method: 'GET',
    })

    if (!response.ok) {
      return rejectWithValue('Server Error!')
    }

    const data = await response.json()
    const sortedData = data.results.sort((a: any, b: any) =>  a.name.toLowerCase().localeCompare(b.name.toLowerCase()))

    return sortedData
  },
)

export const fetchCharacterDetails = createAsyncThunk<ICharacter, string, { rejectValue: string }>(
  'character/fetchCharacterDetails',
  async function (id, { rejectWithValue }) {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
      method: 'GET',
    })

    if (!response.ok) {
      return rejectWithValue('Server Error!')
    }

    const data = await response.json()

    return data
  },
)
