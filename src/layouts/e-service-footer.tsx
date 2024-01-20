import { EDLLogo } from '@/app/(main)/edl-eservice/menu-service/icon';
import Image from 'next/image';
import React from 'react'

interface Props {

}
export const EServiceFooter = (props: Props) => {
    const currentYear = new Date().getFullYear();
    return (
        <>
            <footer
                style={{
                    backgroundColor: "#2E3192"
                }}
                className="relative z-10 flex flex-col items-center justify-center text-center"
            >

                <div>
                    <div className="w-full flex items-center justify-center px-2">
                        <div className="rounded-full w-12 h-12 md:w-14 md:h-14 mx-[1rem] mt-[0.5rem] ">
                            <Image className="p-[2.50px]" src={EDLLogo} alt="logo" />
                        </div>
                        <p className="text-white font-custom-lexend-deca"> Copyright &copy; {`${currentYear}, ELECTRICITE DU LAOS`}</p>
                    </div>
                </div>

            </footer >
        </>
    )
}
