'use client';

import { IoIosArrowBack } from "react-icons/io";
import React from 'react'
import Link from 'next/link';
import { ActionIcon } from '@/components/ui/action-icon';
import cn from '@/utils/class-names';
import Logo from './logo';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { useWindowScroll } from '@/hooks/use-window-scroll';

function HeaderMenuRight() {
    return (
        <div className="ms-auto grid shrink-0 grid-cols-4 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">

        </div>
    );
}

interface Props {

}

export const EServiceHeader = (props: Props) => {
    const isMounted = useIsMounted();
    const windowScroll = useWindowScroll();
    return (
        // <nav style={{ backgroundColor: "#2e33a9" }} className="flex items-center justify-center">
        //     <div className="flex items-center justify-center p-3 flex-wra h-14 md:h-20 container md:w-[85rem]">
        //         <div className="p-2 mr-4 inline-flex items-center">
        //             <div className='w-16 h-12 md:w-[5.5rem] md:h-[4.5rem] mt-0.5 md:mt-1 '>
        //                 <Image src={EDLLogo} className="relative mr-2 w-full h-full" alt='logo' />
        //             </div>
        //             <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-2">
        //                 <span className="col-span-2 text-sm md:text-xl md:mt-0 text-white font-bold tracking-wide">ລັດວິສະຫາກິດໄຟຟ້າລາວ</span>
        //                 <span className="col-span-2 text-center text-sm md:mt-0 text-white font-bold tracking-wide">ບໍລິການ E-Service</span>
        //             </div>
        //         </div>
        //         {/* <div className="p-2 mr-4 inline-flex items-center">
        //             <div className='w-12 h-12 md:w-20 md:h-20'>
        //                 <Image src={EDLLogo} className="object-cover w-full h-full md:object-contain" alt='logo' />
        //             </div>
        //             <span className="text-sm md:text-xl md:mt-0 text-white font-bold uppercase tracking-wide">EDL E-Service</span>
        //         </div> */}
        //         <button
        //             className="text-white inline-flex p-3 hover:bg-[#3758F4] rounded-full lg:hidden ml-auto hover:text-white outline-none nav-toggler"
        //             data-target="#navigation"
        //         >
        //             <Link href='./' >
        //                 <FaList style={{ color: "white" }} className=" text-[1.5rem] md:text-[4rem]" />
        //             </Link>
        //         </button>
        //         <div
        //             className="hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto"
        //             id="navigation"
        //         >
        //             <div
        //                 className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto"
        //             >
        //                 <span
        //                     className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-[#3758F4] hover:text-white"
        //                 >
        //                     <Link href='./' >
        //                         <IoHome style={{ color: "white" }} className=" text-[1.5rem] md:text-[1.5rem]" />
        //                     </Link>
        //                 </span>
        //                 <span
        //                     className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-[#3758F4] hover:text-white"
        //                 >
        //                     <LuShare2 style={{ color: "white" }} className=" text-[1.5rem] md:text-[1.5rem]" />
        //                 </span>
        //             </div>
        //         </div>
        //     </div>
        // </nav>
        <header
            style={{ backgroundColor: "#2e33a9" }}
            className={cn(
                'sticky top-0 z-50 flex items-center bg-gray-0/80 px-4 py-4 backdrop-blur-xl dark:bg-gray-50/50 md:px-5 lg:px-6 2xl:py-5 3xl:px-8 4xl:px-10',
                ((isMounted && windowScroll.y) as number) > 2 ? 'card-shadow' : ''
            )}
        >
            <div className="flex w-full max-w-2xl items-center">
                <Link href='./' >
                    <ActionIcon
                        aria-label="Open Sidebar Menu"
                        variant="text"
                        className={cn('me-3 h-auto w-auto p-0 sm:me-4 xl:hidden')}
                    >
                        <IoIosArrowBack style={{ color: "white" }} className=" text-[1.5rem] md:text-[1.5rem]" />
                    </ActionIcon>
                </Link>

                <Link
                    href={'./'}
                    aria-label="Site Logo"
                    className="w-14 p-0 hidden top-navbar md:me-3 lg:inline-flex"
                >
                    <Logo iconOnly={true} />
                </Link>
                {/* <SearchWidget /> */}
            </div>
            <HeaderMenuRight />
        </header>
    )
}
