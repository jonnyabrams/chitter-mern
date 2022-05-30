import { useDispatch } from 'react-redux'
import { deletePeep } from '../features/peeps/peepSlice'

const PeepItem = ({ peep }) => {
  const dispatch = useDispatch()

  return (
    <div className='peep'>
      <div>{new Date(peep.createdAt).toLocaleString('en-GB')}</div>
      <h2>{peep.text}</h2>
      <button onClick={() => dispatch(deletePeep(peep._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default PeepItem