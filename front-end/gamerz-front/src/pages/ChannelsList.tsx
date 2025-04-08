import { Link } from "react-router";
import ChannelCard from "../components/ChannelCard.tsx";
import HeroSearch from "../components/HeroSearch.tsx";
import { useState, useEffect } from "react";

interface Channel {
  channelName: string;
    connectedUsers: number;
    url: string;

}

function ChannelsList() {
    const [channel, setChannel] = useState<Channel[]>([]);

    useEffect(() => {
        fetchChannels();
    }, []);

    const fetchChannels = async () => {
        console.log("fetchChannels");

        // On récupère les données
        const response = await fetch("http://localhost:5006/channels");

        // On transforme les données en JSON
        const data = await response.json();

        // On met les données dans le state
        setChannel(data);
    };

  return (
    <>
    <HeroSearch/>

            <div className='p-20 '>
                <ul className='grid grid-cols-1 gap-8 px-1 md:grid-cols-2 lg:grid-cols-3 md:p-2 xl:p-4'>
                    <li className='relative flex justify-center w-full gap-4 rounded-[20px] border-solide border-1 border-[#1EDCB3] hover:transition'>
                       
                      
                        <div className='flex flex-col px-2 py-3'>
                            <div className='w-full pt-4'>
                                <Link to={'/'} className='font-semibold md:text-4xl  text-[#1EDCB3]'>
                                    <h1>LES SALONS</h1>
                                </Link>
                                <p className='text-sm text-white text-center'>
                                  216 joueurs au total
                                </p>
                            </div>
                          
                        </div>
                    </li>

                    {channel.map((channel: Channel) => {
  return (
    <ChannelCard channelName={channel.channelName} connectedUsers={channel.connectedUsers} url={channel.url} />
  );
})}
                    
</ul>
            </div>
    </>
  );
}



export default ChannelsList;