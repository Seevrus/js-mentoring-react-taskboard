import { IoIosClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../../users/usersSlice";

const CurrentUser = ({ email }) => {
  return (
    <div className="current-user">
      <span>{email}</span>
      <IoIosClose />
    </div>
  )
}

export const CurrentUsers = ({ userIds }) => {
  const users = useSelector(selectAllUsers)
  const filteredUsers = users.filter(user => userIds.includes(user.id))

  return (
    <div className="current-users-container">
      Users currently accessing this board:
      <div className="current-users">
        {filteredUsers.map(user => {
          return <CurrentUser key={user.id} email={user.email} />
        })}
      </div>
    </div>
  )
}