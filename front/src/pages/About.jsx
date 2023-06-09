import React from 'react'
import {Helmet} from "react-helmet";
import { motion } from "framer-motion";

export default function AboutUs({}) {
  return (
    <motion.div className="flex justify-center xl:px-40 lg:px-28 md:px-20 px-10 h-screen"
      initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.4 }}
      >
      <Helmet>
          <meta charSet="utf-8" />
          <title>Startek Agency</title>
          <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <motion.div className="flex flex-col w-[1400px] h-fit gap-y-8 mt-16"
       initial={{ opacity: 0, y: 50 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5 }}>
        <div className="h-[150px] md:h-[150px] w-full bg-white flex flex-row justify-between">
          <div className="w-2/3 flex justify-start items-center">
            <h1 className="font-sora text-3xl md:text-5xl underline decoration-[#3671A8]">
              We are StarTek Agency
            </h1>
          </div>
          <div className="w-1/3 flex flex-row justify-end">
            <div className="bg-[#3671A8] w-46 md:w-64 h-full border-2 rounded-[30px] flex flex-col justify-center items-center">
              <h1 className="font-sora text-xl md:text-5xl text-white">134</h1>
              <h1 className="font-sora text-md md:text-2xl text-[#E1E1E1]">Countries</h1>
            </div>
          </div>
        </div>

        <div className="h-[150px] md:h-[150px] w-full bg-white flex flex-row justify-between">
          <div className="w-1/3 flex flex-row justify-start">
            <div className="bg-[#3671A8] w-46 md:w-64 h-full border-2 rounded-[30px] flex flex-col justify-center items-center">
              <h1 className="font-sora text-xl md:text-5xl text-white">6453</h1>
              <h1 className="font-sora text-md md:text-2xl text-[#E1E1E1]">Trips planned</h1>
            </div>
          </div>
          <div className="w-2/3 flex ml-4 md:ml-[200px] items-center justify-end">
            <h1 className="font-sora text-3xl md:text-5xl">
              We <a className="text-[#3671A8]">plan</a> and <a className="text-[#3671A8]">build</a> your trip
            </h1>
          </div>
        </div>

        <div className="h-[150px] md:h-[150px] w-full bg-white flex flex-row justify-between">
          <div className="w-2/3 flex justify-start items-center">
            <h1 className="font-sora text-3xl md:text-5xl">
              Organize <a className="text-[#3671A8]">everything</a> in advance
            </h1>
          </div>
          <div className="w-1/3 flex flex-row justify-end">
            <div className="bg-[#3671A8] w-46 md:w-64 h-full border-2 rounded-[30px] flex flex-col justify-center items-center">
              <h1 className="font-sora text-xl md:text-5xl text-white">15k+</h1>
              <h1 className="font-sora text-md md:text-2xl text-[#E1E1E1]">Suggestions</h1>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
