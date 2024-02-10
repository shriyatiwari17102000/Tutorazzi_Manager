import React from 'react'
import Foldable from '../../Foldable/Foldable'
import classes from './support.module.css'

const SupportFoldContainer = () => {
  return (
    <div className={classes.container}>
        <Foldable open={true} cls={classes.fold}>
            <div className={classes.header}>
                <div className={classes.inner_header}>
                    <h4>#7432</h4>
                    <h4>Give me some help in admissions</h4>
                </div>
                <p className={classes.status}>Marked Resolved</p>
            </div>
            <div className={classes.body}>
                <div className={classes.pair_container}>
                    <h6 className={classes.label}>Title</h6>
                    <p className={classes.para}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus vitae possimus ducimus eos voluptatibus ut.
                    </p>
                </div>
                <div className={classes.pair_container}>
                    <h6 className={classes.label}>Description</h6>
                    <p className={classes.para}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo ea laudantium, ut laboriosam beatae ipsa eveniet rem pariatur provident eum neque quaerat. Nesciunt vitae, unde et omnis laboriosam exercitationem doloribus quibusdam perferendis perspiciatis quia obcaecati minus harum a possimus placeat sunt consectetur assumenda doloremque iusto.
                    </p>
                </div>
                <div className={classes.pair_container}>
                    <h6 className={classes.label}>Date</h6>
                    <p className={classes.para}>
                       24/12/2023
                    </p>
                </div>
            </div>
        </Foldable>
        <Foldable cls={classes.fold}>
            <div className={classes.header}>
                <div className={classes.inner_header}>
                    <h4>#7432</h4>
                    <h4>Give me some help in admissions</h4>
                </div>
                <p className={classes.status}>Marked Resolved</p>
            </div>
            <div className={classes.body}>
                <div className={classes.pair_container}>
                    <h6 className={classes.label}>Title</h6>
                    <p className={classes.para}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus vitae possimus ducimus eos voluptatibus ut.
                    </p>
                </div>
                <div className={classes.pair_container}>
                    <h6 className={classes.label}>Description</h6>
                    <p className={classes.para}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo ea laudantium, ut laboriosam beatae ipsa eveniet rem pariatur provident eum neque quaerat. Nesciunt vitae, unde et omnis laboriosam exercitationem doloribus quibusdam perferendis perspiciatis quia obcaecati minus harum a possimus placeat sunt consectetur assumenda doloremque iusto.
                    </p>
                </div>
                <div className={classes.pair_container}>
                    <h6 className={classes.label}>Date</h6>
                    <p className={classes.para}>
                       24/12/2023
                    </p>
                </div>
            </div>
        </Foldable>
        <Foldable cls={classes.fold}>
            <div className={classes.header}>
                <div className={classes.inner_header}>
                    <h4>#7432</h4>
                    <h4>Give me some help in admissions</h4>
                </div>
                <p className={classes.status}>Marked Resolved</p>
            </div>
            <div className={classes.body}>
                <div className={classes.pair_container}>
                    <h6 className={classes.label}>Title</h6>
                    <p className={classes.para}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus vitae possimus ducimus eos voluptatibus ut.
                    </p>
                </div>
                <div className={classes.pair_container}>
                    <h6 className={classes.label}>Description</h6>
                    <p className={classes.para}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo ea laudantium, ut laboriosam beatae ipsa eveniet rem pariatur provident eum neque quaerat. Nesciunt vitae, unde et omnis laboriosam exercitationem doloribus quibusdam perferendis perspiciatis quia obcaecati minus harum a possimus placeat sunt consectetur assumenda doloremque iusto.
                    </p>
                </div>
                <div className={classes.pair_container}>
                    <h6 className={classes.label}>Date</h6>
                    <p className={classes.para}>
                       24/12/2023
                    </p>
                </div>
            </div>
        </Foldable>
    </div>
  )
}

export default SupportFoldContainer
