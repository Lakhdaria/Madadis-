import React from 'react';
import ReactDOM from 'react-dom/client'; // Pour React 18
import App from './App';
import { AuthProvider } from './pages/AuthContext'; // Assurez-vous que le chemin est correct
import './index.css'


const root = ReactDOM.createRoot(document.getElementById('root')); // Pour React 18
root.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);
