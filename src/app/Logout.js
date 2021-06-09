import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router"
import { setCurrentUser } from '../features/filters/filtersSlice'
import { removeAllBoards } from '../features/taskboards/taskBoardsSlice'
import { logout } from '../features/users/usersSlice'

export const Logout = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(logout())
      .then(() => {
        dispatch(removeAllBoards())
        dispatch(setCurrentUser(null))
        history.push('/')
      })
  }, [dispatch, history])

  return (
    <div>Successfully logged out.</div>
  )
}
