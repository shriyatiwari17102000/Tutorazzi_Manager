import React from 'react'
import classes from './Tile.module.css'
import Container from '../../UI/Container/Container'

const Tile = (props) => {

    return (
        <Container cls={`${classes.tile} ${props.direction === 'row' ? classes.row : classes.column}`}>
            {props.data.map((element, index) => (
                <div key={index} className={`${classes.data} ${props.data.length > 1 ? classes.border : ''} ${props.direction === 'column' ? classes.col_border : ''} `}>
                    <h5>{element.h5}</h5>
                    <h1>{element.h1}</h1>
                    <p>
                        {element.p}
                    </p>
                    {
                        props.children
                    }
                </div>
            ))}
        </Container>
    )
}

export default Tile