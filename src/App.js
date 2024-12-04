import React, { useState, useEffect, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation
} from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import HomeNavigation from './shared/components/Navigation/HomeNavigation';
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
  const [showHomeNav, setShowHomeNav] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const location = useLocation();
  const isHomeRoute = location.pathname === '/';


  return (
    <AuthContext.Provider value={{isLoggedIn, login, logout}}>
      {isHomeRoute ? <div></div>/*<HomeNavigation /> */: <MainNavigation />}
      <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile/:userId" element={isLoggedIn ? <Profile /> : <Navigate to="/" replace />} />
            <Route path="/profile/edit/:userId" element={isLoggedIn ? <EditProfile /> : <Navigate to="/" replace />} />
            <Route path="/feed" element={isLoggedIn ? <Feed /> : <Navigate to="/" replace />} />
            <Route path="/event/new" element={isLoggedIn ? <NewEvent /> : <Navigate to="/" replace />} />
            <Route path="/event/edit/:eventId" element={isLoggedIn ? <EditEvent /> : <Navigate to="/" replace />} />
            <Route path="/event/:eventId" element={isLoggedIn ? <ViewEvent /> : <Navigate to="/" replace />} />
            <Route path="/sports" element={isLoggedIn ? <Sports /> : <Navigate to="/" replace />} />
            <Route path="/sports/:sportId" element={isLoggedIn ? <SportPage /> : <Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
    </AuthContext.Provider>
  );
};

export default App;