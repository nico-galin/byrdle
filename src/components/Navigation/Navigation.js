import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Navigation.module.scss';
import { useWindowDimensions } from '../../contexts/windowDimensions';
import { auth, signOut } from "../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import MenuIcon from '../MenuIcon/MenuIcon';
import watermark from "../../assets/watermark_white.png"

const Navigation = () => {
    const navigate = useNavigate();
    const { width } = useWindowDimensions();
    const location = useLocation().pathname;
    const topTab = location.split("/")[1];
    const [user, loading, error] = useAuthState(auth);
    const [fullscreenNavOpen, setFullscreenNavOpen] = useState(false);
    let backBtnHidden = true;
    switch(location) {
        case "/4-letters":
            backBtnHidden = false;
            break;
        case "/5-letters":
            backBtnHidden = false;
            break;
        case "/6-letters":
            backBtnHidden = false;
            break;
        default:
            backBtnHidden = true;
    }
    if (fullscreenNavOpen) backBtnHidden = true;
    if (location === "4-letters") {

    }
    useEffect(() => {
        // runs on location, i.e. route, change
    }, [location])
    
    const toggleFullscreenNav = () => {
        setFullscreenNavOpen(prev => !prev);
    }

    const goTo = (url) => {
        navigate(url);
        if (fullscreenNavOpen) toggleFullscreenNav();
    }

    const triggerSignOut = () => {
        navigate("/");
        signOut();
    }

    const goBack = () => {
        navigate("/");
    }

    return (
        <>
            <div className={styles.dummyNav} />
            <nav className={styles.topNav__container}>
                <ul className={styles.topNav}>
                    <li className={`${backBtnHidden ? styles.backBtnHidden : null} ${styles.backBtn}`} onClick={goBack}>
                        <svg height="22" viewBox="0 0 24 24" width="22"><path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" fill="white"/>
                        </svg>
                    </li>
                    <li>
                        <Link to="/" className={styles.link}>Byrdle</Link>
                    </li>
                    <li>
                        <MenuIcon onClick={toggleFullscreenNav} checked={fullscreenNavOpen}/>
                    </li>
                </ul>
            </nav>
            <div className={`${styles.fullpageNav__container} ${!fullscreenNavOpen ? styles.fullpageNav__hidden : null}`}>
                <ul className={styles.fullpageNav}>
                    <li className={styles.link} onClick={() => goTo("/")}>Play</li>
                    {!!user ?
                        <>
                            <li className={styles.link} onClick={() => goTo(topTab === "dashboard" ? location : "/dashboard")}>Dashboard</li>
                            <li className={styles.link} onClick={triggerSignOut}>Sign Out</li>
                        </>
                    :
                        <li className={styles.link} onClick={() => goTo("/login")}>Sign In</li>
                    }
                    <img className={styles.watermark} src={watermark} alt={'creator'} width={150} onClick={() => window.open('https://nico-galin.github.io', '_blank')}/>
                </ul>
            </div>
        </>
    );
  }
  
export default Navigation;
  

  
