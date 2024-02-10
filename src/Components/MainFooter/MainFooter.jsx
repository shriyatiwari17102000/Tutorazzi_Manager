import React from 'react'
import classes from './MainFooter.module.css'
import { Link } from 'react-router-dom'
import grid from '../../assets/grid.png'

const MainFooter = () => {
  return (
    <footer className={classes.footer}>
        <img src={grid} className={classes.img} alt="" />
        <div className={classes.upper_footer}>
            <h1>Tutorazzi</h1>
            <div className={classes.grid}>
                <nav className={classes.upper_footer_nav}>
                    <h3 className={classes.heading}>Company</h3>
                    <Link className={classes.link} to={'/'}>About us</Link>
                    <Link className={classes.link} to={'/'}>Contact us</Link>
                    <Link className={classes.link} to={'/'}>Resources</Link>
                    <Link className={classes.link} to={'/'}>Link 1</Link>
                    <Link className={classes.link}  to={'/'}>Link 2</Link>
                </nav>
                <nav className={classes.upper_footer_nav}>
                    <h3 className={classes.heading}>Company</h3>
                    <Link className={classes.link} to={'/'}>About us</Link>
                    <Link className={classes.link} to={'/'}>Contact us</Link>
                    <Link className={classes.link} to={'/'}>Resources</Link>
                    <Link className={classes.link} to={'/'}>Link 1</Link>
                    <Link className={classes.link}  to={'/'}>Link 2</Link>
                </nav>
                <nav className={classes.upper_footer_nav}>
                    <h3 className={classes.heading}>Company</h3>
                    <Link className={classes.link} to={'/'}>About us</Link>
                    <Link className={classes.link} to={'/'}>Contact us</Link>
                    <Link className={classes.link} to={'/'}>Resources</Link>
                    <Link className={classes.link} to={'/'}>Link 1</Link>
                    <Link className={classes.link}  to={'/'}>Link 2</Link>
                </nav>
                <nav className={classes.upper_footer_nav}>
                    <h3 className={classes.heading}>Company</h3>
                    <Link className={classes.link} to={'/'}>About us</Link>
                    <Link className={classes.link} to={'/'}>Contact us</Link>
                    <Link className={classes.link} to={'/'}>Resources</Link>
                    <Link className={classes.link} to={'/'}>Link 1</Link>
                    <Link className={classes.link}  to={'/'}>Link 2</Link>
                </nav>
                <nav className={`${classes.upper_footer_nav} ${classes.contact_div}`}>
                    <h3 className={classes.heading}>Contact us</h3>
                    <Link className={classes.link} to={'/'}>Tutorazzi@contactus.com</Link>
                    <Link className={classes.link} to={'/'}>+917503063585</Link>
                    <Link className={classes.link} to={'/'}>123, New Street avenue, Califonia, United states of america</Link>
                </nav>
            </div>
        </div>
        <div className={classes.lower_footer}>
            <p>@2023 Tutorazzi, All right Reserved</p>
            <nav className={classes.lower_footer_nav}>
                <Link className={classes.link} to={'/'} >Terms & Condition</Link>
                <Link className={classes.link} to={'/'} >Privacy Policy</Link>
                <Link className={classes.link} to={'/'} >Cookies</Link>
            </nav>
        </div>
    </footer>
  )
}

export default MainFooter
