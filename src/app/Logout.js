import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setCurrentUser } from '../features/filters/filtersSlice';

export const Logout = () => {
  const dispatch = useDispatch();
  dispatch(setCurrentUser(null))

  return <Redirect to="/login" />
}
