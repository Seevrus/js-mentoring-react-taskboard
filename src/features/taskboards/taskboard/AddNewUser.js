import { useState } from "react"
import { useSelector } from "react-redux"
import { selectAllUsers } from "../../users/usersSlice"
import './AddNewUser.css'

export const AddNewUser = ({ boardId }) => {
  const users = useSelector(selectAllUsers)
  const [filteredUsers, setFilteredUsers] = useState([])

  const onSearchInputChange = e => {
    const query = e.target.value.toLowerCase();
    setFilteredUsers(users.filter(user => {
      return user.email.toLowerCase().includes(query)
    }))
  }

  const [display, setDisplay] = useState(false);
  return (
    <div className="flex-container flex-column pos-rel">
      <input
        className="add-new-user"
        id="search-email"
        name="search-email"
        onFocus={() => setDisplay(true)}
        onBlur={() => setDisplay(false)}
        placeholder="Search users by email"
        onChange={onSearchInputChange}
        autoComplete="seach-email"
      />
      {display && filteredUsers.length>0 && (
        <div className="auto-container">
          {filteredUsers.map(user => (
            <div className="option" key={user.id} tabIndex="0">
              <span>{user.email}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
