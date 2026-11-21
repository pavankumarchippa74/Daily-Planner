
import TaskItem from '../TaskItem'
import './index.css'
const TaskList = ({
  tasks,
  deleteTask,
  toggleTask,
  editTask,
}) => {
  return (
    <div className="task-list">
      {tasks.map(eachTask => (
        <TaskItem
          key={eachTask.id}
          task={eachTask}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          editTask={editTask}
        />
      ))}
    </div>
  )
}

export default TaskList
