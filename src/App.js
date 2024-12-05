import React, { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import HomeNavigation from "./shared/components/Navigation/HomeNavigation";
import Home from "./home/pages/Home";
import Auth from "./users/pages/Auth";
import Profile from "./users/pages/Profile";
import EditProfile from "./users/pages/EditProfile";
import Feed from "./feed/pages/Feed";
import NewEvent from "./feed/pages/NewEvent";
import ViewEvent from "./feed/pages/ViewEvent";
import EditEvent from "./feed/pages/EditEvent";
import Sports from "./sports/pages/Sports";
import SportPage from "./sports/pages/SportPage";
import { AuthContext } from "./shared/context/auth-context";
import { onAuthStateChanged } from "firebase/auth";
import { auth as firebaseAuth } from "./shared/context/firebase"; // Firebase Auth instance
import { useHttpClient } from "./shared/hooks/http-hook"; // HTTP Client for API calls
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

import "./App.css";

const App = () => {
  const [mongoUserId, setMongoUserId] = useState(null); // MongoDB user ID
  const [isLoading, setIsLoading] = useState(true); // To track auth state loading
  const { sendRequest } = useHttpClient(); // Custom hook for HTTP requests
  const location = useLocation();
  const isHomeRoute = location.pathname === "/";

  // Monitor Firebase authentication state and fetch MongoDB user ID
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      if (firebaseUser) {
        try {

          // Fetch MongoDB user based on Firebase UID
          const response = await sendRequest(
            `http://localhost:5000/api/users/getByFirebaseUid/${firebaseUser.uid}`,
            "GET"
          );

          setMongoUserId(response.user.id); // Set MongoDB user ID
          console.log(response.user.id)

        } catch (err) {
          console.error("Failed to fetch MongoDB user:", err);
        }
      } else {
        setMongoUserId(null); // Clear MongoDB user ID if logged out
      }

      setIsLoading(false); // Auth state resolved
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [sendRequest]);

  const login = useCallback((mongoUserId) => {
    setMongoUserId(mongoUserId); // Update MongoDB user ID
  }, []);

  const logout = useCallback(() => {
    firebaseAuth.signOut(); // Log out from Firebase
    setMongoUserId(null); // Clear MongoDB user ID
  }, []);

  // Show a loading spinner while waiting for auth state to resolve
  if (isLoading) {
    return <LoadingSpinner asOverlay />;
  }

  return (
    <AuthContext.Provider value={{ mongoUserId, login, logout }}>
      {isHomeRoute ? (
        <div></div> /* Placeholder for Home Navigation */
      ) : (
        <MainNavigation />
      )}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={!mongoUserId ? <Auth /> : <Navigate to="/feed" replace />} />
          <Route
            path="/profile/:userId"
            element={mongoUserId ? <Profile /> : <Navigate to="/auth" replace />}
          />
          <Route
            path="/profile/edit/:userId"
            element={mongoUserId ? <EditProfile /> : <Navigate to="/auth" replace />}
          />
          <Route
            path="/feed"
            element={mongoUserId ? <Feed /> : <Navigate to="/auth" replace />}
          />
          <Route
            path="/event/new"
            element={mongoUserId ? <NewEvent /> : <Navigate to="/auth" replace />}
          />
          <Route
            path="/event/edit/:eventId"
            element={mongoUserId ? <EditEvent /> : <Navigate to="/auth" replace />}
          />
          <Route
            path="/event/:eventId"
            element={mongoUserId ? <ViewEvent /> : <Navigate to="/auth" replace />}
          />
          <Route
            path="/sports"
            element={mongoUserId ? <Sports /> : <Navigate to="/auth" replace />}
          />
          <Route
            path="/sports/:sportId"
            element={mongoUserId ? <SportPage /> : <Navigate to="/auth" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </AuthContext.Provider>
  );
};

export default App;
