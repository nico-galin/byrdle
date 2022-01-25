import { useState, useEffect } from 'react';

export const useWordData = () => {

  const [words, setWords] = useState();

  useEffect(() => {
    setWords()
  }, []);

  return words;
}