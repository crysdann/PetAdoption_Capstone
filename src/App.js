import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AdoptionList from "./components/Adopt";
import LostPets from "./components/LostPets";
import SuccessStories from "./components/SuccessStories";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import SuccessStoriesNarratives from "./components/SuccessStoriesNarratives";
import LostPetForm from "./components/LostPetForm";
import PetDetails from "./components/AdoptPetDetail";
import Login from "./components/Login";
import { useLocation } from "react-router-dom";
import Signup from "./components/Signup";
import UserProfile from "./components/UserProfile";
import AdoptForm from "./components/AdoptionDataForm";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="adopt" element={<AdoptionList />} />
        <Route path="petdetails" element={<PetDetails />} />
        <Route path="lostpets" element={<LostPets />} />
        <Route path="successstories" element={<SuccessStories />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route
          path="successstoriesnarratives"
          element={<SuccessStoriesNarratives />}
        />
        <Route path="lostpetform" element={<LostPetForm />} />
        <Route path="UserProfile" element={<UserProfile />} />
        <Route path="adoptdataform" element={<AdoptForm/>}/>
      </Routes>
      {!isLoginPage && <Footer />}
    </>
  );
}

export default App;
