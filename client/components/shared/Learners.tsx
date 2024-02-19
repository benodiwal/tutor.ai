import React from 'react'
import { ChevronDown } from 'lucide-react'
import Profile from './Profile'
import { useAuth } from '@/context/authContext'

const Learners = () => {
  return (
    <div className='px-[4px] py-[2px] flex items-center rounded-[19px] gap-x-[12px] bg-[#CFCFCF]'>
        <div className='flex items-center relative'>
            <Profile extended='bg-green-800 bg-[#177E4C] w-[25px] h-[25px]' image={""} />
            <Profile extended='z-100 absolute left-[12px] bg-[#4B49A6] w-[25px] h-[25px]' image={""} />
        </div>
        <ChevronDown width={15} height={15} color='white'/>      
    </div>
  )
}

export default Learners