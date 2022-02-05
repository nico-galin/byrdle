import { useState, useEffect, createContext, useContext } from 'react';
import { getTimestamp } from '../services/utils';

export const LocalDataContext = createContext();

export const LocalDataProvider = ({ children }) => {
  const [todayData, setTodayData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      let todayData = await localStorage.getItem('TodaysWords');
      todayData = JSON.parse(todayData);
      if (getTimestamp() !== todayData.timestamp) {
        await localStorage.removeItem('TodaysWords');
      } else {
        setTodayData(todayData);
      }
      setLoading(false);
    }
    init();
  }, [])

  const updateProgress = (length, guesses, finished=false) => {
      const newTodayData = {...todayData, timestamp: getTimestamp()};
      newTodayData[length] = {
          finished: finished,
          guesses: guesses
      }
      localStorage.setItem('TodaysWords', JSON.stringify(newTodayData));
      setTodayData(newTodayData)
  }

  return (
    <LocalDataContext.Provider
      value={{
        todayData,
        updateProgress,
        loading
      }}
    >
      {children}
    </LocalDataContext.Provider>
  );
};

export const useLocalData = () => {
  return useContext(LocalDataContext);
}