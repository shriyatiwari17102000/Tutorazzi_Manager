import React, { useState } from 'react'
import classes from './FilterButton.module.css'
import filterImg from '../../assets/filter.png'
import Container from '../../UI/Container/Container'

const FilterButton = (props) => {

    const [active,setActive] = useState(false)


    const blurFunc = () => {
        setTimeout(() => {
            setActive(false)
        }, 300);
    }

    const alertFunc = (num) => {
        alert(`alert ${num}`)
    }


    return (
        <form onBlur={blurFunc} className={`${classes.filter_div} ${props.cls}`}>
            <Container>
                <button type='button' onClick={()=>setActive(!active)} className={classes.filter_button}>Filter <img src={filterImg} alt="" /></button>
            </Container>
            {active === true && <Container cls={classes.filter_ul}>
                <li onClick={()=>alertFunc(1)}>Filter 1</li>
                <li onClick={()=>alertFunc(2)}>Filter 2</li>
                <li onClick={()=>alertFunc(3)}>Filter 3</li>
                <li onClick={()=>alertFunc(4)}>Filter 4</li>
                <li onClick={()=>alertFunc(5)}>Filter 5</li>
            </Container>}
        </form>
    )
}

export default FilterButton