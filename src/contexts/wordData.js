import { useState, useEffect, createContext, useContext } from 'react';
import { getTodaysWords } from '../services/firebase';

export const WordContext = createContext();

export const WordProvider = ({ children }) => {
  const [words, setWords] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      let newWords = await getTodaysWords();
      setWords(newWords);
      setLoading(false);
    }
    init();
  }, [])

  return (
    <WordContext.Provider
      value={{
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