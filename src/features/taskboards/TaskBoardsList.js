import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { TaskBoard } from './taskboard/TaskBoard'
import { 
  addBoard,
  fetchTaskBoards,
  selectAllTaskBoards} from './taskBoardsSlice'
import { BiPlus } from "react-icons/bi"
import { getCurrentUser } from '../filters/filtersSlice'

const AddTaskBoardForm = () => {
  const [addBoardFormVisible, setAddBoardFormVisible] = useState(false)
  const [boardName, setBoardName] = useState('')

  const dispatch = useDispatch()
  const onAddBoard = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      dispatch(addBoard(e.target.value))
      setAddBoardFormVisible(false)
    }
  }

  return (
    <div>
      <button className="task-button add-task" onClick={() => setAddBoardFormVisible(true)}>
        <BiPlus />
        <span>Add board</span>
      </button>

      {addBoardFormVisible && 
        <>
          <label htmlFor="name">Board name</label>
          <input 
            type="text" 
            id="name" 
            value={boardName}
            onChange={e => setBoardName(e.target.value)}
            onKeyUp={onAddBoard}
            placeholder="Enter board name..." />
        </>}
    </div>
  )
}

export const TaskBoardsList = () => {
  const dispatch = useDispatch()

  const currentUserId = useSelector(getCurrentUser)

  useEffect(() => {
    async function fetchBoards() {
      dispatch(fetchTaskBoards())
    }
    fetchBoards()
  }, [dispatch])

  const taskBoards = useSelector(selectAllTaskBoards, shallowEqual)

  return (
    <div className="container">
      {taskBoards.map(taskBoard => {
        return (
          <DndProvider key={taskBoard.id} backend={HTML5Backend}>
            <TaskBoard
              boardId={taskBoard.id}
              name={taskBoard.name}
              currentUser={currentUserId}
              userIds={taskBoard.userIds.filter(id => id !== currentUserId)}
              taskIds={taskBoard.taskIds} />
          </DndProvider>
        )
      })}
      <AddTaskBoardForm />
    </div>
  )

}
