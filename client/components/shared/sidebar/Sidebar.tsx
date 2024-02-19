import React from 'react';
import { Select } from '@/components/ui/select';
import { Bot, BookOpenCheck, Trophy, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface SidebarProps {
    children: React.ReactNode,
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {

    const pathname = usePathname();
    const routeParts = pathname.split("/");
    let currentRoute = "";
    if (routeParts.length > 3) {
        currentRoute = routeParts.pop()!;
    }
    const remainingPathname = routeParts.join("/");
    const router = useRouter();

   return (
    <div className='flex w-screen h-screen gap-0'>
        <div className='w-[258px] h-full bg-[white]'>
        <div className='w-full h-full flex flex-col justify-start'>

            {/* Drop Down */}
                <div className='h-[60px] w-full bg-[#F6F6F6] px-[24px] py-[12px] flex items-center justify-between gap-y-[77px]'>
                    <div className='h-[36px] flex items-center justify-between gap-x-[8px]'>
                        <div className='w-[36px] h-[36px] rounded-md bg-[#D9D9D9]'></div>
                        <p className='text-[16px]'>Maths</p>
                    </div>
                    <ChevronDown width={24} height={24}/>
                </div>

            <div className='w-full px-[12px] flex flex-col gap-y-[32px] mt-[36px]'>
                
                {/* This Workspace */}
                <div className='w-full flex flex-col gap-y-[12px]'>
                    <p className='px-[24px] text-[10px] text-[#909090]'>THIS SUBJECT</p>
                    <div className='flex flex-col w-full gap-y-[16px]'>
                        <div 
                        onClick={() => router.push(`${remainingPathname}`)}
                        className={`px-[24px] py-[8px] flex items-center gap-x-[12px] cursor-pointer ${currentRoute === "" ? "bg-[#F4F4F4] rounded-2xl" : "" }`}>
                            <Bot width={20} height={20}/>
                            <p className='text-[14px]'>AI Tutor</p>
                        </div>
                        <div 
                        onClick={() => router.push(`${remainingPathname}/test`)}
                        className={`px-[24px] py-[8px] flex items-center gap-x-[12px] cursor-pointer ${currentRoute === "test" ? "bg-[#F4F4F4] rounded-2xl" : "" }`}>
                            <BookOpenCheck width={20} height={20} />
                            <p className='text-[14px]'>Test your knowledge</p>
                        </div>
                        <div 
                        onClick={() => router.push(`${remainingPathname}/leaderboard`)}
                        className={`px-[24px] py-[8px] flex items-center gap-x-[12px] cursor-pointer ${currentRoute === "leaderboard" ? "bg-[#F4F4F4] rounded-2xl" : "" }`}>
                            <Trophy width={20} height={20} />
                            <p className='text-[14px]'>Leaderboard</p>
                        </div>
                        {/* <div 
                        onClick={() => router.push("/settings")}
                        className={`px-[24px] py-[8px] flex items-center gap-x-[12px] cursor-pointer`}>
                            <Settings width={20} height={20}/>
                            <p className='text-[14px]'>Settings</p>
                        </div>
                        <div 
                        onClick={() => router.push("/calender")}
                        className={`px-[24px] py-[8px] flex items-center gap-x-[12px] cursor-pointer`}>
                            <Calendar width={20} height={20}/>
                            <p className='text-[14px]'>Calender</p>
                        </div>
                        <div 
                        onClick={() => router.push(`${remainingPathname}/brand-collab`)}
                        className={`px-[24px] py-[8px] flex items-center gap-x-[12px] cursor-pointer ${currentRoute === "brand-collab" ? "bg-[#F4F4F4] rounded-2xl" : ""}`}>
                            <DollarSign width={20} height={20}/>
                            <p className='text-[14px]'>Brand Collab</p>
                        </div> */}
                    </div>
                </div>

                {/* Research Tools */}
                {/* <div className='w-full flex flex-col gap-y-[12px]'>
                    <p className='px-[24px] text-[10px] text-[#909090]'>RESEARCH TOOLS</p>
                    <div className='px-[24px] py-[8px] flex items-center gap-x-[12px]'>
                            <Bot width={20} height={20}/>
                            <p className='text-[14px]'>YT Research</p>
                        </div>
                </div> */}

            </div>
            
        </div>

        </div>
        <div className='flex-1 w-full'>
            {children}
        </div>
    </div>
  )
}

export default Sidebar