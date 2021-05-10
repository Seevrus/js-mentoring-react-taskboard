import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectAllUsers } from "../../users/usersSlice"
import { addUser } from "../taskBoardsSlice"
import './AddNewUser.css'

export const AddNewUser = ({ boardId, currentUser, userIds }) => {
  const users = useSelector(selectAllUsers)
  const otherUsers = users.filter(user => user.id !== currentUser && !userIds.includes(user.id))
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchString, setSearchString] = useState('')

  const onSearchInputChange = e => {
    setSearchString(e.target.value)
    const query = e.target.value.toLowerCase();
    setFilteredUsers(otherUsers.filter(user => {
      return user.email.toLowerCase().includes(query)
    }))
  }

  const dispatch = useDispatch()
  const onAddUser = e => {
    const email = e.target.innerHTML
    const userId = otherUsers.find(user => user.email === email).id
    dispatch(addUser({ boardId, userId }))
    setSearchString('')
  }

  const [display, setDisplay] = useState(false);
  return (
    <div className="flex-container flex-column pos-rel">
      <input
        className="add-new-user"
        id="search-email"
        name="search-email"
        value={searchString}
        onFocus={() => setDisplay(true)}
        onBlur={() => setDisplay(false)}
        placeholder="Search users by email"
        onChange={onSearchInputChange}
        autoComplete="seach-email"
      />
      {display && filteredUsers.length>0 && (
        <div className="auto-container">
          {filteredUsers.map(user => (
            <div className="option" key={user.id} tabIndex="0" onMouseDown={onAddUser}>
              <span>{user.email}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
