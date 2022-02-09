import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useLocalData } from "../../contexts/localData";
import { getTodaysWords } from "../../services/firebase";
import FiveLetters from "../FiveLetters/FiveLetters";
import FourLetters from "../FourLetters/FourLetters";
import SixLetters from "../SixLetters/SixLetters";
import styles from "./Home.module.scss";

const GameCard = ({ title, onClick, finished}) => (
    <div onClick={onClick} className={finished ? styles.gameCard__finished : styles.gameCard}>
        {title}
        {finished &&
            <div className={styles.check} />
        }
    </div>
);

const Home = () => {
    const navigate = useNavigate();
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    const { todayData, loading } = useLocalData();
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
                    <GameCard title={"4 Letters"} onClick={() => navigate("/4-letters")} finished={!!todayData && !!todayData[4] && todayData[4].finished}/>
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