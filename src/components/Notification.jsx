import { useSelector } from 'react-redux'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const message = useSelector(({notification}) =>{
    if(notification){
      style.display = ''
    } else {
      style.display = 'none'
    }

    return notification
  })
  
  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification