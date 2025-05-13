
import { useContext } from "react";
import AuthContext from "../store/AuthContext"; // Assure-toi que le chemin est correct

export const useAuth = () => {
  const context = useContext(AuthContext);

  // S'assurer que le contexte est bien présent dans l'arbre des composants
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }

  return context;
};
