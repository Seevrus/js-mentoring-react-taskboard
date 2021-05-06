import { BiTrash } from "react-icons/bi"

export const Task = ({ text }) => {
  return (
    <div className="task">
      <span>{text}</span>
      <button className="delete-task-small">
        <BiTrash />
      </button>
    </div>
  )
}