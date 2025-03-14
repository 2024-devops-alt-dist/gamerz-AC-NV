function Hero({}: {}) {
    return (
        <>
        <section className="text-gray-600 body-font bg-cover bg-center bg-no-repeat bg-[url('./assets/landing.png')]">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <div className="text-center lg:w-2/3 w-full">
        <img src='src/assets/logo.png' alt="GAMERZ" className="mt-100"/>
          <h1 className="title-font mt-5 sm:text-4xl text-3xl mb-4 font-medium text-white">La plus grande communauté try-hard</h1>
          <div className="flex justify-center">
            <button className="inline-flex text-[30px] text-white bg-gradient-to-b rounded-full from-slate-500 border-2 border-[#1EDCB3] to-slate-900 border-0 pt-3 py-2 px-10 focus:outline-none shadow-cyan-500/100"><h1>Nous rejoindre</h1></button>
          </div>
        </div>
      </div>
    </section>
    
    <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
	<div className="flex flex-wrap -m-4">
	  <div className="lg:w-1/4 sm:w-1/2 p-4">
		<div className="flex relative">
		  <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-100 hover:opacity-100">
			<h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">THE SUBTITLE</h2>
			<h1 className="title-font text-lg font-medium text-gray-900 mb-3">Shooting Stars</h1>
			<p className="leading-relaxed">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
		  </div>
		</div>
	  </div>
	  <div className="lg:w-1/4 sm:w-1/2 p-4">
		<div className="flex relative">
		  <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-100 hover:opacity-100">
			<h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">THE SUBTITLE</h2>
			<h1 className="title-font text-lg font-medium text-gray-900 mb-3">The Catalyzer</h1>
			<p className="leading-relaxed">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
		  </div>
		</div>
	  </div>
	  <div className="lg:w-1/4 sm:w-1/2 p-4">
		<div className="flex relative">
		  <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-100 hover:opacity-100">
			<h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">THE SUBTITLE</h2>
			<h1 className="title-font text-lg font-medium text-gray-900 mb-3">The 400 Blows</h1>
			<p className="leading-relaxed">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
		  </div>
		</div>
	  </div>

      <div className="lg:w-1/4 sm:w-1/2 p-4">
		<div className="flex relative">
		  <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-100 hover:opacity-100">
			<h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">THE SUBTITLE</h2>
			<h1 className="title-font text-lg font-medium text-gray-900 mb-3">The 400 Blows</h1>
			<p className="leading-relaxed">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
		  </div>
		</div>
	  </div>
	
	
	</div>
  </div>
</section>


     </>
   
    );
}

export default Hero;
