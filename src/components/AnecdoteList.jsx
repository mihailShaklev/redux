import { useSelector, useDispatch} from "react-redux";
import { castVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({anecdote, handleClick}) => {

    return(
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
          </div>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({filter, anecdotes}) => {
      if (filter === ''){
        return anecdotes
      }

      return anecdotes.filter( anecdote => anecdote.content.includes(filter))
    })

    const vote = (anecdote) => {
      dispatch(castVote(anecdote))
      dispatch(setNotification(`you voted ${anecdote.content}`, 5000))
    }

    return(
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => vote(anecdote)}
        />
      )}
    </div>
    )

}

export default AnecdoteList