"use client"
import React from 'react'
import { MernuServiceItem } from './map-menuitem';
import { menuItems, generalService } from './menu-Item';
import Image from 'next/image';
import { UniversityEDL } from './icon';

interface Props {

}

export const Mernuservice = (props: Props) => {
    return (
        <>
            <div className="w-full flex items-center justify-center px-5 mt-4 mb-4">
                <div className="rounded-full bg-[#ffff] w-12 h-12 md:w-14 md:h-14 mx-[1rem] ">
                    <Image className="p-[2.50px]" src={UniversityEDL} alt="logo" />
                </div>
                <h5 className="text-[#2E3192] font-bold text-[19.692px] md:text-5xl"> EDL e-Services </h5>
            </div>
            <div className="w-full flex items-center justify-left md:justify-center px-5 mt-4 mb-4">
                <h5 className="text-[#2E3192]  font-bold text-[19.692px] md:text-4xl"> ລົງທະບຽນ </h5>
            </div>
            <div className="flex items-center justify-center px-[0.7rem]">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-5 md:gap-10 m-[0.5rem]">
                    <MernuServiceItem memuitems={menuItems} />
                </div>
            </div>
            <div className="w-full flex items-center justify-left md:justify-center px-5 mt-4 mb-4">
                <h5 className="text-[#2E3192]  font-bold text-[19.692px] md:text-4xl "> ບໍລິການອື່ນໆ </h5>
            </div>
            <div className="flex items-center justify-center px-[0.7rem]">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-5 md:gap-10 m-[0.5rem]">
                    <MernuServiceItem memuitems={generalService} />
                </div>
            </div>
        </>
    )
}
