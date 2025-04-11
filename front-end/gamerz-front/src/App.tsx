import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footers";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import Connexion from "./pages/Connect-form.tsx";
import Inscription from "./pages/Inscription.tsx";
import ChannelsList from "./pages/ChannelsList.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Channel from "./pages/Channel.tsx";
//import { useEffect, useState } from "react";
//import Auth from "./Auth.tsx";







function App() {
  // interface User {
  //   username: string;
  //   // Add other properties if needed
  // }

  // const [user, setUser] = useState<User | null>(null);  
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const res = await fetch('http://localhost:5006/me', {
  //         credentials: 'include',
  //       });
  //       if (res.ok) {
  //         const data = await res.json();
  //         setUser(data);
  //         console.log('user dans app.tsx:', data);
  //       }
  //     } catch (err) {
  //       console.error('Utilisateur non authentifié:', err);
  //     }
  //   };

  //   checkAuth();
  // }, []);

  // console.log('user dans app.tsx:', user);  

  return (
  <>

  <Header />
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/channelslist" element={<ChannelsList />} />
        <Route path="/login" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/channel/:id" element={<Channel />} />

      </Routes>
    <Footer title="Gamerz"/>
    </>
  );
}



export default App;