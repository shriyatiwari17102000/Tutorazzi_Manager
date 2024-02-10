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
    <button type='button' onClick={run} disabled={props.disabled} className={`${classes.button} ${props.cls}`}>
        {props.children}
    </button>
  )
}

export default BlackButton