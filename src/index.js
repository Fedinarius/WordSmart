import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Words from './Words';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

ReactDOM.render(
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/words" element={<Words />} />
        </Routes>
    </Router>,
    document.getElementById('root')
);
