import { EDLLogo } from '@/app/(main)/edl-eservice/menu-service/icon'
import { FaList } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { LuShare2 } from "react-icons/lu";
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {

}

export const EServiceHeader = (props: Props) => {
    return (
        <nav style={{ backgroundColor: "#4e71c8" }} className="flex items-center justify-center">
            <div className="flex items-center justify-center p-3 flex-wra h-14 md:h-20 container md:w-[85rem]">
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
                        <FaList style={{ color: "white" }} className=" text-[1.5rem] md:text-[4rem]" />
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
                                <IoHome style={{ color: "white" }} className=" text-[1.5rem] md:text-[1.5rem]" />
                            </Link>
                        </span>
                        <span
                            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-[#3758F4] hover:text-white"
                        >
                            <LuShare2 style={{ color: "white" }} className=" text-[1.5rem] md:text-[1.5rem]" />
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    )
}
