import React from 'react'
import Profile from '../Profile'
import Learners from '../Learners'
import { DialogHeader, Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog'
import { MoreVertical,  } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Check } from 'lucide-react'
import { useAuth } from '@/context/authContext'

import { notify } from 'reapop'

const Navbar = () => {

  const { user } = useAuth();

  const handleFormSubmit = async (e: any) => {
    notify("Invite sent !!");
  }

  return (
    <div className='sticky top-0 z-50 flex items-center justify-end gap-x-[40px] px-[48px] text-black h-[60px] bg-white w-full shadow-sm'>
        <Dialog>
          <DialogTrigger>
            <Learners />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className='text-[12px]'>Invite people to this subject</DialogTitle>
              <div className='h-[1px] w-full bg-black'></div>
            </DialogHeader>
            <DialogDescription>
              <form 
              onSubmit={handleFormSubmit}
              action="submit">
                <div className='px-[8px] py-[12px]'>
                    <div className='w-full flex items-center gap-x-[8px]'>
                        <div className='flex-1 px-[6px] py-[4px] flex items-center flex-between border-[1px] rounded-sm'>
                            <input type="text" placeholder='Enter email address' className='border-0 w-full focus:outline-none focus:ring-0 text-black/800'/>
                        </div>
                        <Button
                        type='submit'
                        className='bg-[#156CD2] text-[10px] text-white py-[4px] px-[8px] h-[30px]'>Invite</Button>
                    </div>
                </div>
             </form>
            </DialogDescription>
          </DialogContent>
        </Dialog>
        <Profile  image={user ? user?.profileImage : ""} />
    </div>
  )
}

export default Navbar