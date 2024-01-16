import React from 'react'
import { BsFillCheckCircleFill } from "react-icons/bs";
import { GiElectric } from "react-icons/gi";

interface Props {
    mainContent: string,
    subtext: string,
    frontIcon: boolean
}

export const HeadLine = (props: Props) => {
    return (

        <div className="relative w-full mt-1">
            <BsFillCheckCircleFill style={{ color: "#3758F4", backgroundColor: "white" }} className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-blue-500" />
            <div className="ml-6">
                <div aria-label="header" className="max-w-screen flex items-center space-x-2">
                    {props.frontIcon == true &&
                        <GiElectric style={{ color: "#3758F4", backgroundColor: "white" }} className="w-8 h-8 shrink-0" />
                    }
                    <div className="space-y-0.5 flex-1 ">
                        <h4 className="font-bold text-blue-500">{props.mainContent}</h4>
                        <p className="text-sm font-normal text-gray-400 leading-none">
                            {props.subtext ?? props.subtext}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
