import Hero from "../components/Hero.tsx";


function Inscription() {
	return (
		<>
			<div className="w-full h-screen flex items-center justify-center">
				<form className="w-full md:w-1/3 rounded-lg bg-white/10">
					<h1 className="text-4xl text-center text-gray-200 mt-10 mb-10">Inscription</h1>
					<div className="px-12 pb-10">
						<div className="w-full mb-2">
							<div className="flex items-center">
								<input
									type="text"
									placeholder="Adresse email"
									className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none bg-white"
								/>
							</div>
							<div className="flex items-center mt-10">
								<input
									type="password"
									placeholder="Mot de passe"
									className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none bg-white"
								/>
							</div>
							<div className="flex items-center mt-10">
								<input
									type="text"
									placeholder="Pseudo"
									className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none bg-white"
								/>
							</div>
							<div className="flex items-center mt-10">
								<textarea
								
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