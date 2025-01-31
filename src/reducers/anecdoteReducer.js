import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
// Nice code!
/*const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)*/

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState:[],
  reducers:{
    setVote(state, action){
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {...anecdoteToChange, votes:(anecdoteToChange.votes + 1)}
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote).sort((a,b) => b.votes - a.votes)
    },
    setAnecdotes(state, action){
      return action.payload.sort((a,b) => b.votes - a.votes)
    },
    appendAnecdote(state, action){
      state.push(action.payload)
    }
  }
})

export const {setVote, setAnecdotes, appendAnecdote} = anecdoteSlice.actions
export const initializeAnecdotes = () => {
  return async dispatch =>{
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote =  await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const castVote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = {...anecdote, votes:(anecdote.votes + 1)}
    const update = await anecdoteService.castVote(updatedAnecdote.id, updatedAnecdote)
    dispatch(setVote(anecdote.id))
  }
}

export default anecdoteSlice.reducer