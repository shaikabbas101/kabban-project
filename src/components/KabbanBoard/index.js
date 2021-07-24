import {Component} from 'react'
import {AiTwotoneDelete} from 'react-icons/ai'
import KabbanTask from '../KabbanTask'

import './index.css'

class KabbanBoard extends Component {
  state = {
    newTask: '',
  }

  addingTask = () => {
    const {boardDetails, addTask} = this.props
    const {id} = boardDetails
    const {newTask} = this.state
    addTask(newTask, id)
    this.setState({
      newTask: '',
    })
  }

  deletingBoard = () => {
    const {deleteBoard, boardDetails} = this.props
    const {id} = boardDetails
    deleteBoard(id)
  }

  changeTaskInput = event => {
    this.setState({
      newTask: event.target.value,
    })
  }

  render() {
    const {boardDetails, deleteTask} = this.props
    const {boardName, taskCards} = boardDetails
    const {newTask} = this.state
    return (
      <div className="board-container">
        <div className="board-name-and-delete-icon-container">
          <h1 className="board-name">{boardName}</h1>
          <button
            className="del-icon"
            type="button"
            onClick={this.deletingBoard}
          >
            <AiTwotoneDelete />
          </button>
        </div>

        <div>
          {taskCards.map(eachTask => {
            if (eachTask.task !== '') {
              return (
                <KabbanTask
                  boardDetails={boardDetails}
                  taskInfo={eachTask}
                  deleteTask={deleteTask}
                  key={eachTask.id}
                />
              )
            }
            return null
          })}
        </div>
        <div className="task-input-and-btn-container">
          <input
            className="task-input-field"
            placeholder="Task Name"
            value={newTask}
            onChange={this.changeTaskInput}
          />
          <button
            type="button"
            className="add-task-btn"
            onClick={this.addingTask}
          >
            Add Task
          </button>
        </div>
      </div>
    )
  }
}

export default KabbanBoard
