import React from 'react'
import DataDiv from '../../Components/DataDiv/DataDiv'

const DataDivCon = (props) => {

    const data = props.data


    return (
        <div className={props.cls}>
            {data.map((element, index) => (
                <DataDiv data={element} key={index} />
            ))}  
        </div>
    )
}

export default DataDivCon