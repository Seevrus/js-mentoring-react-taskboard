import classNames from 'classnames'
import { useDispatch } from "react-redux"
import { useDrag } from 'react-dnd'
import { BiTrash } from "react-icons/bi"
import { removeTask } from './tasksSlice'
import { removeTask as removeTaskFromBoard } from '../taskBoardsSlice'

export const Task = ({ boardId, taskId, text }) => {
  const dispatch = useDispatch()

  const onTaskRemove = e => {
    dispatch(removeTaskFromBoard({ boardId, taskId }))
    dispatch(removeTask(taskId))
  }

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { boardId, taskId },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    })
  }))

  const taskClass = classNames({
    'task': true,
    'is-dragged': isDragging,
  })

  return (
    <div className={taskClass} ref={drag}>
      <span>{text}</span>
      <button className="delete-task-small" onClick={onTaskRemove}>
        <BiTrash />
      </button>
    </div>
  )
}