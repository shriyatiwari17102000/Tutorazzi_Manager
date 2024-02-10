import React from 'react'
import Container from '../../UI/Container/Container'
import classes from './LongTile.module.css'

const LongTile = () => {
  return (
    <Container cls={classes.container}>
        <div className={classes.long_tile}>
            <div>
                <h3>Total Students</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis omnis neque enim debitis odio.</p>
            </div>
            <h1>365</h1>
        </div>
        <div className={classes.long_tile}>
            <div>
                <h3>Total Students</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis omnis neque enim debitis odio.</p>
            </div>
            <h1>365</h1>
        </div>
        <div className={classes.long_tile}>
            <div>
                <h3>Total Students</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis omnis neque enim debitis odio.</p>
            </div>
            <h1>365</h1>
        </div>
        <div className={classes.long_tile}>
            <div>
                <h3>Total Students</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis omnis neque enim debitis odio.</p>
            </div>
            <h1>365</h1>
        </div>
    </Container>
  )
}

export default LongTile