import { AddNewUser } from "./AddNewUser"
import { Task } from "./Task"
import "./TaskBoard.css"
import { BiPlus, BiTrash } from "react-icons/bi"
import { CurrentUsers } from "./CurrentUsers"
import { useDispatch, useSelector } from "react-redux"
import { addTask, getMaxId, removeTask, selectAllTasks } from "./tasksSlice"
import { 
  addTask as addTaskToBoard, 
  removeBoard, 
  selectAllTasksOnBoard } from "../taskBoardsSlice"
import { useState } from "react"

const TaskBoardColumnHeader = ({ text }) => {
  return (
    <div className="todo-header">
      {text}
      <hr />
    </div>
  )
}

const TaskBoardColumn = ({ boardId, tasksOnBoard, columnType }) => {

  let text, classn, status;
  switch (columnType) {
    case "inProgress":
      text = "In Progress";
      classn = "grid-in-progress";
      status = "inProgress";
      break;
    case "finished":
      text = "Finished";
      classn = "grid-finished";
      status = "finished";
      break;
    default:
      text = "To Do";
      classn = "grid-todo";
      status = "todo";
  }

  const tasksToDisplay = tasksOnBoard.filter(task => task.status === status)

  return (
    <div className={classn}>
      <TaskBoardColumnHeader text={text} />
      {tasksToDisplay.map(task => <Task key={task.id} boardId={boardId} taskId={task.id} text={task.text} />)}
    </div>
  )
}

const TaskBoardBody = ({ boardId, tasksOnBoard }) => {
  return (
    <div className="grid-container">
      <TaskBoardColumn boardId={boardId} tasksOnBoard={tasksOnBoard} columnType="" />
      <TaskBoardColumn boardId={boardId} tasksOnBoard={tasksOnBoard} columnType="inProgress" />
      <TaskBoardColumn boardId={boardId} tasksOnBoard={tasksOnBoard} columnType="finished" />
    </div>
  )
}

const AddTaskForm = ({ boardId, hide }) => {
  const [taskName, setTaskName] = useState('')
  const maxId = useSelector(getMaxId)

  const dispatch = useDispatch();
  const onAddTask = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      dispatch(addTask({ id: maxId+1, text: e.target.value, status: "todo" }))
      dispatch(addTaskToBoard({ boardId, taskId: maxId+1 }))
      hide(false)
    }
  }

  return (
    <div>
      <label htmlFor="new-task">Add new task:</label>
      <input 
        id="new-task"
        name="new-task"
        value={taskName} 
        onChange={e => setTaskName(e.target.value)} 
        onKeyUp={onAddTask} />
    </div>
  )
}

export const TaskBoard = ({ boardId, name, userIds }) => {
  const dispatch = useDispatch();
  const taskIds = useSelector(state => selectAllTasksOnBoard(state, boardId))
  const allTasks = useSelector(selectAllTasks)
  const tasksOnBoard = allTasks.filter(task => taskIds.includes(task.id))

  const onRemoveBoard = e => {
    for (let id of taskIds) {
      dispatch(removeTask(id))
    }
    dispatch(removeBoard(boardId))
  }

  const [addTaskVisible, setAddTaskVisible] = useState(false)
  return (
    <div className="container">
      <h2>{name}</h2>
      <AddNewUser />
      <CurrentUsers boardId={boardId} userIds={userIds} />
      <TaskBoardBody boardId={boardId} tasksOnBoard={tasksOnBoard} />
      <div className="control-buttons">
        <button className="task-button delete-task" onClick={onRemoveBoard}>
          <BiTrash />
          <span>Delete Board</span>
        </button>
        <button className="task-button add-task" onClick={() => setAddTaskVisible(true)}>
          <BiPlus />
          <span>Add task</span>
        </button>
      </div>
      {addTaskVisible ? <AddTaskForm boardId={boardId} hide={setAddTaskVisible} /> : null}
    </div>
  )
}