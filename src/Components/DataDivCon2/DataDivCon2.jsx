import React from 'react'
import DataInnDiv from './DataInnDiv'

const DataDivCon2 = (props) => {

    const data = props.data
    console.log(data)


    return (
        <div className={props.cls}>
            {data.map((element, index) => (
                <DataInnDiv data={element} key={index} />
            ))}  
        </div>
    )
}

export default DataDivCon2