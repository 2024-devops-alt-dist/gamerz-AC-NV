function HeroSearch() {
    return (
        <>
        <div className="py-42 mt- px-1 md:px-8 text-left relative text-white font-bold text-2xl md:text-3xl overflow-auto bg-cover bg-center bg-no-repeat bg-[url('./assets/channelsheader.png')]">
    <img src='/logo.png' alt="GAMERZ" className="w-100"/>
    <div className="w-11/12 md:w-3/4 lg:max-w-3xl">
        <div className=" z-30 text-base text-black">
			<input type="text" placeholder="Chercher un salon" className="mt-2 shadow-md bg-white focus:outline-none rounded-2xl py-3 px-6 block w-full"/>
        </div>
    </div>
	
</div>
<div className="h-5 w-full bg-[#1EDCB3]"></div>


</>

    );
}

export default HeroSearch;
