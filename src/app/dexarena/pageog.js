'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const NavLight = dynamic(() => import('../components/navlight'));
const Footer = dynamic(() => import('../components/footer'));
const AboutThree = dynamic(() => import('../components/aboutThree'));
const Pricing = dynamic(() => import('../components/pricinghackers'));
const Web3News = dynamic(() => import('../components/web3news'));

import { FaFileContract, GiTeamIdea, GiStairsGoal, FaTools, GiTribunalJury, FaAward, RiLightbulbFlashFill, RiTeamFill } from '../assets/icons/vander';

export default function Services() {
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    const casesData = [
        {
            icon: FaFileContract,
            image: '/images/blog/1.jpg',
            title: 'Sign-Up',
            desc: 'An entry fee of 0.005 ETH secures a contestant’s place, granting them a $1M virtual budget for trading in a risk-free, simulated testnet environment.'
        },
        {
            icon: GiTeamIdea,
            image: '/images/blog/tradeteam.jpg',
            title: 'Team Formation',
            desc: 'Compete solo or join a team of up to five traders, fostering both individual brilliance and collaborative strategy.'
        },
        {
            icon: GiStairsGoal,
            image: '/images/blog/3.jpg',
            title: 'Challenge Selection',
            desc: 'Choose your challenge arena, each designed to test different aspects of trading, spot or futures.'
        },
        {
            icon: FaTools,
            image: '/images/blog/tooltrade.jpg',
            title: 'Trading Tools',
            desc: 'Utilize real-world tools and strategies in a high-stakes, yet entirely risk-free, simulated trading environment. The price feed mirrors real-time market conditions without any lag, ensuring a dynamic and authentic trading experience. Additionally, each team (solo traders count as a team) will receive an initial deposit of $1 million USD to start making trades.'
        },
        {
            icon: GiTribunalJury,
            image: '/images/blog/5.jpg',
            title: 'Judging Criteria',
            desc: 'Judged on profitability, strategy and innovation, and risk management. Live P&L display adds transparency and engagement.'
        },
        {
            icon: FaAward,
            image: '/images/blog/award.jpg',
            title: 'Awards Ceremony',
            desc: 'Celebrate the trading acumen and strategic finesse of participants in a live-streamed event with prizes awarded to the top performers.'
        },
        {
            icon: RiLightbulbFlashFill,
            image: '/images/blog/20.jpg',
            title: 'Futures',
            desc: 'Focus on predicting and capitalizing on future market movements within centralized exchanges using margin trading and leverage. Prize: $20,000.'
        },
        {
            icon: RiLightbulbFlashFill,
            image: '/images/blog/21.jpg',
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
    const [updateCount, setUpdateCount] = useState(0);
    const sliderRef = useRef(null);

    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      afterChange: () => setUpdateCount(updateCount + 1),
      beforeChange: (current, next) => setSlideIndex(next),
      adaptiveHeight: true
    };

    return (<>
      <NavLight />
      <section className="relative md:py-24 py-16">
        <div className="container relative md:mt-24 mt-16">
          <div className="grid grid-cols-1 pb-6 text-center">
          <h3 className="mb-4 md:text-3xl md:leading-normal hover-gradient-amber-5 text-3xl leading-normal font-semibold">Trading Arena
  <h1 className="text-xs my-4 mx-auto" >Decentralized Area</h1></h3>
  <p className='text-slate-400 max-w-xl mx-auto text-justify p-8 '>Welcome, to the Decentralized Trading Arena. The arena is designed to challenge traders across trading platforms, using a combination of real-world tools and strategies within a high-stakes, yet entirely risk-free, simulated trading environment. </p>
  <h1 className="text-green-400 max-w-xl text-xs mx-auto p-8">The winner will outsmart competitors and claim victory by demonstrating superior trading insight and strategy.</h1>
</div>

          <Slider ref={sliderRef} {...settings}>
            {casesData.map((item, index) => {
              const Icon = item.icon;
              return (
                (<div className="relative p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 hover:bg-amber-400 dark:hover:bg-amber-500 duration-500" key={index}>
                  <div className="relative overflow-hidden h-96">
                    <Image src={item.image} alt={item.title} className="opacity-80" fill style={{
                      objectFit: "cover"
                    }} />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center flex-col p-4">
                      <Icon className="h-12 w-12 text-white mb-4" />
                      <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-m text-white px-3 text-center">{item.desc}</p>
                    </div>
                  </div>
                </div>)
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
    className="slider"/>
             
</div>
<div className="my-4 text-center">
<h5>Contest Guidelines</h5>
</div>
<Pricing />

        </div>
        <Web3News />
        <AboutThree />
       
      </section>
      <Footer />
    </>);
}