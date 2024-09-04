import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";


const AnecdoteForm = () => {
    
    const dispatch = useDispatch()
    const newAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(content))
        dispatch(setNotification(`added ${content}`, 5000))    
    }

    return (
    <div>
        <h2>create new</h2>
        <form onSubmit={newAnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
        </form>
    </div>
    )
}

export default AnecdoteForm