import { useDispatch } from "react-redux"
import { BiTrash } from "react-icons/bi"
import { removeTask } from './tasksSlice'
import { removeTask as removeTaskFromBoard } from '../taskBoardsSlice'

export const Task = ({ boardId, taskId, text }) => {
  const dispatch = useDispatch()

  const onTaskRemove = e => {
    dispatch(removeTaskFromBoard({ boardId, taskId }))
    dispatch(removeTask(taskId))
  }

  return (
    <div className="task">
      <span>{text}</span>
      <button className="delete-task-small" onClick={onTaskRemove}>
        <BiTrash />
      </button>
    </div>
  )
}