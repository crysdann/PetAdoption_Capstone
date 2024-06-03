import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AdoptionList from "./components/Adopt";
import LostPets from "./components/LostPets";
import SuccessStories from "./components/SuccessStories";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="adopt" element={<AdoptionList />} />
        <Route path="lostpets" element={<LostPets />} />
        <Route path="successstories" element={<SuccessStories />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
