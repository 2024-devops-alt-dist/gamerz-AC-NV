import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footers";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage.tsx";
import Connexion from "./pages/Connect-form.tsx";
import Inscription from "./pages/Inscription.tsx";
import ChannelsList from "./pages/ChannelsList.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Channel from "./pages/Channel.tsx";








function App() {
  return (
  <>

    <Header/>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/channelslist" element={<ChannelsList />} />
        <Route path="/login" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/channel" element={<Channel />} />
      </Routes>
    <Footer title="Gamerz"/>
    </>
  );
}



export default App;