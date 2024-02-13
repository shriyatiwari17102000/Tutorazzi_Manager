// import React from 'react'
// import classes from './SearchBar.module.css'
// import search from '../../assets/search.png'

// const SearchBar = (props) => {
//     return (
//         <div className={`${classes.search_bar} ${props.cls}`}>
//             <img src={search} alt="" />
//             <input placeholder='Search...' type="text" />
//         </div>
//     )
// }

// export default SearchBar

import React from 'react'
import classes from './SearchBar.module.css'
import search from '../../assets/search.png'

const SearchBar = (props) => {
    let searchComp = props?.search
    let setSearch = props?.setSearch
    return (
        <div className={`${classes.search_bar} ${props.cls}`}>
            <img src={search} alt="" />
            <input placeholder='Search...' type="text" value={searchComp} onChange={(e) => setSearch(e.target.value)}  />
        </div>
    )
}

export default SearchBar