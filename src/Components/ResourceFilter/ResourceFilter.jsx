import React from 'react'
import classes from './ResourceFilter.module.css'
import Heading from '../Heading/Heading'
import search from '../../assets/search.png'
import FilterButton from '../FilterButton/FilterButton'


const ResourceFilter = () => {
    return (
        <div className={classes.container}>
            <Heading heading={'Attached Files'} />
            <div className={classes.filter_container}>
                <div className={classes.search_bar}>
                    <img src={search} alt="" />
                    <input placeholder='Search Resources by Name...' type="text" />
                </div>
                <FilterButton />
            </div>
        </div>
    )
}

export default ResourceFilter