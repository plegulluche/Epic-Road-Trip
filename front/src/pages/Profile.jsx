import React from 'react'

export default function Profile() {
    return (
        <div className='min-h-screen flex flex-col relative'>
            <div className='flex-1 bg-gray-200'>
            </div>
            <div className='flex-1 items-center left-[50%] justify-center'>
                <div className='w-[70%] h-[320px] absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center'>
                    <img src="/cloud2.png" className='absolute max-h-[200px] top-[-100px] z-30'></img>
                    <div className='w-full h-full bg-white shadow-xl drop-shadow-xl rounded p-20 flex justify-between'>
                        <div>
                            toto
                        </div>
                        <div className='flex flex-col items-center justify-center mr-10 gap-5'>
                            <p className='font-bold text-7xl'>23</p>
                            <p className='text-2xl text-[#545454]'>Trips saved</p>
                        </div>
                    </div>
                </div>
            </div>             
        </div>
    )
}
