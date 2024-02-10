import React from 'react'
import PagePath from '../../Components/PagePath/PagePath'
import Heading from '../../Components/Heading/Heading'
import Container from '../../UI/Container/Container'
import Tile from '../../Components/Tile/Tile'

import classes from './Reports.module.css'
import LongTile from '../../Components/LongTile/LongTile'

const td1 = [ 
    {
      h5:'Total Received amount',
      h1:'10000',
      p:'See here your total amount received from admin side against for sessions'  
    }
]

const td2 = [ 
    {
      h5:'Total Received amount',
      h1:'10000',
      p:'See here your total amount received from admin side against for sessions'  
    },
    {
      h5:'Total Received amount',
      h1:'10000',
      p:'See here your total amount received from admin side against for sessions'  
    }
]

const Reports = () => {
  return (
    <React.Fragment>
        <PagePath />
        <Heading heading={'Reports'} p={'You can see your Reports here and manage them'} />
        <Container cls={classes.grid}>
            <Tile data={td1} />
            <Tile data={td2} direction={'row'} />
            <Tile data={td1} />
            <Tile data={td1} />
            <LongTile />
        </Container>
    </React.Fragment>
    
  )
}

export default Reports