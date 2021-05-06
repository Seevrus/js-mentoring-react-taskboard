import { AddNewUser } from "./AddNewUser"
import { Task } from "./Task"
import "./TaskBoard.css"
import { BiPlus, BiTrash } from "react-icons/bi"
import { CurrentUsers } from "./CurrentUsers"
import { useSelector } from "react-redux"
import { selectAllTasks } from "./tasksSlice"

const TaskBoardHeader = ({ text }) => {
  return (
    <div className="todo-header">
      {text}
      <hr />
    </div>
  )
}

export const TaskBoard = ({ boardId, userIds, taskIds }) => {
  const tasks = useSelector(selectAllTasks)
  const filteredTasks = tasks.filter(task => taskIds.includes(task.id))
  const tasksToDo = filteredTasks.filter(task => task.status === "todo")
  const tasksInProgress = filteredTasks.filter(task => task.status === "inProgress")
  const tasksFinished = filteredTasks.filter(task => task.status === "finished")

  return (
    <div className="container">
      <h2>Board 1</h2>
      <AddNewUser />
      <CurrentUsers boardId={boardId} userIds={userIds} />
      <div className="grid-container">
        <div className="grid-todo">
          <TaskBoardHeader text= "To Do" />
          {tasksToDo.map(task => <Task key={task.id} text={task.text} />)}
        </div>
        <div className="grid-in-progress">
          <TaskBoardHeader text= "In Progress" />
          {tasksInProgress.map(task => <Task key={task.id} text={task.text} />)}
        </div>
        <div className="grid-finished">
          <TaskBoardHeader text= "Finished" />
          {tasksFinished.map(task => <Task key={task.id} text={task.text} />)}
        </div>  
      </div>
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