import styles from './App.module.scss';
import Navigation from './components/Navigation/Navigation'
import { Routes, Route, HashRouter } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Reset from './pages/Reset/Reset';
import Dashboard from './pages/Dashboard/Dashboard';
import { WordProvider } from './contexts/wordData';
import { LocalDataProvider } from './contexts/localData';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.appContainer}>
        <LocalDataProvider>
          <WordProvider>
            <HashRouter>
                <Navigation />
                <div className={styles.appContent}>
                  <Routes>
                      <Route path="/*" element={<Home />}/>
                      {/*<Route path="/portfolio/*" element={<Portfolio />} />*/}
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/reset" element={<Reset />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                  </Routes>
                </div>
            </HashRouter>
          </WordProvider>
        </LocalDataProvider>
      </div>
    </div>
  );
}

export default App;
