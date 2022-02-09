import { useState, useEffect, createContext, useContext } from 'react';
import { getTimestamp } from '../services/utils';

export const LocalDataContext = createContext();

export const LocalDataProvider = ({ children }) => {
  const [todayData, setTodayData] = useState();
  const [history, setHistory] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const curTime = getTimestamp();
      let newHistory = await localStorage.getItem('History');
      let newTodayData = await localStorage.getItem('TodaysWords');
      newHistory = JSON.parse(newHistory);
      newTodayData = JSON.parse(newTodayData);
      if (!newTodayData) {
        newTodayData = {timestamp: curTime}
        localStorage.setItem('TodaysWords', JSON.stringify(newTodayData));
      } else if (getTimestamp() !== newTodayData.timestamp) {
        newTodayData = {timestamp: curTime}
        localStorage.setItem('TodaysWords', JSON.stringify(newTodayData));
      }
      setTodayData(newTodayData);
      setLoading(false);
    }
    init();
  }, [])

  const getHistory = async () => {
    
  }

  const updateProgress = (length, guesses, finished=false) => {
    const curTime = getTimestamp();
    let newTodayData;
    if (curTime !== todayData.timestamp) {
      newTodayData = {timestamp: curTime}
      localStorage.removeItem('TodaysWords');
      setTodayData({timestamp: curTime})
    } else {
      newTodayData = {...todayData, timestamp: curTime};
      newTodayData[length] = {
          finished: finished,
          guesses: guesses,
          timestamp: curTime
      }
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