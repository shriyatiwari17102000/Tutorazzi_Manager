import React, { useEffect, useState } from 'react'
import classes from './ResourceElementCard.module.css'
import Container from '../../UI/Container/Container'
import file from '../../assets/file_01.png'
import x from '../../assets/x.png'

const ResourceElementCard = (props) => {

    const [width, setWidth] = useState(0)

    useEffect(() => {
        setInterval(() => {
            setWidth(props.wd)
        }, 10);
    }, [])

    return (
        <Container cls={classes.container}>
            <div className={classes.card_header}>
                <img src={file} alt="" />
                <div>
                    <p>Notes of Meeting.pdf</p>
                    <p>17 Mb</p>
                </div>
            </div>
            <button className={classes.remove_button}><img src={x} alt="" /></button>

            <div className={classes.df}>
            <div className={classes.bar}>
                <span style={{ width: `${width}%` }} className={classes.bar_length}></span>
            </div>
            <p className={classes.p}>{width}%</p>
            </div>
        </Container>
    )
}

export default ResourceElementCard