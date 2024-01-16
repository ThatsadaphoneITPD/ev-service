import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Blackev0, Blackev2, Blackev4, Blightev, Blightev1, Blightev2, Blightev3, Blightev4, Blightev5 } from '../menu-service/icon';
import 'swiper/swiper-bundle.css';
import Image from 'next/image';

interface Slide {
    imageSrc: any;
    label: string;
    content: string;
}

const SlideShow: React.FC = () => {
    const progressCircle = useRef<SVGSVGElement | null>(null);
    const progressContent = useRef<HTMLSpanElement | null>(null);

    const onAutoplayTimeLeft = (swiper: any, timeLeft: number, progress: number) => {
        if (progressCircle.current) {
            progressCircle.current.style.setProperty('--progress', (1 - progress).toString());
        }

        if (progressContent.current) {
            progressContent.current.textContent = `${Math.ceil(timeLeft / 1000)}s`;
        }
    };
    const slidesData: Slide[] = [
        {
            imageSrc: Blackev0,
            label: "EV Car's The One",
            content: "",
        },
        {
            imageSrc: Blackev2,
            label: "Business Charger Station",
            content: "",
        },
        {
            imageSrc: Blackev4,
            label: "Your EV Car ARE!!",
            content: "",
        },
        {
            imageSrc: Blightev,
            label: "Eco Friendly",
            content: "",
        },
        {
            imageSrc: Blightev1,
            label: "EV Charge morning",
            content: "",
        },
        {
            imageSrc: Blightev2,
            label: "Polution AS Eco Friendly",
            content: "",
        },
        {
            imageSrc: Blightev3,
            label: "EV Charge At Work Office",
            content: "",
        },
        {
            imageSrc: Blightev4,
            label: "EV Charge At Home",
            content: "",
        },
        {
            imageSrc: Blightev5,
            label: "EV Solution without The Fuel Much Better",
            content: "",
        },
    ];


    return (
        <Swiper
            spaceBetween={5}
            centeredSlides={true}
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            // navigation={true}
            modules={[Autoplay]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="flex flex-col items-center relative w-[27rem] md:w-[80rem] md:rounded-lg mx-auto "
        >
            {slidesData.map((slide, index) => (
                <SwiperSlide key={index} data-te-carousel-indicators>
                    <div className={`relative transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none`} >
                        <Image
                            className={`w-full h-48 md:h-[19rem] `}
                            src={slide.imageSrc}
                            alt={`Slide ${index + 1}`}
                        />
                        <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                            <h5 className="text-xl text-white">{slide.label}</h5>
                            <p>{slide.content}</p>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SlideShow;