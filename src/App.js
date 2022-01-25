import styles from './App.module.scss';
import Navigation from './components/Navigation/Navigation'
import { Routes, Route, HashRouter } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Reset from './pages/Reset/Reset';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.appContainer}>
        <HashRouter>
            <Navigation />
            <div className={styles.appContent}>
              <Routes>
                  <Route exact path="/" element={<Home />}/>
                  {/*<Route path="/portfolio/*" element={<Portfolio />} />*/}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/reset" element={<Reset />} />
                  <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </div>
        </HashRouter>
      </div>
    </div>
  );
}

export default App;
