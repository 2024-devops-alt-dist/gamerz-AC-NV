import { Link } from "react-router";
import useAuth from "../context/useAuth.tsx";
import { useNavigate } from "react-router-dom";





function Connexion() {
	console.log("hello from Connexion");
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const username = formData.get("username") as string | null;
		const password = formData.get("password") as string | null;

		if (!username || !password) {
			alert("Veuillez remplir tous les champs.");
			return;
		}
		console.log("Données envoyées :", { username, password });

		try {
			const response = await fetch("http://localhost:5006/auth", {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
			  },
			  credentials: "include",
			  body: JSON.stringify({ username, password }),
			});
	  
			if (!response.ok) {
			  throw new Error("Connexion échouée");
			}
			const success = await login(); // Appelle la fonction login dans le contexte
			const result = await response.json();
			console.log("Réponse serveur :", result);
			if (success) {
			  navigate("/"); // redirection à déterminer
			} else {
			  alert("co ok / id ok !");
			}
	  
		  } catch (error) {
			console.error("Erreur lors de la connexion :", error);
			alert("Erreur de connexion");
		  }
		};


	
	return (
		<>
			<div className="w-full h-screen flex items-center justify-center">
				<form className="w-full md:w-1/3 rounded-lg bg-white/10" onSubmit={handleSubmit}>
					<h1 className="text-4xl text-center text-gray-200 mt-10 mb-10">Connexion</h1>
					<div className="px-12 pb-10">
						<div className="w-full mb-2">
							<div className="flex items-center">
								<input
									type="text"
									name="username"
									placeholder="username"
									className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none bg-white"
								/>
							</div>
							<div className="flex items-center mt-10">
								<input
									type="password"
									name="password"
									placeholder="Mot de passe"
									className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none bg-white"
								/>
							</div>
						</div>
						
						<button
							type="submit"
							className="w-full py-2 mt-8 rounded bg-[#1EDCB3] hover:bg-[#00E7B5] text-gray-100 focus:outline-none">
							Connexion
						</button>
						<Link to="/inscription"><a href="" className="text-center text-[#1EDCB3] mt-4 block">
							Vous n'avez pas de compte ? Inscrivez-vous ici</a></Link>
					</div>
				</form>
			</div>
		</>
	);
}



export default Connexion;