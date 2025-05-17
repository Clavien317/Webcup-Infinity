import React from 'react'
import LandingPage from "./pages/LandingPage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import ExamplesPage from "./pages/ExamplesPage.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HowItWorks from './components/HowItWorks.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/create" element={<CreatePage/>}/>
                <Route path="/examples" element={<ExamplesPage/>}/>
                <Route path="/how-it-works" element={<HowItWorks/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App