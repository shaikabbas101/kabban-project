import {MdDelete} from 'react-icons/md'
import './index.css'

const KanbanTask = props => {
  const {taskInfo, boardDetails, deleteTask} = props
  const boardId = boardDetails.id
  const {task, id} = taskInfo

  const deletingTask = () => {
    deleteTask(boardId, id)
  }

  return (
    <div className="task-container">
      <p className="task">{task}</p>
      <MdDelete onClick={deletingTask} className="task-del-icon" />
    </div>
  )
}

export default KanbanTask
