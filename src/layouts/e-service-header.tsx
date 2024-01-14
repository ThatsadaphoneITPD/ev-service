import { EDLLogo } from '@/app/(main)/edl-eservice/menu-service/icon'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {

}

export const EServiceHeader = (props: Props) => {
    return (
        <nav style={{ backgroundColor: "#4e71c8" }} className="flex items-center justify-center p-3 flex-wra h-14 md:h-20 ">
            <div className="p-2 mr-4 inline-flex items-center">
                <div className='w-16 h-12 md:w-[5.5rem] md:h-[4.5rem] mt-0.5 md:mt-1 '>
                    <Image src={EDLLogo} className="relative mr-2 w-full h-full" alt='logo' />
                </div>
                <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-2">
                    <span className="col-span-2 text-sm md:text-xl md:mt-0 text-white font-bold tracking-wide">ລັດວິສະຫາກິດໄຟຟ້າລາວ</span>
                    <span className="col-span-2 text-center text-sm md:mt-0 text-white font-bold tracking-wide">ບໍລິການ E-Service</span>
                </div>
            </div>
            {/* <div className="p-2 mr-4 inline-flex items-center">
                <div className='w-12 h-12 md:w-20 md:h-20'>
                    <Image src={EDLLogo} className="object-cover w-full h-full md:object-contain" alt='logo' />
                </div>
                <span className="text-sm md:text-xl md:mt-0 text-white font-bold uppercase tracking-wide">EDL E-Service</span>
            </div> */}
            <button
                className="text-white inline-flex p-3 hover:bg-[#3758F4] rounded-full lg:hidden ml-auto hover:text-white outline-none nav-toggler"
                data-target="#navigation"
            >
                <Link href='./' >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                </Link>
            </button>
            <div
                className="hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto"
                id="navigation"
            >
                <div
                    className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto"
                >
                    <span
                        className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-[#3758F4] hover:text-white"
                    >
                        <Link href='./' >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                        </Link>
                    </span>
                    <span
                        className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-[#3758F4] hover:text-white"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                        </svg>
                    </span>
                </div>
            </div>

        </nav>
    )
}
