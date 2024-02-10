import React from 'react'
import classes from './StudentResouces.module.css'

import Heading from '../../../Components/Heading/Heading'
import DragDrop from '../../../Components/DragDrop/DragDrop'
import ResourceElementCard from '../../../Components/ResourceElementCard/ResourceElementCard'
import ResourceFilter from '../../../Components/ResourceFilter/ResourceFilter'
import MainTable from '../../../Components/MainTable/MainTable'

const t_key = ['file_name', 'file_size', 'file_date']
const t_data = [
    {
        file_name: 'Aadhar card.pdf',
        file_size: '16Mb',
        file_date: '12/07/2023'
    },
    {
        file_name: 'Aadhar card.pdf',
        file_size: '16Mb',
        file_date: '12/07/2023'
    },
    {
        file_name: 'Aadhar card.pdf',
        file_size: '16Mb',
        file_date: '12/07/2023'
    },
    {
        file_name: 'Aadhar card.pdf',
        file_size: '16Mb',
        file_date: '12/07/2023'
    }
]
const t_headings=['File Name','File Size','Date Uploaded',]

const StudentResouces = () => {
  return (
    <React.Fragment>
        <Heading heading={'Student Resouces'} />
        <DragDrop />
        <div className={classes.con}>
          <ResourceElementCard wd={36} />
          <ResourceElementCard wd={45} />
          <ResourceElementCard wd={93} />
        </div>
        <ResourceFilter />
        <MainTable data={t_data} headings={t_headings} keys={t_key} ev={true} />
    </React.Fragment>
  )
}

export default StudentResouces