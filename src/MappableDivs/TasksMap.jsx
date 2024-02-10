import React from 'react'
import TaskCard from '../Components/TaskCard/TaskCard'

const TasksMap = props => {
  console.log(props)
  const {data} = props
  return (
    <div className={props.cls}>
      {data?.map((item, index) => (
        <TaskCard data={item} />
      ))}
      {/* <TaskCard isDone={true} />
      <TaskCard isDone={false} />
      <TaskCard isDone={true} />
      <TaskCard isDone={false} />
      <TaskCard isDone={true} /> */}
    </div>
  )
}

export default TasksMap
