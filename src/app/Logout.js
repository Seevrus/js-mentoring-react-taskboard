import { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router"
import { getCurrentUser, setCurrentUser } from '../features/filters/filtersSlice'
import { removeAllBoards } from '../features/taskboards/taskBoardsSlice'
import { logout } from '../features/users/usersSlice'

export const Logout = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const currentUserId = useSelector(getCurrentUser, shallowEqual)
  useEffect(() => {
    dispatch(logout(currentUserId))
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
