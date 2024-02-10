import React from 'react'
import classes from './SortFilter.module.css'
import Container from '../../UI/Container/Container'
import sort from '../../assets/sort.png'

const SortFilter = () => {
  return (
<Container cls={classes.container}>
    <select>
        <option value="">Sort</option>
        <option value="">1</option>
        <option value="">2</option>
        <option value="">2</option>
    </select>
    <img src={sort} alt="Sort" />
</Container>
    )
}

export default SortFilter