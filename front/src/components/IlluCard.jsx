import { Fragment, useEffect } from "react";
import { PinAlt, Calendar, Dollar } from "iconoir-react";
import { useState } from "react";
import moment from "moment"
import { useNavigate } from "react-router";
import DatePicker from "./datePicker";
  
function DateButton({setOpen, open, dates}) {
    return (
      <div className="hover:cursor-pointer hover:brightness-90">
      <div
        className="ml-10 mt-4 w-[70%] h-[35px] bg-gray-100 shadow-xl drop-shadow rounded flex items-center gap-5"
        onClick={() => setOpen(!open)}
      >
        <Calendar width={25} height={20} color={"#3671A8"} className="ml-2" />
        {dates.startDate === null || dates.endDate === null ? <p className="text-sm text-gray-500">Pick a range</p>
        : <p className="text-sm text-gray-500">{moment(dates.startDate).format("DD/MM")} - {moment(dates.endDate).format("DD/MM")}</p>}
      </div>
    </div>
    )
}

function SearchCard({choice}) {
    const [inputs, setInputs] = useState({
      location: "",
      dates: { startDate: null, endDate: null, key: "selection" },
      budget: null,
    });
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
  
    useEffect(() => {
      if (choice) setInputs({...inputs, location: choice})
    }, [choice])
  
    return (
      <div className="absolute w-full lg:bottom-[-50px] bottom-[-150px] lg:h-[150px] h-[400px] sm:px-20">
        <div className="drop-shadow-xl shadow-xl rounded-3xl bg-white h-full relative flex justify-center p-5">
          <div className="h-full w-full grid lg:grid-cols-3 grid-cols-1">
            <div className="col-span-1">
              <div className="ml-5 flex items-center gap-3">
                <div className="w-[35px] h-[35px] bg-gray-300 rounded-full flex items-center justify-center">
                  <PinAlt width={20} height={20} />
                </div>
                <p className="text-lg">Location</p>
              </div>
              <div className="ml-5 mt-4">
                <input
                  type="text"
                  value={inputs.location}
                  onChange={(e) =>
                    setInputs({ ...inputs, location: e.target.value })
                  }
                  className="border-b-2 border-b-gray-200 py-1 rounded px-2 text-sm text-gray-500"
                />
              </div>
            </div>
            <div className="col-span-1 relative">
              <div className="hidden lg:flex lg:absolute h-[70%] w-[2px] bg-gray-300"></div>
              <div className="lg:ml-10 ml-5 flex items-center gap-3">
                <div className="w-[35px] h-[35px] bg-gray-300 rounded-full flex items-center justify-center">
                  <Calendar width={20} height={20} />
                </div>
                <p className="text-lg">Dates</p>
              </div>
              <DatePicker
                onChange={(e) => setInputs({ ...inputs, dates: e })}
                range={inputs.dates}
                open={open}
                setOpen={(e) => setOpen(e)}
              />
              <DateButton open={open} setOpen={(e) => setOpen(e)} dates={inputs.dates}/>
              <div className="hidden lg:flex lg:absolute h-[70%] w-[2px] bg-gray-300 right-0 top-0"></div>
            </div>
            <div className="col-span-1">
              <div className="lg:ml-10 ml-5 flex items-center gap-3">
                <div className="w-[35px] h-[35px] bg-gray-300 rounded-full flex items-center justify-center">
                  <Dollar width={20} height={20} />
                </div>
                <p className="text-lg">Budget</p>
              </div>
              <div className="ml-10 mt-4">
                <input
                  type="number"
                  value={inputs.budget}
                  onChange={(e) =>
                    setInputs({ ...inputs, budget: e.target.value })
                  }
                  className="border-b-2 border-b-gray-200 py-1 rounded px-2 text-sm text-gray-500"
                />
              </div>
            </div>
          </div>
          <div className="px-16 py-2 w-fit bg-[#3671A8] absolute bottom-[-25px] rounded hover:cursor-pointer hover:brightness-110 hover:scale-105 transition duration-500"
            onClick={() => navigate('/search', {state: {inputs}})}>
            <p className="text-white text-lg">Search</p>
          </div>
        </div>
      </div>
    );
  }

export default function IlluCard({choice}) {
    return (
      <Fragment>
        <img src="/card.png" className="w-full h-[500px]" />
        <div className="absolute w-full h-full top-0">
          <div className="flex flex-col items-center w-full h-full p-10 overflow-hidden relative">
            <div className="relative z-40 flex flex-col w-full items-center">
              <p className="text-5xl text-[#2D2D2D] font-bold">
                Explore Beautiful Places
              </p>
              <p className="text-xl text-gray-500 font-bold mt-3">
                All you need in one click
              </p>
            </div>
            <img
              className="overflow-hidden absolute right-[-250px] top-[-100px] max-w-[800px] w-[100%]"
              src="/plane2.webp"
            />
            <img
              className="overflow-hidden absolute left-[-50px] bottom-[150px] max-w-[400px]"
              src="/cloud.png"
            />
          </div>
          <SearchCard choice={choice}/>
        </div>
      </Fragment>
    );
  }