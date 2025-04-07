//import Hero from "../components/Hero.tsx";

function Inscription() {
    console.log("hello from Inscription");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        const birthdate = formData.get("birthdate") as string;
        const avatar = formData.get("avatar") as string;
		const motivation = formData.get("motivation") as string;
        const role = "user";
        const status = 'pending';

        console.log("Données envoyées :", { email, username, password, birthdate, avatar, motivation, role, status });

        const response = await fetch('http://localhost:5006/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username, password, birthdate, avatar, motivation, role, status }),
        });

        if (!response.ok) {
            throw new Error("Inscription échouée");
        }
        console.log(await response.json());
    };

	return (
		<>
			<div className="w-full h-screen flex items-center justify-center">
				<form className="w-full md:w-1/3 rounded-lg bg-white/10"
					onSubmit={handleSubmit}>
					<h1 className="text-4xl text-center text-gray-200 mt-10 mb-10">Inscription</h1>
					<div className="px-12 pb-10">
						<div className="w-full mb-2">
							<div className="flex items-center">
								<input
									type="text"
									name="email"
									placeholder="Adresse email"
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
							<div className="flex items-center mt-10">
								<input
									type="text"
									name="username"
									placeholder="Pseudo"
									className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none bg-white"
								/>
							</div>
							<div className="flex items-center mt-10">
								<input
									type="text"
									name="avatar"
									placeholder="Avatar (URL)"
									className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none bg-white"
								/>
							</div>
							<div className="flex items-center mt-10">
								<input
									type="date"
									name="birthdate"
									className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none bg-white"
								/>
							</div>
							
							<div className="flex items-center mt-10">
								<textarea
								name="motivation"
								
									placeholder="Vos motivations en quelques mots..."
									className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none bg-white"
								/>
							</div>
						</div>
						<div className="flex items-center mt-10">
    <input
        type="checkbox"
        id="terms"
        className="mr-2"
    />
    <label htmlFor="terms" className="text-white">
        Je suis majeur et j'accepte les conditions d'utilisation
    </label>
</div>

						
						<button
							type="submit"
							className="w-full py-2 mt-8 rounded bg-[#1EDCB3] hover:bg-[#00E7B5] text-gray-100 focus:outline-none">
							Postuler
						</button>
					</div>
				</form>
			</div>
		</>
	);
}



export default Inscription;