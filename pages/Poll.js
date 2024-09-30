import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PollCreationForm from './PollCreationForm';
import PollDetails from './PollDetails';

function poll() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PollCreationForm />} />
                <Route path="/poll/:id" element={<PollDetails />} />
            </Routes>
        </Router>
    );
}

export default poll;
