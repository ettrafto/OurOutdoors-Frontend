import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from "./shared/context/auth-context";
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container); // create a root

root.render(
    
    <Router>
          <AuthProvider>
            <App />
        </AuthProvider>
    </Router>
);