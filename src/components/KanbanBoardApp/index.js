import {Component} from 'react'
import KanbanBoard from '../KanbanBoard'
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

function getBoardDetailsFromLocalStorage() {
  const stringifiedData = localStorage.getItem('kanbanBoards')
  const parsedData = JSON.parse(stringifiedData)
  if (parsedData === null) {
    return []
  }
  return parsedData
}

const BoardDetails = getBoardDetailsFromLocalStorage()

class KanbanBoardApp extends Component {
  state = {
    kanbanBoards: BoardDetails,
    boardName: '',
  }

  onDeleteTask = (boardId, taskId) => {
    const {kanbanBoards} = this.state
    const {newBoardId} = boardId
    const boardIndex = kanbanBoards.findIndex(eachBoard => {
      if (eachBoard.id.newBoardId === newBoardId) {
        return true
      }
      return false
    })

    const updateBoardTasks = kanbanBoards[boardIndex].taskCards.filter(
      eachTask => eachTask.id !== taskId,
    )
    kanbanBoards[boardIndex].taskCards = updateBoardTasks
    this.setState({
      kanbanBoards,
    })
  }

  onDeleteBoard = id => {
    const {kanbanBoards} = this.state
    const updatedBoards = kanbanBoards.filter(eachBoard => eachBoard.id !== id)
    this.setState({
      kanbanBoards: updatedBoards,
    })
  }

  changeBoardName = event => {
    this.setState({
      boardName: event.target.value,
    })
  }

  onAddTask = (task, id) => {
    const {kanbanBoards} = this.state
    const boardIndex = kanbanBoards.findIndex(eachBoard => {
      if (eachBoard.id === id) {
        return true
      }
      return false
    })
    if (task !== '') {
      const newTaskId = kanbanBoards[boardIndex].taskCards.length + 1
      const newTask = {
        id: newTaskId,
        task: `${task}`,
      }
      kanbanBoards[boardIndex].taskCards = [
        ...kanbanBoards[boardIndex].taskCards,
        newTask,
      ]
      this.setState({
        kanbanBoards,
      })
    }
  }

  onCreateBoard = () => {
    const {boardName, kanbanBoards} = this.state
    if (boardName !== '') {
      const newBoardId = kanbanBoards.length + 1
      const newBoard = {
        id: {newBoardId},
        boardName: `${boardName}`,
        taskCards: [],
      }
      const updatedBoardDetails = [...kanbanBoards, newBoard]
      this.setState({
        kanbanBoards: updatedBoardDetails,
        boardName: '',
      })
    }
  }

  onSaveBoard = () => {
    const {kanbanBoards} = this.state
    localStorage.setItem('kanbanBoards', JSON.stringify(kanbanBoards))
  }

  render() {
    const {boardName, kanbanBoards} = this.state
    return (
      <div>
        <nav className="nav-bar">
          <div>
            <h1 className="nav-heading">Kanban Board</h1>
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
          <button
            type="button"
            className="save-board-btn"
            onClick={this.onSaveBoard}
          >
            Save
          </button>
        </div>
        <div className="boards-container">
          {kanbanBoards.map(eachBoard => (
            <KanbanBoard
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

export default KanbanBoardApp

// console.log(newBoardId - 1)
// console.log(taskId)
// const updateBoardTasks = kabbanBoards[newBoardId - 1].taskCards.filter(
//   eachTask => eachTask.id !== taskId - 1,
// )
// kabbanBoards[newBoardId - 1].taskCards = updateBoardTasks
// this.setState({
//   kabbanBoards,
// })
