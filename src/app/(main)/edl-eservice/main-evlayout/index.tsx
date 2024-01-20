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
            <div className="area" style={{
                // background: '#4e71c8',
                // backgroundColor: 'linear-gradient(to left, #8faafb, #4e79c8)',
            }} >
                <div className='justify-center items-center place-items-center h-full md:h-full'>
                    <div className="grid grid-cols-1">
                        <div className="col-span-6 md:col-span-6 relative group h-full mt-10 px-[10px] flex items-center justify-center">
                            <SlideShow />
                        </div>
                        <div className="col-span-6 md:col-span-6 sm:h-screen px-[5px] mt-[1rem]">
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
