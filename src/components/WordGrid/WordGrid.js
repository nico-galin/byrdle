import React, { useEffect, useState } from 'react';
import { useLocalData } from '../../contexts/localData';
import { useWords } from '../../contexts/wordData';
import { getTimestamp, validWord } from '../../services/utils';
import styles from './WordGrid.module.scss';

const WordGrid = ({ len }) => {
    const { todayData, updateProgress, loading } = useLocalData();
    const [currentGuess, setCurrentGuess] = useState("");
    const { verifyWords, words } = useWords();
    const word = words[len]
    let guesses = !!todayData && !!todayData[len] && !!todayData[len].guesses ? todayData[len].guesses : [];

    let tries = 6;
    let sqClass = styles.square__5;
    if (len === 4) {
        tries = 5;
        sqClass = styles.square__4;
    } else if (len === 6) {
        tries = 7;
        sqClass = styles.square__6;
    }
    let finished;
    let responseValues = [];
    if (!!guesses) {
        finished = guesses.length === tries || (!!guesses[guesses.length - 1] && guesses[guesses.length - 1].toLowerCase() === word.toLowerCase());
        for (let i = 0; i < guesses.length; i++) {
            let lettersLeft = word;
            let guessLettersLeft = guesses[i];
            let response = [...Array(len).fill(0)]
            for (let j = 0; j < word.length; j++) {
                if (guesses[i][j] === word[j]) {
                    lettersLeft = lettersLeft.replace(guesses[i][j], '');
                    guessLettersLeft = guessLettersLeft.replace(guesses[i][j], '');
                    response[j] = 2;
                }
            }
            for (let j = 0; j < guesses[i].length; j++) {
                if (response[j] !== 2 && lettersLeft.includes(guesses[i][j])) {
                    lettersLeft = lettersLeft.replace(guesses[i][j], '');
                    response[j] = 1;
                }
            }
            responseValues.push(response)
        }
    }

    const getKeyClass = (key) => {
        if (finished) return styles.key__disabled;
        if (guesses.length === 0) return null;
        let curReponseValues = [];
        let count = 0;
        for (let i = 0; i < guesses.length; i++) {
            for (let j = 0; j < guesses[0].length; j++) {
                if (guesses[i][j] === key) {
                    curReponseValues.push(responseValues[i][j]);
                    count++;
                }
            }
        }
        if (curReponseValues.includes(2)) {
            return styles.key__correct;
        } else if (count > 0 && curReponseValues.reduce((sum, x) => sum + x) === 0) {
            return styles.key__disabled;
        }
        return null;
    }

    const shareResults = () => {
        let str = `Byrdle ${getTimestamp(".")}\n\n`;
        responseValues.forEach((row, rInd) => {
            row.forEach(tile => {
                switch(tile) {
                    case 1:
                        str += "????";
                        break;
                    case 2:
                        str += "????";
                        break;
                    default:
                        str += "???";
                        break;
                }
            });
            str += "\n"
        })
        navigator.share({
            text: str + "\nhttps://nicogalin.com/byrdle/"
        })
    }

    const guessValid = async (guess) => {
        try {
            if (!guess) return false;
            if (guess.trim() === "") return false;
            if (guess.length !== word.length) return false;
            return validWord(guess);
        } catch (e) {
            return false;
        }
    }

    const updateGuess = async (letter = "", enter = false, del = false) => {
        const valid = await guessValid(currentGuess)
        if (enter) {
            if (valid) {
                const prevWord = word;
                await verifyWords();
                if (prevWord === word) {
                    const newGuesses = [...guesses, currentGuess]
                    updateProgress(len, newGuesses, currentGuess.toLowerCase() === word.toLowerCase());
                    setCurrentGuess("");
                } else {
                    updateProgress(len, [], false);
                    setCurrentGuess("");
                }
            }
            return;
        } else if (del) {
            setCurrentGuess(prev => prev.slice(0, prev.length - 1));
            return;
        } else if (currentGuess.length >= len) return;
        setCurrentGuess(prev => prev + letter);
    }

    return (
        <div className={styles.container}>
            {finished &&
                <div className={styles.modal_wrapper}>
                    <div className={styles.modal_header}>{todayData[len].finished ? "CONGRATULATIONS" : "BETTER LUCK TOMORROW"}</div>
                    <div className={styles.modal_footer}>
                        <div className={styles.modal_word}>{word}</div>
                        <div className={styles.modal_footer_divider} />
                        <div className={styles.modal_share} onClick={shareResults}>SHARE</div>
                    </div>
                </div>
            }
            <div className={styles.notification}>Invalid Word</div>
            <div className={finished ? styles.gameContent_finished : null}>
                <div className={styles.grid}>
                    {[...Array(tries)].map((_, rowInd) => (
                        <div className={styles.row} key={rowInd}>
                            {[...Array(len)].map((_, letterInd) => {
                                if (rowInd === guesses.length) return (
                                    <div className={sqClass} key={letterInd}>
                                        <div>{!!currentGuess[letterInd] ? currentGuess[letterInd] : null}</div>
                                    </div>
                                )
                                return (
                                    <div key={letterInd} className={`${sqClass} ${!!responseValues[rowInd] && responseValues[rowInd][letterInd] === 2 ? styles.square__correct : null} ${!!responseValues[rowInd] && responseValues[rowInd][letterInd] === 1 ? styles.square__close : null}`}>
                                        <div>{!!guesses[rowInd] ? guesses[rowInd][letterInd] : null}</div>
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </div>
                <div className={styles.keyboard}>
                    <div className={styles.keyboardRow}>
                        <div className={getKeyClass("q")} onClick={() => updateGuess("q")}>q</div>
                        <div className={getKeyClass("w")} onClick={() => updateGuess("w")}>w</div>
                        <div className={getKeyClass("e")} onClick={() => updateGuess("e")}>e</div>
                        <div className={getKeyClass("r")} onClick={() => updateGuess("r")}>r</div>
                        <div className={getKeyClass("t")} onClick={() => updateGuess("t")}>t</div>
                        <div className={getKeyClass("y")} onClick={() => updateGuess("y")}>y</div>
                        <div className={getKeyClass("u")} onClick={() => updateGuess("u")}>u</div>
                        <div className={getKeyClass("i")} onClick={() => updateGuess("i")}>i</div>
                        <div className={getKeyClass("o")} onClick={() => updateGuess("o")}>o</div>
                        <div className={getKeyClass("p")} onClick={() => updateGuess("p")}>p</div>
                    </div>
                    <div className={styles.keyboardRow}>
                        <div className={getKeyClass("a")} onClick={() => updateGuess("a")}>a</div>
                        <div className={getKeyClass("s")} onClick={() => updateGuess("s")}>s</div>
                        <div className={getKeyClass("d")} onClick={() => updateGuess("d")}>d</div>
                        <div className={getKeyClass("f")} onClick={() => updateGuess("f")}>f</div>
                        <div className={getKeyClass("g")} onClick={() => updateGuess("g")}>g</div>
                        <div className={getKeyClass("h")} onClick={() => updateGuess("h")}>h</div>
                        <div className={getKeyClass("j")} onClick={() => updateGuess("j")}>j</div>
                        <div className={getKeyClass("k")} onClick={() => updateGuess("k")}>k</div>
                        <div className={getKeyClass("l")} onClick={() => updateGuess("l")}>l</div>
                    </div>
                    <div className={styles.keyboardRow}>
                        <div className={finished ? styles.key__disabled : null} onClick={() => updateGuess(null, false, true)}>DEL</div>
                        <div className={getKeyClass("z")} onClick={() => updateGuess("z")}>z</div>
                        <div className={getKeyClass("x")} onClick={() => updateGuess("x")}>x</div>
                        <div className={getKeyClass("c")} onClick={() => updateGuess("c")}>c</div>
                        <div className={getKeyClass("v")} onClick={() => updateGuess("v")}>v</div>
                        <div className={getKeyClass("b")} onClick={() => updateGuess("b")}>b</div>
                        <div className={getKeyClass("n")} onClick={() => updateGuess("n")}>n</div>
                        <div className={getKeyClass("m")} onClick={() => updateGuess("m")}>m</div>
                        <div className={finished ? styles.key__disabled : null} onClick={() => updateGuess(null, true, false)}>GO</div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
export default WordGrid;
  

  
