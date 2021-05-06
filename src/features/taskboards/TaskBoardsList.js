import { useSelector } from 'react-redux'
import { TaskBoard } from './taskboard/TaskBoard'
import { selectAllTaskBoards } from './taskBoardsSlice'

export const TaskBoardsList = () => {
  const taskBoards = useSelector(selectAllTaskBoards)

  return taskBoards.map(taskBoard => {
    return <TaskBoard key={taskBoard.id} boardId={taskBoard.id} userIds={taskBoard.userIds} taskIds={taskBoard.taskIds} />
  })

}
