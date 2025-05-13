
import { createContext, useState, ReactNode, useEffect } from "react";

type User = {
  id: string;
  username: string;
  email: string;
  motivation: string;
  status: string;
  isAuthenticated: boolean;
};

const AuthContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
} | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      console.log("ALLEZZ CHECK AUTH");

      try {
        const res = await fetch('https://gamerz-ac-nv-2.onrender.com/me', {
          credentials: 'include',
        });

        console.log("📡 Réponse reçue:", res);

        if (res.ok) {
          const data = await res.json();
          console.log("🧾 Données reçues:", data);

          if (data && data.username) {
            setUser({
              username: data.username,
              id: data.id || '',
              email: data.email || '',
              motivation: data.motivation || '',
              status: data.status || '',
              isAuthenticated: true,
            });

            console.log('THE user:', data.username);
          } else {
            console.warn('DONNEES MANQUANTES DANS LA REPONSE DU SERVEUR');
            setUser(null);
          }
        } else {
          console.warn('Réponse non OK. Utilisateur non authentifié.');
          setUser(null); // Si la réponse n'est pas OK, déconnecter l'utilisateur
        }
      } catch (err) {
        console.error('Erreur fetch /me:', err);
        setUser(null); // Gérer les erreurs en cas de problème avec le fetch
      }
    };

    checkAuth();
  }, []); // Exécuter seulement lors du premier rendu

  useEffect(() => {
    if (user) {
      console.log('Utilisateur mis à jour dans AuthContext:', user.username);
    }
  }, [user]); // Ce useEffect s'exécute chaque fois que user change

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
