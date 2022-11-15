import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';  

const doc = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(doc).render(<App />);