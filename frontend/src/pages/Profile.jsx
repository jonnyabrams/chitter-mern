import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PeepForm from '../components/PeepForm'
import PeepItem from '../components/PeepItem'
import Spinner from '../components/Spinner'
import { getPeeps } from '../features/peeps/peepSlice' // removed 'reset' from this to stop infinite loop

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { peeps, isLoading, isError, message } = useSelector(
    (state) => state.peeps
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getPeeps())

    return () => {
      // dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Your Peeps</p>
      </section>

      <PeepForm />

      <section className='content'>
        {peeps.length > 0 ? (
          <div className='peeps'>
            {peeps.map((peep) => (
              <PeepItem key={peep._id} peep={peep} />
            ))}
          </div>
        ) : (
          <h3>There's not been a peep out of you</h3>
        )}
      </section>
    </>
  )
}

export default Profile 
