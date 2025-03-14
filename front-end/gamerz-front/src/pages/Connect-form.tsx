//import Hero from "../components/Hero.tsx";


function Connexion() {
	console.log("hello from Connexion");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
        const username = formData.get("username");
        const password = formData.get("password");
		console.log("Données envoyées :", { username, password });


		const response = await fetch('http://localhost:5006/auth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({ username, password }),
		});
		
        if (!response.ok) {
            throw new Error("Connexion échouée");
        }
		console.log(response);
	}


	
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
					</div>
				</form>
			</div>
		</>
	);
}



export default Connexion;