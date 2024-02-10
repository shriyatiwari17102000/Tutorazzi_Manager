import React, { useRef, useState } from 'react'
import classes from './HomeworkCollapsible.module.css'
import Container from '../../UI/Container/Container'
import cd from '../../assets/cd.png'
import cr from '../../assets/cr.png'
import { Link } from 'react-router-dom'

const HomeworkCollapsible = () => {

    const contentRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleCollapsible = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Container cls={classes.container}>
            <div onClick={toggleCollapsible} className={classes.header}>
                <h4>Subject : Maths Chapter 1</h4>
                <span className={classes.status}>Pending</span>
                <img style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: ' 0.2s ease-out',
                }} src={cd} alt="" />
            </div>

            <div className={classes.body} ref={contentRef}
                style={{
                    maxHeight: isOpen ? contentRef.current.scrollHeight + 'px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.2s ease-out',
                }}>
                <br />
                <h6>Details : </h6>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque ad error laudantium, consequuntur, harum facere praesentium in, laboriosam quis atque perferendis!
                </p>

                <h6>Download : </h6>
                <div className={classes.download_container}>
                    <Container cls={classes.download}>Download 1</Container>
                    <Container cls={classes.download}>Download 2</Container>
                </div>

                <Link className={classes.link} to={'/'}>Details <img src={cr} alt="" /></Link>
            </div>
        </Container>
    )
}

export default HomeworkCollapsible