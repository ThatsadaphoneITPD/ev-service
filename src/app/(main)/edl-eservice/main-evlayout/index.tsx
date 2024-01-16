import React from 'react'
import './styles.css'
import { Mernuservice } from '../menu-service';
import SlideShow from './slide-show';
interface Props {

}

export const Evlayout = (props: Props) => {
    // const [selectedRating, setSelectedRating] = React.useState<number | null>(null);
    // const reactions = ["ຮ້າຍແຮງ", "ທຳມະດາ", "ໃຊ້ໄດ້", "ດີຂື້ນ", "ດີຫຼາຍ"]
    // const review: string = "Reviews on"
    // const headerline: string = "ສະໝັກ ລົດ EV ເພື່ອການຂັບຂີ່ ເປັນມິດ ຕໍ່ສິ່ງແວ້ມລ້ອມ"
    // const contentline: string = "Perceived end knowledge certainly day sweetness why cordially. Ask a quick six seven erceived end knowledge certainly day sweetness why cordially. Ask a quick erceived end knowledge certainly day sweetness why cordially. Ask a quick "
    // const sign: any = { button: "Sign EV", hoverText: "ສະໝັກຂໍ້ມູນລົດ EV ຂອງທ່ານ" }
    // const more: any = { button: "ບໍລິການອື້ນ...", hoverText: "ເພີ່ມເຕີມ EDL Service" }
    return (
        <>
            <div className="area" >
                <div className='justify-center items-center place-items-center h-[50rem] md:h-full'>
                    <div className="grid grid-cols-1">
                        {/* <div className="col-span-6 md:col-start-1 md:col-span-3 mt-5 md:ml-60 sm:w-96">
                            <div className="grid grid-cols-1 gap-1 m-10 md:m-auto" >
                                <h3 className="text-white font-bold text-4xl md:w-screen sm:text-wrap sm:ml-10 font-custom-lexend-deca">
                                    {headerline}
                                </h3>
                                <p className="text-10 md:text-11 font-quicksand text-white md:w-96 sm:ml-10 ">
                                    {contentline}
                                </p>
                                <div className="grid grid-cols-2 gap-4 mt-10 md:m-10" style={{ width: "20rem" }}>
                                    <Tooltip color="invert" shadow="sm" content={() => <span>{sign.hoverText}</span>}>
                                        <button className="mx-auto py-2.5 text-white border w-20 border-white rounded-md hover:bg-white hover:text-black relative">
                                            {sign.button}
                                        </button>
                                    </Tooltip>
                                    <Tooltip color="invert" shadow="sm" content={() => <span>{more.hoverText}</span>}>
                                        <button className="text-center text-white text-sm font-quicksand underline hover:text-blue hover:opacity-80 focus:outline-none">
                                            {more.button}
                                        </button>
                                    </Tooltip>
                                </div>
                                <div className="grid md:grid-cols-2 md:gap-4 mt-5 ml-10">
                                    <Rate size="sm" label={<span className="text-center text-white text-sm font-quicksand underline">{review}</span>} defaultValue={4} tooltips={reactions}
                                        onChange={(value) => {
                                            setSelectedRating(value)
                                        }} />
                                </div>
                            </div>
                        </div> */}
                        <div className="col-span-6 md:col-span-6 relative group h-full mt-10">
                            <SlideShow />
                        </div>
                        <div className="col-span-6 md:col-span-6 sm:h-screen">
                            <Mernuservice />
                        </div>
                    </div>
                </div>
                <ul className="circles" style={{ zIndex: 0 }}>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div >
        </>
    )
}
