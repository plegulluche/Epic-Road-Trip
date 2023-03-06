import { Fragment } from "react";
import { Link } from "react-router-dom";
import { PinAlt, Calendar, Dollar, Pin } from "iconoir-react";

function SearchCard() {
  return (
    <div className="absolute w-full bottom-[-50px] h-[140px] px-20">
        <div className="drop-shadow-xl shadow-xl rounded-3xl bg-white h-full relative flex justify-center p-5">
            <div className="h-full w-full grid grid-cols-3">
              <div className="col-span-1">
                <div className="ml-5 flex items-center gap-3">
                  <div className="w-[35px] h-[35px] bg-gray-300 rounded-full flex items-center justify-center">
                    <PinAlt width={20} height={20} /> 
                  </div>
                  <p className="text-lg">Location</p>
                </div>
              </div>
              <div className="col-span-1 relative">
                  <div className="absolute h-[70%] w-[2px] bg-gray-300"></div>
                  <div className="ml-10 flex items-center gap-3">
                    <div className="w-[35px] h-[35px] bg-gray-300 rounded-full flex items-center justify-center">
                      <Calendar width={20} height={20} /> 
                    </div>
                    <p className="text-lg">Dates</p>
                  </div>
                  <div className="absolute h-[70%] w-[2px] bg-gray-300 right-0 top-0"></div>
              </div>
              <div className="col-span-1">
              <div className="ml-10 flex items-center gap-3">
                  <div className="w-[35px] h-[35px] bg-gray-300 rounded-full flex items-center justify-center">
                    <Dollar width={20} height={20} /> 
                  </div>
                  <p className="text-lg">Budget</p>
                </div>
              </div>
            </div>
            <div className="px-16 py-2 w-fit bg-[#3671A8] absolute bottom-[-25px] rounded hover:cursor-pointer hover:brightness-110">
              <p className="text-white text-lg">Search</p>
            </div>
        </div>
    </div>
  )
}

function IlluCard() {
  return (
    <Fragment>
      <img src='/card.png' className="w-full h-[500px]" />
      <div className="absolute w-full h-full top-0">
        <div className="flex flex-col items-center w-full h-full p-10 overflow-hidden relative">
          <p className="text-5xl text-[#2D2D2D] font-bold">Explore Beautiful Places</p>
          <p className="text-xl text-gray-500 font-bold mt-3">All you need in one click</p>
          <img className="overflow-hidden absolute right-[-250px] top-[-100px] max-w-[800px]" src='/plane2.webp' />
          <img className="overflow-hidden absolute left-[-50px] bottom-[150px] max-w-[400px]" src='/cloud.png' />
        </div>
        <SearchCard />
      </div>
    </Fragment>
  )
}

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <div className="mt-10 w-full h-full relative">
        <IlluCard />
      </div>
    </div>
  );
}
