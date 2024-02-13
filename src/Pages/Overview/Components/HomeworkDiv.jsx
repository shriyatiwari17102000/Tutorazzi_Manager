import React from 'react'
import Container from '../../../UI/Container/Container'
import classes from './OComp.module.css'
import HomeworkFold from '../../../Components/AllFolds/Homework/HomeworkFold'

const HomeworkDiv = props => {
  // console.log(props?.data)
  const {data} = props
  return (
    <Container cls={`${classes.homework_div} ${props.cls}`}>
        <h3 className={classes.heading}>Homework</h3>
        <div className={classes.homeowrk_fold_container}>
          {data?.map((item, index) => (
            <HomeworkFold data={item} open={true}  />
          ))}
            {/* <HomeworkFold open={true} />
            <HomeworkFold />
            <HomeworkFold />
            <HomeworkFold />
            <HomeworkFold />
            <HomeworkFold />
            <HomeworkFold />
            <HomeworkFold /> */}
        </div>
    </Container>
  )
}

export default HomeworkDiv
