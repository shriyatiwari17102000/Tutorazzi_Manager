import React from 'react'
import TaskInfoFold from '../../Components/AllFolds/TaskInfo/TaskInfoFold'

const TaskFoldMap = props => {
  return (
    <div className={`${props.cls}`}>
        <TaskInfoFold />
        <TaskInfoFold />
        <TaskInfoFold />
        <TaskInfoFold />
        <TaskInfoFold />
        <TaskInfoFold />
        <TaskInfoFold />
        <TaskInfoFold />
    </div>
  )
}

export default TaskFoldMap
