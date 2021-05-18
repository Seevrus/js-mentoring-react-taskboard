import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { TaskBoard } from './taskboard/TaskBoard'
import { 
  addBoard, 
  getMaxId as getMaxBoardId, 
  selectAllTaskBoardsByUserId } from './taskBoardsSlice'
import { BiPlus } from "react-icons/bi"
import { getCurrentUser } from '../filters/filtersSlice'

const AddTaksBoardForm = ({ currentUserId }) => {
  const [addBoardFormVisible, setAddBoardFormVisible] = useState(false)
  const [boardName, setBoardName] = useState('')
  const maxBoardId = useSelector(getMaxBoardId)

  const dispatch = useDispatch()
  const onAddBoard = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      dispatch(addBoard({ id: maxBoardId+1, name: e.target.value, userIds: [currentUserId], taskIds: [] }))
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
  const taskBoards = useSelector(selectAllTaskBoardsByUserId)
  const currentUserId = useSelector(getCurrentUser)

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
      <AddTaksBoardForm currentUserId={currentUserId} />
    </div>
  )

}
