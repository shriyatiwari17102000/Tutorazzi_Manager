import React from 'react'
import classes from './MainTable.module.css'
import Container from '../../UI/Container/Container'
import { Link } from 'react-router-dom'

const MainTable = (props) => {

    const keys = props.keys
    const table_headings = props.headings
    const table_data = props.data



    return (
        <Container cls={`${classes.table_container}`}>
            <table className={classes.table}>
                <thead>
                    <tr>
                        {table_headings.map((element, index) => (
                            <td key={index}>{element}</td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {table_data.map((element, index) => (
                        <tr key={index}>
                            {/* <td><input type="checkbox" /></td> */}
                            {keys.map((key, index) => (
                                <td key={index}>{element[key]}</td>
                            ))}
                            {props.det && <td>
                                <Link className={classes.link_btn} to={'details'}>View Details</Link>
                            </td>}
                            {props.detFunc && <td>
                                <button onClick={()=>props.detFunc(true)} className={classes.link_btn}>View Details</button>
                            </td>}
                            {
                                props.ev && 
                                <td>
                                <Link style={{marginRight:'10px'}} className={classes.link_btn} to={'/'}>Edit</Link>
                                <Link className={classes.link_btn} to={'/'}>View</Link>
                            </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    )
}

export default MainTable