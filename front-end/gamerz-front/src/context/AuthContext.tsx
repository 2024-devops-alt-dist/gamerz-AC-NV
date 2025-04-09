import { createContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // useeffect = vérifier l'auth si l'app redemarre
  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("http://localhost:5006/check-auth", {
        method: "GET",
        credentials: "include", 
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (): Promise<boolean> => {
    const response = await fetch("http://localhost:5006/check-auth", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      setIsAuthenticated(true);
      return true;
    } else {
      setIsAuthenticated(false);
      return false;
    }
  };

  const logout = () => {
    //  requete pour supprimer le JWT serveur
    fetch("http://localhost:5006/logout", {
      method: "POST",
      credentials: "include", // Pour envoyer le cookie HttpOnly
    })
      .then(() => {
        setIsAuthenticated(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la déconnexion :", error);
      });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
