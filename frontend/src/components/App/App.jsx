import { useState, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import LandingPage from '../LandingPage';
import DetailsPage from '../DetailsPage';

export default function App() {

  return (
    <>
      <Link to="/">KIT</Link>

      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/details" element={<DetailsPage />} />
      </Routes>
    </>
  )
}


