import { IoIosClose } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import classNames from 'classnames'
import { selectAllUsers } from "../../users/usersSlice"
import { removeUserFromBoard } from '../taskBoardsSlice'

const CurrentUser = ({ boardId, userId, userIds, setUserIds, email, loggedin }) => {
  const dispatch = useDispatch()

  const onCurrentUserRemove = e => {
    dispatch(removeUserFromBoard({boardId, userId}))
      .then(() => {
        const newUserIds = userIds.filter(id => id !== userId)
        setUserIds(newUserIds)
      })
  }

  const userClass = classNames({
    'current-user': true,
    'current-user-loggedin': loggedin,
  })

  return (
    <div className={userClass}>
      <span>{email}</span>
      <div className="current-user-remove" onClick={onCurrentUserRemove}><IoIosClose /></div>
    </div>
  )
}

export const CurrentUsers = ({ boardId, userIds, setUserIds }) => {
  const users = useSelector(selectAllUsers)
  const filteredUsers = users.filter(user => userIds.includes(user.id))

  return (
    !!filteredUsers.length &&
    <div className="current-users-container">
      Other users currently accessing this board:
      <div className="current-users">
        {filteredUsers.map(user => {
          return (
            <CurrentUser
              key={user.id}
              boardId={boardId}
              userId={user.id}
              userIds={userIds}
              setUserIds={setUserIds}
              email={user.email}
              loggedin={user.loggedin}
            />
          )
        })}
      </div>
    </div>
  )
}