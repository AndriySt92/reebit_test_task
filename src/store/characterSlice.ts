import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CharacterState, ICharacter } from '../interfaces/CharacterInterfases'
import { fetchCharacters, fetchCharacterDetails } from './characterActions'

const initialState: CharacterState = {
  characters: [] as ICharacter[],
  characterDetails: {} as ICharacter,
  queryFilter: '',
  isLoading: false,
  error: '',
}

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setQueryFilter: (state: CharacterState, action: PayloadAction<string>) => {
        state.queryFilter = action.payload
      },
  },
  extraReducers: {
    [fetchCharacters.pending.type]: (state: CharacterState) => {
      state.isLoading = true
    },
    [fetchCharacters.fulfilled.type]: (state: CharacterState, action: PayloadAction<Array<ICharacter>>) => {
      state.isLoading = false
      state.error = ''
      state.characters = action.payload
    },
    [fetchCharacters.rejected.type]: (state: CharacterState, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [fetchCharacterDetails.pending.type]: (state: CharacterState) => {
      state.isLoading = true
    },
    [fetchCharacterDetails.fulfilled.type]: (state: CharacterState, action: PayloadAction<ICharacter>) => {
      state.isLoading = false
      state.error = ''
      state.characterDetails = action.payload
    },
    [fetchCharacterDetails.rejected.type]: (state: CharacterState, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const { setQueryFilter } = characterSlice.actions

export default characterSlice.reducer
