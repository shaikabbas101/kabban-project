import {Component} from 'react'
import KabbanBoard from '../KabbanBoard'
import './index.css'

// const BoardDetails = [
//   {
//     id: 1,
//     boardName: 'Learning',
//     taskCards: [
//       {
//         id: 1,
//         task: 'learning Html',
//       },
//     ],
//   },
//   {
//     id: 2,
//     boardName: 'progress',
//     taskCards: [
//       {
//         id: 1,
//         task: 'learning Html',
//       },
//       {
//         id: 2,
//         task: 'learning bootstrap and css',
//       },
//     ],
//   },
// ]

class KabbanBoardApp extends Component {
  state = {
    kabbanBoards: [],
    boardName: '',
  }

  onDeleteTask = (boardId, taskId) => {
    const {kabbanBoards} = this.state
    const {newBoardId} = boardId
    const boardIndex = kabbanBoards.findIndex(eachBoard => {
      if (eachBoard.id.newBoardId === newBoardId) {
        return true
      }
      return false
    })

    const updateBoardTasks = kabbanBoards[boardIndex].taskCards.filter(
      eachTask => eachTask.id !== taskId && eachTask.id !== 1,
    )
    console.log(updateBoardTasks)
    kabbanBoards[boardIndex].taskCards = updateBoardTasks
    this.setState({
      kabbanBoards,
    })
  }

  onDeleteBoard = id => {
    const {kabbanBoards} = this.state
    const updatedBoards = kabbanBoards.filter(eachBoard => eachBoard.id !== id)
    this.setState({
      kabbanBoards: updatedBoards,
    })
  }

  changeBoardName = event => {
    this.setState({
      boardName: event.target.value,
    })
  }

  onAddTask = (task, id) => {
    const {kabbanBoards} = this.state
    const boardIndex = kabbanBoards.findIndex(eachBoard => {
      if (eachBoard.id === id) {
        return true
      }
      return false
    })
    if (task !== '') {
      const newTaskId = kabbanBoards[boardIndex].taskCards.length + 1
      const newTask = {
        id: newTaskId,
        task: `${task}`,
      }
      kabbanBoards[boardIndex].taskCards = [
        ...kabbanBoards[boardIndex].taskCards,
        newTask,
      ]
      this.setState({
        kabbanBoards,
      })
    }
  }

  onCreateBoard = () => {
    const {boardName, kabbanBoards} = this.state
    if (boardName !== '') {
      const newBoardId = kabbanBoards.length + 1
      const newBoard = {
        id: {newBoardId},
        boardName: `${boardName}`,
        taskCards: [
          {
            id: 1,
            task: '',
          },
        ],
      }
      const updatedBoardDetails = [...kabbanBoards, newBoard]
      this.setState({
        kabbanBoards: updatedBoardDetails,
        boardName: '',
      })
    }
  }

  render() {
    const {boardName, kabbanBoards} = this.state
    return (
      <div>
        <nav className="nav-bar">
          <div>
            <h1 className="nav-heading">Kabban Board</h1>
          </div>
        </nav>
        <div className="board-input-container">
          <input
            type="text"
            placeholder="Create Your Board"
            className="board-input"
            value={boardName}
            onChange={this.changeBoardName}
          />
          <button
            type="button"
            className="create-board-btn"
            onClick={this.onCreateBoard}
          >
            Create Board
          </button>
        </div>
        <div className="boards-container">
          {kabbanBoards.map(eachBoard => (
            <KabbanBoard
              boardDetails={eachBoard}
              deleteBoard={this.onDeleteBoard}
              addTask={this.onAddTask}
              deleteTask={this.onDeleteTask}
              key={eachBoard.id}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default KabbanBoardApp

// mistakes

// console.log(newBoardId - 1)
// console.log(taskId)
// const updateBoardTasks = kabbanBoards[newBoardId - 1].taskCards.filter(
//   eachTask => eachTask.id !== taskId - 1,
// )
// kabbanBoards[newBoardId - 1].taskCards = updateBoardTasks
// this.setState({
//   kabbanBoards,
// })
