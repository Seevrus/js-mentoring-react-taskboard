import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useDrop } from 'react-dnd'
import classNames from 'classnames'

import { AddNewUser } from "./AddNewUser"
import { Task } from "./Task"
import "./TaskBoard.css"
import { BiPlus, BiTrash } from "react-icons/bi"
import { CurrentUsers } from "./CurrentUsers"
import { addTask, removeAllTasksOnBoard, updateTask, fetchTasks } from "./tasksSlice"
import { removeBoard } from "../taskBoardsSlice"

const TaskBoardColumnHeader = ({ text }) => {
  return (
    <div className="todo-header">
      {text}
      <hr />
    </div>
  )
}

const TaskBoardColumn = ({ boardId, setTasks, tasksOnBoard, columnType }) => {
  const dispatch = useDispatch()

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

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: 'task',
      canDrop: item => boardId === item.boardId,
      drop: item => {
        dispatch(updateTask({ id: item.taskId, boardId: item.boardId, status }))
          .then(res => setTasks(res.payload))
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    })
  )

  const columnClass = classNames({
    [classn]: true,
    'active': isOver && canDrop,
  })

  return (
    <div ref={drop} className={columnClass}>
      <TaskBoardColumnHeader text={text} />
      {tasksToDisplay.map(task => 
        <Task
          key={task.id}
          boardId={boardId}
          setTasks={setTasks}
          taskId={task.id}
          text={task.text}
        />
      )}
    </div>
  )
}

const TaskBoardBody = ({ boardId, setTasks, tasksOnBoard }) => {
  return (
    <div className="grid-container">
      <TaskBoardColumn
        boardId={boardId}
        setTasks={setTasks}
        tasksOnBoard={tasksOnBoard}
        columnType=""
      />
      <TaskBoardColumn
        boardId={boardId}
        setTasks={setTasks}
        tasksOnBoard={tasksOnBoard}
        columnType="inProgress"
      />
      <TaskBoardColumn
        boardId={boardId}
        setTasks={setTasks}
        tasksOnBoard={tasksOnBoard}
        columnType="finished"
      />
    </div>
  )
}

const AddTaskForm = ({ boardId, hide, setTasks }) => {
  const [taskName, setTaskName] = useState('')

  const dispatch = useDispatch();
  const onAddTask = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      dispatch(addTask({ boardId, text: e.target.value }))
        .then(() => dispatch(fetchTasks(boardId))
          .then(res => setTasks(res.payload)))
      hide(false)
    }
  }

  return (
    <div className="add-new-task-form">
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

export const TaskBoard = ({ boardId, name, currentUser, userIds }) => {
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    dispatch(fetchTasks(boardId))
      .then(res => setTasks(res.payload))
  }, [boardId, dispatch])

  const onRemoveBoard = e => {
    dispatch(removeAllTasksOnBoard(boardId))
    dispatch(removeBoard(boardId))
  }

  const [addTaskVisible, setAddTaskVisible] = useState(false)
  return (
    <div className="container">
      <h2>{name}</h2>
      <AddNewUser boardId={boardId} currentUser={currentUser} userIds={userIds} />
      <CurrentUsers boardId={boardId} userIds={userIds} />
      <TaskBoardBody boardId={boardId} setTasks={setTasks} tasksOnBoard={tasks} />
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
      {addTaskVisible && 
        <AddTaskForm 
          boardId={boardId} 
          hide={setAddTaskVisible}
          setTasks={setTasks}
        />}
    </div>
  )
}