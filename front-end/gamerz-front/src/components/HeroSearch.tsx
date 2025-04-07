import { Link } from "react-router-dom";

function Hero({}: {}) {
    return (
        <>
        <div  style={{
        background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1684487747385-442d674962f2) no-repeat center",
        backgroundSize: "cover",
      }}
    className="py-52 px-1 md:px-8 text-center relative text-white font-bold text-2xl md:text-3xl overflow-auto">
    <h1 className="pb-4">Search for product</h1>
    <div className="w-11/12 md:w-3/4 lg:max-w-3xl m-auto">
        <div className="relative z-30 text-base text-black"><input type="text" value="" placeholder="Keyword" class="mt-2 shadow-md focus:outline-none rounded-2xl py-3 px-6 block w-full">
            <div
                className="text-left absolute top-10 rounded-t-none rounded-b-2xl shadow bg-white divide-y w-full max-h-40 overflow-auto">
            </div>
        </div>
    </div>
</div>


     </>
   
    );
}

export default Hero;
