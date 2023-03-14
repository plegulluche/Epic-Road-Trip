import React from 'react';

export default function NotFound() {
    return (
        <div className='flex flex-col justify-center items-center h-[100vh] bg-[#F0F4FF] z-0 font-sora relative overflow-hidden'>
            <h1 className='text-[110px] z-20 font-bold text-[#717171]'>404</h1>
            <h2 className='text-4xl z-20 text-[#717171]'>Not Found</h2>
            <img className='absolute top-[15%] left-[-10%] w-[40%] z-10 hover:scale-110 transition duration-500' src='/cloud2.png' alt="clouds" />
            <img className='absolute top-[70%] left-[50%] w-[25%] z-10 hover:scale-110 transition duration-500' src='/cloud2.png' alt="clouds" />
            <img className='absolute top-[25%] left-[70%] w-[40%] z-10 hover:scale-110 transition duration-500' src='/cloud2.png' alt="clouds" />
        </div >
    );
}