import { IoIosClose } from "react-icons/io";

const CurrentUser = email => {
  return (
    <div className="current-user">
      <span>{email}</span>
      <IoIosClose />
    </div>
  )
}

export const CurrentUsers = users => {
  return (
    <div className="current-users-container">
      Users currently accessing this board:
      <div className="current-users">
        {users.map(user => {
          return <CurrentUser key={user.id} email={user.email} />
        })}
      </div>
    </div>
  )
}