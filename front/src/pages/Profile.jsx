import { Edit, Pin, PrecisionTool, VerifiedUser } from 'iconoir-react'
import React from 'react'

function Card1() {
    return (
        <div className='bg-white shadow-xl drop-shadow-xl rounded w-[400px] h-[230px]'>
            <div className='p-5 flex flex-col justify-center gap-5'>
                <div className='flex items-center gap-5'>
                    <PrecisionTool />
                    <p className='text-[#959595] mt-1'>Paris, France</p>
                </div>
                <div className='flex items-center gap-5'>
                    <VerifiedUser />
                    <p className='text-[#959595] mt-1'>Member since 12/03/2023</p>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-5'>
                        <Pin />
                        <p className='text-[#959595] mt-1'>Favorite Destination: <span className='text-black'>Singapour</span></p>
                    </div>
                    <Edit width={20} color={"gray"} className="hover:scale-105 hover:cursor-pointer"/>
                </div>
            </div>
        </div> 
    )
}

function Card2() {
    return (
        <div className='bg-white shadow-xl p-5 drop-shadow-xl rounded w-[400px] h-[230px] flex flex-col items-center'>
            <p className='text-2xl text-gray-800'>Trips saved</p>
            <div className="mt-10 px-16 py-2 w-fit bg-[#3671A8] rounded hover:cursor-pointer hover:brightness-110 hover:scale-105">
                <p className="text-white text-lg">See your trips</p>
            </div>
        </div>
    )
}

export default function Profile() {
    return (
        <div className='min-h-screen flex flex-col bg-[#F9F9F9]'>
            <div className='flex h-[300px] w-full bg-[#D9D9D9] relative'>
                <div className='xl:w-[65%] lg:w-[80%] w-[90%] h-fit absolute z-20 lg:bottom-[-220px] bottom-[-280px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center'>
                    <img src="/cloud2.png" className='absolute lg:max-h-[180px] max-h-[100px] lg:top-[-100px] top-[-50px] z-30'></img>
                    <div className='w-full h-full bg-white shadow-xl drop-shadow-xl rounded lg:p-10 p-5 flex lg:flex-row flex-col items-center justify-between gap-5 lg:gap-0'>
                        <div className='flex gap-5 items-center'>
                            <img src="./singapour.jpg" className='h-36 w-36 rounded-full' />
                            <p className='font-bold text-3xl self-end mb-3'>User996</p>
                        </div>
                        <div className='flex flex-col items-center justify-center lg:mr-10 gap-5'>
                            <p className='font-bold text-7xl'>23</p>
                            <p className='text-2xl text-[#545454]'>Trips saved</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-fit flex items-center justify-center'>
                <div className='xl:w-[65%] lg:w-[80%] w-[90%] pb-10 md:flex-row flex-col mt-[140px] flex items-center lg:gap-0 gap-10 justify-between'>
                    <Card1 />
                    <Card2 />
                </div>
            </div>             
        </div>
    )
}
