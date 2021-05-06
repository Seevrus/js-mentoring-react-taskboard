import { AddNewUser } from "./AddNewUser"
import { Task } from "./Task"
import "./TaskBoard.css"
import { TaskBoardHeader } from "./TaskBoardHeader"
import { BiPlus, BiTrash } from "react-icons/bi"
import { IoIosClose } from "react-icons/io"

export const TaskBoard = () => {
  return (
    <div className="container">
      <h2>Board 1</h2>
      <AddNewUser />
      <div className="current-users-container">
        Users currently accessing this board:
        <div className="current-users">
          <div className="current-user">
            <span>user@example.com</span>
            <IoIosClose />
          </div>
          <div className="current-user">
            <span>user2@example.com</span>
            <IoIosClose />
          </div>
          <div className="current-user">
            <span>user3@example.com</span>
            <IoIosClose />
          </div>
        </div>
      </div>
      <div className="grid-container">
        <div className="grid-todo">
          <TaskBoardHeader text= "To Do" />
          <Task text="Task to do 1" />
          <Task text="Task to do 2" />
        </div>
        <div className="grid-in-progress">
          <TaskBoardHeader text= "In Progress" />
          <Task text="Task in progress" />
        </div>
        <div className="grid-finished">
          <TaskBoardHeader text= "Finished" />
          <Task text="Done task" />
          <Task text="Finished task" />
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