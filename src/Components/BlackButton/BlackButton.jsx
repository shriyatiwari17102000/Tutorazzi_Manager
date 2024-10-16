import React from 'react'
import classes from './BlackButton.module.css'

const BlackButton = (props) => {

  const run = () => {
    if (props.func) {
      console.log('hello');
       props.func(!props.funcVal)
    }
    
  }

  return (
    <button onClick={run}  id='button' disabled={props.disabled} className={`${classes.button} ${props.cls}`}>
        {props.children}
    </button>
  )
}

export default BlackButton