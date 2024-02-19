import Image from 'next/image'
import React from 'react'
import { clsx } from 'clsx'

interface ProfileProps {
  extended?: string;
  image: string;
}

const Profile: React.FC<ProfileProps> = ({ extended, image }) => {
  return (
    <div className={clsx('rounded-full w-[32px] h-[32px] bg-black', extended)}>
        <Image src={image} width={32} height={32} alt='avatar' className='rounded-full object-fill' />
    </div> 
  )
}

export default Profile