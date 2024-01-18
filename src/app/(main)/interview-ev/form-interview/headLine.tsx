import React from 'react'
import { BsFillCheckCircleFill } from "react-icons/bs";
import { GiElectric } from "react-icons/gi";
import { PiNumberCircleOneFill, PiNumberCircleTwoFill, PiNumberCircleThreeFill, PiNumberCircleFourFill } from "react-icons/pi";

interface Props {
    rank: number,
    mainContent: string,
    subtext: string,
    frontIcon: boolean
}

const numberlists =
    [
        <PiNumberCircleOneFill key={0} style={{ color: "#000c78", backgroundColor: "white" }} className="absolute -top-0.5 z-10 -ml-3.5 w-10 h-10 rounded-full text-5 " />,
        <PiNumberCircleTwoFill key={1} style={{ color: "#000c78", backgroundColor: "white" }} className="absolute -top-0.5 z-10 -ml-3.5 w-10 h-10 rounded-full text-5" />,
        <PiNumberCircleThreeFill key={2} style={{ color: "#000c78", backgroundColor: "white" }} className="absolute -top-0.5 z-10 -ml-3.5 w-10 h-10 rounded-full text-5" />,
        <PiNumberCircleFourFill key={3} style={{ color: "#000c78", backgroundColor: "white" }} className="absolute -top-0.5 z-10 -ml-3.5 w-10 h-10 rounded-full text-5" />
    ]
export const HeadLine = (props: Props) => {
    return (

        <div className="relative w-full mt-3 mb-3 ml-3 md:ml-1">
            {numberlists[props.rank]}
            {/* <BsFillCheckCircleFill style={{ color: "#000c78", backgroundColor: "white" }} className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-blue-500" /> */}
            <div className="ml-7">
                <div aria-label="header" className="max-w-screen flex items-center space-x-2">
                    <h2 className="mb-3 text-2xl text-[#000c78] font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                        {props.mainContent}
                    </h2>
                </div>
            </div>
        </div>
    )
}
