import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import { FiCheckCircle } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { gsap } from "gsap";

export default function Pricing() {
  const [ethPrice, setEthPrice] = useState(0);
  const [btcPrice, setBtcPrice] = useState(0);
  const popupRef = useRef(null);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=usd')
      .then(response => {
        setEthPrice(response.data.ethereum.usd);
        setBtcPrice(response.data.bitcoin.usd);
      })
      .catch(error => {
        console.error('Error fetching prices:', error);
      });

    if (showPopup) {
      gsap.fromTo(popupRef.current, 
        { opacity: 0, scale: 0 }, 
        { opacity: 1, scale: 1.2, duration: 1.5, ease: "bounce.out" });
    }
  }, [showPopup]);

  const handleClosePopup = () => {
    gsap.to(popupRef.current, { opacity: 0, scale: 0, duration: 1 });
    setTimeout(() => setShowPopup(false), 1000);
  };

  return (
    <>
      <div className="relative w-full bg-black bg-opacity-30 mt-6 p-6 overflow-hidden">
        <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-800 bg-gray-900 max-w-screen-xl mx-auto">
          <div className="p-6">
            <h5 className="text-2xl leading-normal font-semibold text-white">Hackers, Artist, Trading Arena, and AiTrading</h5>
            <p className="text-slate-400 mt-2">For those who dare to get the glory and prove they are number one</p>
            <div className="flex mt-4">
              <span className="text-lg font-semibold text-white">Ξ</span>
              <span className="text-5xl font-semibold mb-0 ms-1 text-white">0.0000</span>
              <span className="text-lg font-semibold ms-2 text-white">
                / 0.00 USDC
                / 0.000000 ₿
                / 0.00 MXN
              </span>
            </div>
            <Link href={`https://tally.so/r/mD104p`}>
              <button className="py-2 px-5 mt-4 font-semibold tracking-wide border align-middle duration-500 text-base text-center rounded bg-amber-400 text-white hover:bg-amber-500">More Info</button>
            </Link>
          </div>

          <div className="p-6 bg-gray-800 dark:bg-slate-800">
            <ul className="list-none text-slate-400">
              <li className="font-semibold text-slate-100 dark:text-white text-sm uppercase">Features:</li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
                <span className="text-slate-100 dark:text-white me-1 font-semibold">2-Day Expo Floor Access</span>
              </li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
                <span className="text-slate-100 dark:text-white me-1 font-semibold">PWR2TP Social Profile & Gifts</span>
              </li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
                <span className="text-slate-100 dark:text-white me-1 font-semibold">On-Site Quests & Rewards</span>
              </li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
                <span className="text-slate-100 dark:text-white me-1 font-semibold">All Access to Side Events</span>
              </li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
                <span className="text-slate-100 dark:text-white me-1 font-semibold">Selected Conferences</span>
              </li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
                <span className="text-slate-100 dark:text-white me-1 font-semibold">Special Kit With Professional Tools</span>
              </li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
                <span className="text-slate-100 dark:text-white me-1 font-semibold">OnChain POAP Collectible</span>
              </li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
                <span className="text-slate-100 dark:text-white me-1 font-semibold">Special Area To Build</span>
              </li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
                <span className="text-slate-100 dark:text-white me-1 font-semibold">Contest Participation to win +100K USD in Prizes</span>
              </li>
            </ul>
          </div>

          {showPopup && (
            <div ref={popupRef} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90">
              <div className="relative p-6 rounded-lg shadow-lg bg-gray-800 text-white max-w-md mx-auto">
                <button onClick={handleClosePopup} className="absolute top-2 right-2 text-white">
                  <AiOutlineClose className="h-6 w-6" />
                </button>
                <div className="text-4xl bg-gradient-to-br from-green-600 to-fuchsia-600 text-transparent bg-clip-text hover-gradient-amber-5 font-bold">
                  FREE
                </div>
                <div className="text-lg mt-3">
                  Why Free?
                  <p className="mt-2 text-sm">We believe in providing opportunities for everyone to participate and showcase their talents. Join us and be a part of this amazing journey!</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
