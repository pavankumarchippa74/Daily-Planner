
import {useState, useEffect} from 'react'
import './index.css'
const TaskForm = ({addOrUpdateTask, editingTask}) => {
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')

  useEffect(() => {
    if (editingTask !== null) {
      setTitle(editingTask.title)
      setTime(editingTask.time)
    }
  }, [editingTask])

  const handleSubmit = event => {
    event.preventDefault()

    if (title.trim() === '' || time === '') {
      return
    }

    const task = {
      id: editingTask ? editingTask.id : Date.now(),
      title: title.trim(),
      time: time,
      completed: editingTask
        ? editingTask.completed
        : false,
    }

    addOrUpdateTask(task)

    setTitle('')
    setTime('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{editingTask ? 'Edit Task' : 'Add New Task'}</h2>

      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={event => setTitle(event.target.value)}
      />

      <input
        type="time"
        value={time}
        onChange={event => setTime(event.target.value)}
      />

      <button type="submit">
        {editingTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  )
}

export default TaskForm
