"use client"
import React from 'react'
import { AdvancedRadio, Text } from "rizzui";
import { LuFolderLock } from "react-icons/lu";
import { MernuServiceItem } from './map-menuitem';
import { menuItems } from './menu-Item';

interface Props {

}

export const Mernuservice = (props: Props) => {
    return (
        <>
            <div className="w-full flex items-center justify-center mt-4 mb-4">
                <h3 className="text-white font-bold text-4xl font-custom-lexend-deca">
                    ແບບຟອມ ເກັບຂໍ້ມູນ
                </h3>
            </div>
            <div className="flex items-center justify-center ">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-16 m-4">
                    <MernuServiceItem memuitems={menuItems} />
                </div>
            </div>
        </>
    )
}
