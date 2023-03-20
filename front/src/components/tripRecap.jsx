import moment from 'moment';
import { Airplane, Edit } from 'iconoir-react';

export default function TripRecap({trip}) {
    return (
        <div className='w-[240px] bg-[#F1F1F1] p-5 rounded-lg'>
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