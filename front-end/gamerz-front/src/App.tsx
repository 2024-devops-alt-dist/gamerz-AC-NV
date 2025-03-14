import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footers";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage.tsx";
import Connexion from "./pages/Connect-form.tsx";








function App() {
  return (
  <>

    <Header title="Gamerz"/>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Connexion />} />
      </Routes>
    <Footer title="Gamerz"/>
    </>
  );
}



export default App;