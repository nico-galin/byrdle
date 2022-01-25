import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Navigation.module.scss';
import { useWindowDimensions } from '../../contexts/windowDimensions';
import { auth, signOut } from "../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import MenuIcon from '../MenuIcon/MenuIcon';

const Navigation = () => {
    const navigate = useNavigate();
    const { width } = useWindowDimensions();
    const location = useLocation().pathname;
    const topTab = location.split("/")[1];
    const [user, loading, error] = useAuthState(auth);
    const [fullscreenNavOpen, setFullscreenNavOpen] = useState(false);

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

    return (
        <>
            <div className={styles.dummyNav} />
            <nav className={styles.topNav__container}>
                <ul className={styles.topNav}>
                    <li>
                        <MenuIcon onClick={toggleFullscreenNav} checked={fullscreenNavOpen}/>
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
                </ul>
            </div>
        </>
    );
  }
  
export default Navigation;
  

  
