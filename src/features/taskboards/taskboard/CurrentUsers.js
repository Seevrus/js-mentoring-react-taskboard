import { IoIosClose } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { selectAllUsers } from "../../users/usersSlice"
import { removeUser as removeUserFromBoard } from '../taskBoardsSlice'

const CurrentUser = ({ boardId, userId, email }) => {
  const dispatch = useDispatch()

  const onCurrentUserRemove = e => {
    dispatch(removeUserFromBoard({boardId, userId}))
  }

  return (
    <div className="current-user">
      <span>{email}</span>
      <div className="current-user-remove" onClick={onCurrentUserRemove}><IoIosClose /></div>
    </div>
  )
}

export const CurrentUsers = ({ boardId, userIds }) => {
  const users = useSelector(selectAllUsers)
  const filteredUsers = users.filter(user => userIds.includes(user.id))

  return (
    <div className="current-users-container">
      Other users currently accessing this board:
      <div className="current-users">
        {filteredUsers.map(user => {
          return <CurrentUser key={user.id} boardId={boardId} userId={user.id} email={user.email} />
        })}
      </div>
    </div>
  )
}