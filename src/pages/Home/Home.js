import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { getTodaysWords } from "../../services/firebase";
import FiveLetters from "../FiveLetters/FiveLetters";
import FourLetters from "../FourLetters/FourLetters";
import SixLetters from "../SixLetters/SixLetters";
import styles from "./Home.module.scss";

const GameCard = ({ title, onClick}) => (
    <div onClick={onClick} className={styles.gameCard}>
        {title}
    </div>
);

const Home = () => {
    const navigate = useNavigate();
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    return (
        <div>
            <div className={styles.yourCard}>
                <div className={styles.header}>
                    <div className={styles.date}>{mm}.{dd}.{yyyy}</div>
                    <div className={styles.progress}>
                        <div className={styles.line} />
                        <div>0 / 3</div>
                        <div className={styles.line} />
                    </div>
                </div>
                <div className={styles.gameCardsContainer}>
                    <GameCard title={"4 Letters"} onClick={() => navigate("/4-letters")}/>
                    <GameCard title={"5 Letters"} onClick={() => navigate("/5-letters")}/>
                    <GameCard title={"6 Letters"} onClick={() => navigate("/6-letters")}/>
                </div>
            </div>
        </div>
    )
}

const HomeNav = () => {
    return (
        <div className={styles.container}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/4-letters" element={<FourLetters />} />
                <Route path="/5-letters" element={<FiveLetters />} />
                <Route path="/6-letters" element={<SixLetters />} />
            </Routes>
        </div>
    );
  }

  export default HomeNav;