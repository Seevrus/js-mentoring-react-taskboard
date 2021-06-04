import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router"
import { getCurrentUser, setCurrentUser } from '../features/filters/filtersSlice'
import { logout } from '../features/users/usersSlice'

export const Logout = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const currentUserId = useSelector(getCurrentUser)
  dispatch(logout(currentUserId))
    .then(() => {
      dispatch(setCurrentUser(null))
      history.push('/')
    })

  return (
    <div>Successfully logged out.</div>
  )
}
