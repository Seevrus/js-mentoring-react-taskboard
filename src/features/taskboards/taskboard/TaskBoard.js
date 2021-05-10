import { AddNewUser } from "./AddNewUser"
import { Task } from "./Task"
import "./TaskBoard.css"
import { BiPlus, BiTrash } from "react-icons/bi"
import { CurrentUsers } from "./CurrentUsers"
import { useSelector } from "react-redux"
import { selectAllTasks } from "./tasksSlice"

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

export const TaskBoard = ({ boardId, name, userIds, taskIds }) => {
  const allTasks = useSelector(selectAllTasks)
  const tasksOnBoard = allTasks.filter(task => taskIds.includes(task.id))

  return (
    <div className="container">
      <h2>{name}</h2>
      <AddNewUser />
      <CurrentUsers boardId={boardId} userIds={userIds} />
      <TaskBoardBody boardId={boardId} tasksOnBoard={tasksOnBoard} />
      <div className="control-buttons">
        <button className="task-button delete-task">
          <BiTrash />
          <span>Delete Board</span>
        </button>
        <button className="task-button add-task">
          <BiPlus />
          <span>Add task</span>
        </button>
      </div>
    </div>
  )
}