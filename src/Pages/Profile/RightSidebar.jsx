import React, { useEffect, useState } from 'react'
import classes from './Profile.module.css'
import Container from '../../UI/Container/Container'
import FallbackImage from '../../Components/FallbackImgae/FallbackImage'

const RightSidebar = () => {

    return (
        <React.Fragment>

            <Container cls={classes.cont_main}>
                <div className={classes.teach_div}>
                    <h5>All Teachers</h5>
                    <div className={classes.inn_teach}>
                        <FallbackImage cls={classes.img2} imgData={""} />
                        <div className={classes.teach_div2}>
                            <h5>Shriya</h5>
                            <p>Australian Curriculum</p>
                        </div>
                    </div>
                    <div className={classes.inn_teach}>
                        <FallbackImage cls={classes.img2} imgData={""} />
                        <div className={classes.teach_div2}>
                            <h5>Shriya</h5>
                            <p>Australian Curriculum</p>
                        </div>
                    </div>
                    <div className={classes.inn_teach}>
                        <FallbackImage cls={classes.img2} imgData={""} />
                        <div className={classes.teach_div2}>
                            <h5>Shriya</h5>
                            <p>Australian Curriculum</p>
                        </div>
                    </div>
                    <div className={classes.inn_teach}>
                        <FallbackImage cls={classes.img2} imgData={""} />
                        <div className={classes.teach_div2}>
                            <h5>Shriya</h5>
                            <p>Australian Curriculum</p>
                        </div>
                    </div>
                    {/* <div className={classes.inn_teach}>
                        <FallbackImage cls={classes.img2} imgData={""} />
                        <div className={classes.teach_div2}>
                            <h5>Shriya</h5>
                            <p>Australian Curriculum</p>
                        </div>
                    </div> */}

                        <button className={classes.view_btn}>View All</button>
                    
                </div>
                <div className={classes.teach_div} style={{marginTop:"40px"}}>
                    <h5>All Students</h5>
                    {/* <div className={classes.inn_teach}>
                        <FallbackImage cls={classes.img2} imgData={""} />
                        <div className={classes.teach_div2}>
                            <h5>Shriya</h5>
                            <p>Australian Curriculum</p>
                        </div>
                    </div> */}
                    <div className={classes.inn_teach}>
                        <FallbackImage cls={classes.img2} imgData={""} />
                        <div className={classes.teach_div2}>
                            <h5>Shriya</h5>
                            <p>Australian Curriculum</p>
                        </div>
                    </div>
                    <div className={classes.inn_teach}>
                        <FallbackImage cls={classes.img2} imgData={""} />
                        <div className={classes.teach_div2}>
                            <h5>Shriya</h5>
                            <p>Australian Curriculum</p>
                        </div>
                    </div>
                    <div className={classes.inn_teach}>
                        <FallbackImage cls={classes.img2} imgData={""} />
                        <div className={classes.teach_div2}>
                            <h5>Shriya</h5>
                            <p>Australian Curriculum</p>
                        </div>
                    </div>
                    <div className={classes.inn_teach}>
                        <FallbackImage cls={classes.img2} imgData={""} />
                        <div className={classes.teach_div2}>
                            <h5>Shriya</h5>
                            <p>Australian Curriculum</p>
                        </div>
                    </div>

                        <button className={classes.view_btn}>View All</button>
                    
                </div>
               
            </Container>

        </React.Fragment>
    )
}

export default RightSidebar