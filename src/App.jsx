
import {useState, useEffect} from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import './App.css'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('All')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [editingTask, setEditingTask] = useState(null)

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  // Add or update task
  const addOrUpdateTask = task => {
    if (editingTask !== null) {
      setTasks(prevTasks =>
        prevTasks.map(eachTask =>
          eachTask.id === editingTask.id ? task : eachTask
        )
      )
      setEditingTask(null)
    } else {
      setTasks(prevTasks => [...prevTasks, task])
    }
  }

  // Delete task
  const deleteTask = id => {
    setTasks(prevTasks =>
      prevTasks.filter(eachTask => eachTask.id !== id)
    )
  }

  // Change task status
  const toggleTask = id => {
    setTasks(prevTasks =>
      prevTasks.map(eachTask =>
        eachTask.id === id
          ? {...eachTask, completed: !eachTask.completed}
          : eachTask
      )
    )
  }

  // Edit task
  const editTask = id => {
    const selectedTask = tasks.find(
      eachTask => eachTask.id === id
    )
    setEditingTask(selectedTask)
  }

  // Filter tasks
  const filteredTasks = tasks.filter(eachTask => {
    if (filter === 'Completed') {
      return eachTask.completed
    }

    if (filter === 'Pending') {
      return !eachTask.completed
    }

    return true
  })

  const completedCount = tasks.filter(
    eachTask => eachTask.completed
  ).length

  return (
    <div className="app-container">
      <div className="planner-container">

        <header className="header">
          <h1>Daily Planner</h1>
          <p>Plan your day. Achieve your goals.</p>
          <div className="clock">
            {currentTime.toLocaleTimeString()}
          </div>
          <p className="date">
            {currentTime.toDateString()}
          </p>
        </header>

        <div className="stats">
          <div className="stat-card">
            <h2>{tasks.length}</h2>
            <p>Total Tasks</p>
          </div>

          <div className="stat-card">
            <h2>{completedCount}</h2>
            <p>Completed</p>
          </div>

          <div className="stat-card">
            <h2>{tasks.length - completedCount}</h2>
            <p>Pending</p>
          </div>
        </div>

        <TaskForm
          addOrUpdateTask={addOrUpdateTask}
          editingTask={editingTask}
        />

        <div className="task-section">
          <h2>My Tasks</h2>

          <div className="filter-buttons">
            {['All', 'Pending', 'Completed'].map(eachFilter => (
              <button
                key={eachFilter}
                className={filter === eachFilter ? 'active' : ''}
                onClick={() => setFilter(eachFilter)}
              >
                {eachFilter}
              </button>
            ))}
          </div>

          {tasks.length === 0 ? (
            <p className="empty-message">
              No tasks for today. Add your first task!
            </p>
          ) : filteredTasks.length === 0 ? (
            <p className="empty-message">
              No {filter.toLowerCase()} tasks found.
            </p>
          ) : (
            <TaskList
              tasks={filteredTasks}
              deleteTask={deleteTask}
              toggleTask={toggleTask}
              editTask={editTask}
            />
          )}
        </div>

      </div>
    </div>
  )
}

export default App
