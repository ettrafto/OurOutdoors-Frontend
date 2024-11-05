import React, { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Home from './home/pages/Home';
import Auth from './users/pages/Auth';
import Profile from './users/pages/Profile';
import EditProfile from './users/pages/EditProfile';
//import Friends from './users/pages/Friends';
import Feed from './feed/pages/Feed';
import NewEvent from './feed/pages/NewEvent';
import ViewEvent from './feed/pages/ViewEvent';
import EditEvent from './feed/pages/EditEvent';
import Sports from './sports/pages/Sports';
import SportPage from './sports/pages/SportPage';
import { AuthContext } from './shared/context/auth-context';

import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);


  return (
    <AuthContext.Provider value={{isLoggedIn, login, logout}}>
      <Router>
        <MainNavigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile/:userId" element={isLoggedIn ? <Profile /> : <Navigate to="/auth" replace />} />
            <Route path="/profile/edit/:userId" element={isLoggedIn ? <EditProfile /> : <Navigate to="/auth" replace />} />
            <Route path="/feed" element={isLoggedIn ? <Feed /> : <Navigate to="/auth" replace />} />
            <Route path="/event/new" element={isLoggedIn ? <NewEvent /> : <Navigate to="/auth" replace />} />
            <Route path="/event/edit/:eventId" element={isLoggedIn ? <EditEvent /> : <Navigate to="/auth" replace />} />
            <Route path="/event/:eventId" element={isLoggedIn ? <ViewEvent /> : <Navigate to="/auth" replace />} />
            <Route path="/sports" element={isLoggedIn ? <Sports /> : <Navigate to="/auth" replace />} />
            <Route path="/sports/:sportId" element={isLoggedIn ? <SportPage /> : <Navigate to="/auth" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;