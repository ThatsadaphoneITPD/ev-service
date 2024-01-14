"use client"
import "../[id]/style.css"
import React, { useState } from 'react';
import Rate from "@/components/ui/rate";
import AvatarCard from "@/components/ui/avatar-card";


const page: React.FC = () => {
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const user = {
        avatar: 'https://res.cloudinary.com/dp3zeejct/image/upload/v1655344187/cld-sample.jpg',
        name: "Ms. A ນວ1",
        description: "Your Feedback are the best improvement"
    }
    const customer = {
        id: 1,
        name: "Mr. Customer A"
    }

    const reactions = ["ຮ້າຍແຮງ", "ທຳມະດາ", "ໃຊ້ໄດ້", "ດີຂື້ນ", "ດີຫຼາຍ"]
    const emotionalDamage =
        [
            "https://res.cloudinary.com/dp3zeejct/image/upload/v1663663495/Emagi/Computer_troubleshooting-pana_h0dx45.png",
            "https://res.cloudinary.com/dp3zeejct/image/upload/v1663144442/Payment/CiwCwTaVEAA2tXX_4_rybbh5.jpg",
            "https://res.cloudinary.com/dp3zeejct/image/upload/v1663663499/Emagi/Creative_thinking-bro_ekpkf1.png",
            "https://res.cloudinary.com/dp3zeejct/image/upload/v1664004642/Emagi/Mother_Earth_Day-bro_mkildr.png",
            "https://res.cloudinary.com/dp3zeejct/image/upload/v1663144439/Payment/emojisky.com-13387125_2_djogxq.png"
        ]

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-svh">
                <AvatarCard
                    src={user.avatar}
                    name={user.name}
                    description={user.description}
                />
            </div>
            <div className="flex flex-col items-center justify-center min-h-screen">

                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
                    ບໍລິການ ຄວາມເພິງພໍໃຈ
                </h1>
                <Rate size="xl" tooltips={reactions}
                    onChange={(value) => {
                        setSelectedRating(value)
                    }} />
                <div className="h-24">
                    <p className="text-gray-500 mt-4">
                        {selectedRating
                            ? `ໄດ້ເລືອກ: ${reactions[selectedRating - 1]}`
                            : 'ກະລຸນາເລືອກ ລະດັບເພິງພໍໃຈ'}
                    </p>
                    {selectedRating ?
                        <img className="w-20 mx-auto mb-5" src={`${emotionalDamage[selectedRating - 1]}`} /> : <></>}
                    {selectedRating == 1 ?
                        `ເຮົາຈະປັບປຸ່ງການບໍລິການ` : `${!selectedRating ? "ຂອບໃຈ" : ""} ${customer.name}`}
                </div>
            </div>

        </>
    )
};

export default page;
