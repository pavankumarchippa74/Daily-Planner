import './index.css'
const TaskItem = ({
  task,
  deleteTask,
  toggleTask,
  editTask,
}) => {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-details">
        <h3>{task.title}</h3>
        <p>Time: {task.time}</p>
        <span>
          {task.completed ? 'Completed' : 'Pending'}
        </span>
      </div>

      <div className="task-actions">
        <button onClick={() => toggleTask(task.id)}>
          {task.completed ? 'Undo' : 'Complete'}
        </button>

        <button onClick={() => editTask(task.id)}>
          Edit
        </button>

        <button onClick={() => deleteTask(task.id)}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskItem
