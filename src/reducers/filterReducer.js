import { createSlice, current } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
    name:'filter',
    initialState,
    reducers:{
        filterChange(state, action){
            const newState = action.payload
            state = newState
            return state
        }
    }
})


export const {filterChange} = filterSlice.actions
export default filterSlice.reducer