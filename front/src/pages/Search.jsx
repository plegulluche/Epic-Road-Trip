import { Airplane, Edit, List, Map } from 'iconoir-react';
import React, { useEffect } from 'react'
import { useLocation } from 'react-router';
import { useState } from 'react';
import moment from 'moment';
import GoogleMapReact from 'google-map-react'

function Recap({trip}) {
    return (
        <div className='w-[230px] bg-[#F1F1F1] p-5 rounded-lg'>
            <div className='flex justify-between items-center'>
                <div className='w-[22px]' />
                <div className='w-10 h-10 bg-white rounded-full flex items-center justify-center'>
                    <Airplane />
                </div>
                <Edit className='hover:cursor-pointer hover:scale-105' width={22} color={'#A8A8A8'}/>
            </div>
            <div className='mt-10 flex flex-col gap-3'>
                <div className='grid grid-cols-5'>
                    <p className='col-span-2 text-[#8C8C8C]'>From</p>
                    <p className='col-span-3'>{moment(trip.dates.startDate).format("DD/MM")}</p>
                </div>
                <div className='grid grid-cols-5'>
                    <p className='col-span-2 text-[#8C8C8C]'>To</p>
                    <p className='col-span-3'>{moment(trip.dates.endDate).format("DD/MM")}</p>
                </div>
                <div className='grid grid-cols-5 mb-5 mt-3'>
                    <p className='col-span-2 text-[#8C8C8C]'>With</p>
                    <p className='col-span-3'>{trip.budget} €</p>
                </div>
            </div>
        </div>
    )
}

function MapDisplay({lng, lat}) {
    const AnyReactComponent = ({ text }) => <img style={{position: 'absolute', transform: 'translate(-50%, -100%)'}} width={30} height={30} src="/pin.png"></img>;

    const defaultProps = {
        center: {
          lat: lat,
          lng: lng
        },
        zoom: 6
      };
    return (
        <div className='h-[500px] w-[100%] mb-10'>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyA3mKtes7tYJIRy65AOV6aQs5YjgsQowz4" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <AnyReactComponent
                lat={lat}
                lng={lng}
                />
            </GoogleMapReact>
        </div>  
    )
}

function ListDisplay() {
    return (
        <div>list</div>
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
        <div className="w-full min-h-screen xl:px-40 lg:px-28 md:px-20 px-10 mt-5 relative overflow-hidden">
            <img src="/plane2.webp" className='absolute opacity-50 right-[-150px] top-[-250px] max-w-[700px] z-10'/>
            <div className='flex gap-10 h-[260px] relative z-50'>
                <Recap trip={trip} />
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
                {selected === 'map' && <MapDisplay lng={116.37} lat={-8.75}/>}
                {selected === 'list' && <ListDisplay />}
            </div>
        </div>
    )
}
