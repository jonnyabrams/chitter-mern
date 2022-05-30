import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPeep } from '../features/peeps/peepSlice'

const PeepForm = () => {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createPeep({ text }))
    setText('')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Peep</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Peep
          </button>
        </div>
      </form>
    </section>
  )
}

export default PeepForm