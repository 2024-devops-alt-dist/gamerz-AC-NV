import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext  from "../store/AuthContext.tsx"; 


function Header() {
  //recup les données de l'utilisateur
const authContext = useContext(AuthContext); 

 if (!authContext) {
   throw new Error("AuthContext is not provided");
 }

const user = authContext.user;
const username = user ? user.username : null;
console.log("user dans header", username) // recup le username ou null si non connecté

    return (
      <header className="text-gray-600 body-font bg-black">
        <div className="mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link to="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <img src="src/assets/logo.png" alt="GAMERZ" className="w-40" />
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 hover:text-gray-900">À propos</a>
          </nav>
          <p className="text-white mr-5">ton nom :{username}</p>
          {username ? (
            <span className="text-white mr-5">Bonjour, {username}!</span>
          ) : (
            <Link to="/login">
              <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                Connexion
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </Link>
          )}
          <Link to="/dashboard">
            <button className="inline-flex items-center bg-[#1EDCB3] border-0 py-1 px-3 ml-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
              Admin
            </button>
          </Link>
        </div>
      </header>
    );
  }

export default Header;