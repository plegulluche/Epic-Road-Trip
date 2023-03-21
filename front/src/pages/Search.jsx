import { Bus, Clutery, CoffeeCup, List, Map, Skateboarding } from 'iconoir-react';
import React, { useEffect } from 'react'
import { useLocation } from 'react-router';
import { useState } from 'react';
import { HomeAltSlimHoriz } from 'iconoir-react';
import { Carousel } from '../components/carousel';
import GoogleMap from '../components/googleMap';
import TripRecap from '../components/tripRecap';
import { motion } from "framer-motion";

function ListDisplay() {
    return (
        <div className='w-full h-fit'>
            <div className='mb-16'>
                <div className='flex gap-3 items-center mb-5'>
                    <Skateboarding height={42} width={42} />
                    <p className='text-2xl'>Events and Activites</p>
                </div>
                <Carousel />
            </div>
            <div className='mb-16'>
                <div className='flex gap-3 items-center mb-5'>
                    <HomeAltSlimHoriz height={40} width={40} />
                    <p className='text-2xl'>Accomodations</p>
                </div>
                <Carousel />
            </div>
            <div className='mb-16'>
                <div className='flex gap-3 items-center mb-5'>
                    <Bus height={38} width={38} />
                    <p className='text-2xl'>Transports</p>
                </div>
                <Carousel />
            </div>
            <div className='mb-16'>
                <div className='flex gap-3 items-center mb-5'>
                    <Clutery height={40} width={40} />
                    <p className='text-2xl'>Restaurants</p>
                </div>
                <Carousel />
            </div>
            <div className='mb-16'>
                <div className='flex gap-3 items-center mb-5'>
                    <CoffeeCup height={40} width={40} />
                    <p className='text-2xl'>Bars</p>
                </div>
                <Carousel />
            </div>
        </div>
    )
}

export default function Search() {
    const location = useLocation()
    const [trip, setTrip] = useState(null)
    const [selected, setSelected] = useState("list")

    useEffect(() => {
        if (location.state) setTrip(location.state.inputs)
    }, [location])

    if (!trip) return <div>Loading...</div>
    return (
        <motion.div className="w-full min-h-screen xl:px-40 lg:px-28 md:px-20 px-10 mt-5 relative overflow-hidden"
            initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.4 }}
        >
            <img src="/plane2.webp" className='absolute opacity-50 right-0 top-[-250px] max-w-[700px] z-10'/>
            <div className='flex gap-10 h-[260px] relative z-50'>
                <TripRecap trip={trip} />
                <div className='flex flex-col justify-between'>
                    <div>
                        <p className='text-5xl text-[#3671A8]'>{trip.location}</p>
                        <p className='text-xl text-[#B7B7B7] mt-3'>What a nice choice !</p>
                    </div>
                    <div className='flex gap-5'>
                        <div className={`w-32 h-[70px] rounded-lg ${selected === 'list' ? "bg-[#969696] border-2 border-[#969696] text-white" : "border-2 border-gray-500"} p-3 hover:bg-[#969696] hover:border-[#969696] hover:cursor-pointer hover:text-white`}
                         onClick={() => setSelected("list")}>
                            <div className='flex items-center justify-between'>
                                <p className='text-sm'>Liste</p>
                                <List className='hover:text-white'/>
                            </div>
                        </div>
                        <div className={`w-32 h-[70px] rounded-lg ${selected === 'map' ? "bg-[#969696] border-2 border-[#969696] text-white" : "border-2 border-gray-500"} p-3 hover:bg-[#969696] hover:border-[#969696] hover:cursor-pointer hover:text-white`}
                         onClick={() => setSelected("map")}>
                            <div className='flex items-center justify-between'>
                                <p className='text-sm'>Map</p>
                                <Map className='hover:text-white'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-16'>
                {selected === 'map' && <GoogleMap lng={116.37} lat={-8.75}/>}
                {selected === 'list' && <ListDisplay />}
            </div>
        </motion.div>
    )
}
