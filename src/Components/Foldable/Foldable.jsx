import React, { useRef, useState } from 'react'
import classes from './Foldable.module.css'
import { useEffect } from 'react';


const Foldable = (props) => {


    const contentRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleCollapsible = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setIsOpen(props.open)
    }, [])


    return (
        <div className={`${classes.container} ${props.cls}`} style={{
            height: isOpen ? 'max-content' : '45px',
            overflow: 'hidden',
            transition: 'height 0.1s ease-out',
            
        }}>
            {props.skeleton ? <Skeleton height='45px' /> :
                <div onClick={toggleCollapsible} className={classes.header}>
                    {props.children[0]}
                </div>
            }

            <div className={classes.body} ref={contentRef}
                style={{
                    maxHeight: isOpen ? contentRef.current.scrollHeight + 'px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.1s ease-out',
                }}>
                {props.children[1]}
            </div>
        </div>
    )
}

export default Foldable