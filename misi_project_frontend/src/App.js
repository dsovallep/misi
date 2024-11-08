import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Transactions from './pages/Transactions';


function App() {
    return(
        <Router>
            <div>
                <nav>
                    <ul>
                       <li><Link to="/">Home</Link></li>
                       <li><Link to="/transactions">Transactions</Link></li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/transactions" element={<Transactions />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
