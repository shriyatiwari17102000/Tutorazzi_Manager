import React from 'react'
import TaskCard from '../Components/TaskCard/TaskCard'

const TasksMap = props => {
  console.log(props)
  const {data} = props
  return (
    <div className={props.cls}>
      {data?.length > 0 ? data?.slice().reverse().slice(0, 2).map((item, index) => (
        <TaskCard data={item} func={props.func} />
      )) : "no data found!"}
      {/* <TaskCard isDone={true} />
      <TaskCard isDone={false} />
      <TaskCard isDone={true} />
      <TaskCard isDone={false} />
      <TaskCard isDone={true} /> */}
    </div>
  )
}

export default TasksMap
