import { useState, createContext, useContext, useEffect, useCallback, useMemo } from 'react';
import { getTodaysWords } from '../services/firebase';
import { getTimestamp } from '../services/utils';
import { useLocalData } from './localData';

export const WordContext = createContext();

export const WordProvider = ({ children }) => {
  const [words, setWords] = useState();
  const [loading, setLoading] = useState(true);

  const init = async () => {
    let newWords = await getTodaysWords();
    setWords(newWords);
    setLoading(false);
  }

  useEffect(() => {
    init();
  }, [])

  const verifyWords = async () => {
    if (!!words && getTimestamp() !== words.date) {
      await init();
    }
  }

  return (
    <WordContext.Provider
      value={{
        verifyWords,
        words,
        loading
      }}
    >
      {children}
    </WordContext.Provider>
  );
};

export const useWords = () => {
  return useContext(WordContext);
}