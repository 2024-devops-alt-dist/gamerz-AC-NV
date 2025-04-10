import { createContext, useState, ReactNode, useContext, useEffect } from 'react';

// type user
type User = {
  id: string;
  username: string;
  email: string;
  motivation: string;
  status: string;
  isAuthenticated: boolean;
};

const AuthContext = createContext<{ user: User | null; setUser: React.Dispatch<React.SetStateAction<User | null>> } | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  console.log("STP REPONDS MOI 😭")

  //     try {
  //       const res = await fetch('http://localhost:5006/me', {
  //         credentials: 'include',
  //       });

  //       if (res.ok) {
  //         const data = await res.json();
  //         if (data && data.username) {
  //           setUser({
  //             username: data.username,
  //             id: data.id || '',
  //             email: data.email || '',
  //             motivation: data.motivation || '',
  //             status: data.status || '',
  //             isAuthenticated: true,
  //           });

  //           console.log('Utilisateur authentifié:', data.username);
  //         console.log("setUser dans AuthContext:", setUser);
  //         } else {
  //           console.log('DONNEES MANQUANTES DANS LA REPONSE DU SERVEUR:');

  //           setUser(null); // Réinitialiser l'utilisateur si les données sont manquantes
  //         }
  //       }
  //     } catch (err) {
  //       console.error('Utilisateur non authentifié:', err);
  //     }
  //   };

  //   checkAuth();
  // }, []); // Cette partie fait le premier fetch lorsque le composant est monté

  // Ce useEffect se déclenche chaque fois que l'utilisateur change
  useEffect(() => {
    const checkAuth = async () => {
      console.log("ALLEZZ CHECK AUTH");
  
      try {
        const res = await fetch('http://localhost:5006/me', {
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
  
            console.log(' THE user :', data.username);
          } else {
            console.warn(' DONNEES MANQUANTES DANS LA REPONSE DU SERVEUR');
            setUser(null);
          }
        } else {
          console.warn('neine Reponse pas OK');
        }
      } catch (err) {
        console.error(' Erreur fetch /me:', err);
      }
    };
  
    checkAuth();
  }, []);
  
  
  //UTILE ? PAS UTILE ?
  useEffect(() => {
    if (user) {
      console.log('Utilisateur mis à jour dans AuthContext:', user.username);
    }
  }, [user]); // Ce useEffect s execute chaque fois que user change

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

export default AuthContext;
