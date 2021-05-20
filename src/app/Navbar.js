import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectUserById } from "../features/users/usersSlice"

export const Navbar = ({ currentUserId }) => {
  const user = useSelector((state) => selectUserById(state, currentUserId))

  return (
    <nav className="container flex-row">
      <div className="flex-small one-third" style={{ textAlign: 'right' }}>
        {user ? user.email : null}
      </div>
      <div className="flex-small" style={{ textAlign: 'right' }}>
        {user ? <Link to="/logout">Logout</Link> : <Link to="/signup">Sign up</Link>}
      </div>
    </nav>
  )
}