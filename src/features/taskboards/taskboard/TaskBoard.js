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

const TaskBoardColumn = ({ boardId, classn, headerText, taskIds, taskSt }) => {
  const tasks = useSelector(selectAllTasks)
  const filteredTasks = tasks.filter(task => taskIds.includes(task.id))
  const tasksToDisplay = filteredTasks.filter(task => task.status === taskSt)

  return (
    <div className={classn}>
      <TaskBoardColumnHeader text={headerText} />
      {tasksToDisplay.map(task => <Task key={task.id} boardId={boardId} taskId={task.id} text={task.text} />)}
    </div>
  )
}

const TaskBoardBody = ({ boardId, taskIds }) => {
  return (
    <div className="grid-container">
      <TaskBoardColumn boardId={boardId} classn="grid-todo" headerText="To Do" taskIds={taskIds} taskSt="todo" />
      <TaskBoardColumn boardId={boardId} classn="grid-in-progress" headerText="In Progress" taskIds={taskIds} taskSt="inProgress" />
      <TaskBoardColumn boardId={boardId} classn="grid-finished" headerText="Finished" taskIds={taskIds} taskSt="finished" />
    </div>
  )
}

export const TaskBoard = ({ boardId, userIds, taskIds }) => {
  return (
    <div className="container">
      <h2>Board 1</h2>
      <AddNewUser />
      <CurrentUsers boardId={boardId} userIds={userIds} />
      <TaskBoardBody boardId={boardId} taskIds={taskIds} />
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