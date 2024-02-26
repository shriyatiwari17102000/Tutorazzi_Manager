import React from 'react'
import Container from '../../../UI/Container/Container'
import classes from './OComp.module.css'
import HomeworkFold from '../../../Components/AllFolds/Homework/HomeworkFold'

const HomeworkDiv = props => {
  // console.log(props?.data)
  const {data} = props

  let classData = data?.length > 0 ? classes.homework_div : classes.no_data
  return (
    <Container cls={`${classData} ${props.cls}`}>
        <h3 className={classes.heading}>Homework</h3>
        <div className={classes.homeowrk_fold_container}>
          {data?.length > 0 ? data?.map((item, index) => (
            <HomeworkFold data={item} open={true}  />
          )) : "no data found!"}
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
