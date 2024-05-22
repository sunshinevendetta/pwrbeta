'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { FaFileContract, GiTeamIdea, GiStairsGoal, FaTools, GiTribunalJury, FaAward, RiLightbulbFlashFill, RiTeamFill } from '../assets/icons/vander';

const TradingSlider = () => {
    const casesData = [
        {
            icon: FaFileContract,
            image: '/images/blog/tradepass.jpg',
            title: 'Sign-Up',
            desc: 'Entry fee of 0.005 ETH includes a trader badge +$10M virtual USD for trading in a risk-free, simulated trading environment.'
        },
        {
            icon: GiTeamIdea,
            image: '/images/blog/tradeformation.jpg',
            title: 'Team Formation',
            desc: 'Compete solo or join a team of up to five traders, fostering both individual brilliance and collaborative strategy.'
        },
        {
            icon: GiStairsGoal,
            image: '/images/blog/tradechallenge.jpg',
            title: 'Challenge Selection',
            desc: 'Choose your challenge arena, each designed to test different aspects of trading, spot or futures.'
        },
        {
            icon: FaTools,
            image: '/images/blog/tradepro.jpg',
            title: 'Trading Tools',
            desc: 'The price feed mirrors real-time market conditions without lag, ensuring authentic trading experience.'
        },
        {
            icon: GiTribunalJury,
            image: '/images/blog/tradejudge.jpg',
            title: 'Judging Criteria',
            desc: 'Judged on profitability, strategy, innovation, and risk management. Live P&L display adds transparency and engagement.'
        },
        {
            icon: FaAward,
            image: '/images/blog/tradeaward.jpg',
            title: 'Awards Ceremony',
            desc: 'Celebrate the finesse traders in a live-streamed event with prizes awarded to the top performers.'
        },
        {
            icon: RiLightbulbFlashFill,
            image: '/images/blog/tradefutures.jpg',
            title: 'Futures',
            desc: 'Focus on predicting and capitalizing on future market movements within centralized exchanges using margin trading and leverage. Prize: $20,000.'
        },
        {
            icon: RiLightbulbFlashFill,
            image: '/images/blog/tradespot.jpg',
            title: 'Spot',
            desc: 'Master the art of spot trading on centralized platforms, where immediate market movements dictate success. Prize: $20,000.'
        },
        {
            icon: RiTeamFill,
            image: '/images/blog/12.jpg',
            title: 'Traders Community',
            desc: 'Join the vibrant community of traders and contribute to advancing human potential through innovation.'
        }
    ];

    const [slideIndex, setSlideIndex] = useState(0);
    const sliderRef = useRef(null);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: () => setSlideIndex(slideIndex + 1),
        beforeChange: (current, next) => setSlideIndex(next),
        adaptiveHeight: true,
        arrows: false,
    };

    return (
        <section className="mt-12 mb-12 mx-auto w-full max-w-screen-lg">
            <Slider ref={sliderRef} {...settings}>
                {casesData.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div className="relative blur-sm hover:blur-none p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 hover:bg-amber-400 dark:hover:bg-amber-500 duration-500" key={index}>
                            <div className="relative overflow-hidden h-96 w-full">
                                <Image src={item.image} alt={item.title} className="opacity-80 object-cover w-full h-full" fill />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center flex-col p-4">
                                    <Icon className="h-12 w-12 text-white mb-4" />
                                    <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                                    <p className="text-m text-white px-3 text-center">{item.desc}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Slider>
            <div className="flex justify-center mt-4">
                <input
                    type="range"
                    min={0}
                    max={casesData.length - 1}
                    value={slideIndex}
                    onChange={e => sliderRef.current.slickGoTo(parseInt(e.target.value, 10))}
                    className="slider"
                />
            </div>
        </section>
    );
}

export default TradingSlider;