import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { FiCheckCircle, AiOutlineClose } from '../assets/icons/vander';

export default function Pricing() {
  const [selectedCryptoBusiness, setSelectedCryptoBusiness] = useState('MXN');
  const [ethPrice, setEthPrice] = useState(0);
  const [btcPrice, setBtcPrice] = useState(0);
  const businessPriceUSDC = 150;
  const [businessPriceMXN, setBusinessPriceMXN] = useState(3500);
  const [selectedCategory, setSelectedCategory] = useState('Hackers');

  const handleCryptoChangeBusiness = (crypto) => {
    setSelectedCryptoBusiness(crypto);
    if (crypto === 'ETH') {
      setBusinessPriceMXN(businessPriceMXN * 1.1);
    } else if (crypto === 'BTC') {
      setBusinessPriceMXN(businessPriceMXN * 0.9);
    } else {
      setBusinessPriceMXN(3500);
    }
  };

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=usd')
      .then(response => {
        setEthPrice(response.data.ethereum.usd);
        setBtcPrice(response.data.bitcoin.usd);
      })
      .catch(error => {
        console.error('Error fetching prices:', error);
      });
  }, []);

  const handleBuyNowClick = (e) => {
    e.preventDefault();
    e.target.textContent = "COMING SOON!";
  };

  return (
    <>
      <div className="grid lg:grid-cols-4 bg-black bg-opacity-30 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
        
        {/* Business Section */}
        <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-800">
          <div className="p-6">
            <h5 className="text-2xl leading-normal font-semibold">Business</h5>
            <p className="text-slate-400 mt-2">For the industry professionals that look to accelerate, expand and improve their journey on all areas possible</p>
            <div className="flex mt-4">
              <span className="text-lg font-semibold">
                {selectedCryptoBusiness === 'ETH' ? 'Ξ' :
                  selectedCryptoBusiness === 'BTC' ? '₿' :
                    selectedCryptoBusiness === 'USDC' || selectedCryptoBusiness === 'MXN' ? '$' : ''}
              </span>
              <span className="text-5xl font-semibold mb-0 ms-1">
                {selectedCryptoBusiness === 'ETH' ? (ethPrice ? (150 / ethPrice).toFixed(4) : 'Loading...') :
                  selectedCryptoBusiness === 'BTC' ? (btcPrice ? (150 / btcPrice).toFixed(6) : 'Loading...') :
                    selectedCryptoBusiness === 'USDC' ? (150) : businessPriceMXN}
              </span>
            </div>
            <p className="text-slate-400 uppercase text-xs">
              {selectedCryptoBusiness === 'ETH' ? 'ETH' :
                selectedCryptoBusiness === 'BTC' ? 'BTC' :
                  selectedCryptoBusiness === 'USDC' ? 'USDC' : 'MXN'}
            </p>

            <div className="mt-6 flex items-center">
              <Link href="" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400/5 hover:bg-amber-400 rounded border-amber-400/10 hover:border-amber-400 text-amber-400 hover:text-white" onClick={handleBuyNowClick}>Buy Now</Link>

              <div className="ml-4">
                <button
                  className={`py-1 px-2 mr-2 font-semibold tracking-wide border align-middle duration-500 text-sm text-center rounded ${selectedCryptoBusiness === 'MXN' ? 'bg-amber-400 text-white' : 'bg-amber-400/5 text-amber-400 hover:bg-amber-400 hover:text-white'}`}
                  onClick={() => handleCryptoChangeBusiness('MXN')}
                >
                  MXN
                </button>
                <button
                  className={`py-1 px-2 mr-2 font-semibold tracking-wide border align-middle duration-500 text-sm text-center rounded ${selectedCryptoBusiness === 'ETH' ? 'bg-amber-400 text-white' : 'bg-amber-400/5 text-amber-400 hover:bg-amber-400 hover:text-white'}`}
                  onClick={() => handleCryptoChangeBusiness('ETH')}
                >
                  ETH
                </button>
                <button
                  className={`py-1 px-2 mr-2 font-semibold tracking-wide border align-middle duration-500 text-sm text-center rounded ${selectedCryptoBusiness === 'BTC' ? 'bg-amber-400 text-white' : 'bg-amber-400/5 text-amber-400 hover:bg-amber-400 hover:text-white'}`}
                  onClick={() => handleCryptoChangeBusiness('BTC')}
                >
                  BTC
                </button>
                <button
                  className={`py-1 px-2 font-semibold tracking-wide border align-middle duration-500 text-sm text-center rounded ${selectedCryptoBusiness === 'USDC' ? 'bg-amber-400 text-white' : 'bg-amber-400/5 text-amber-400 hover:bg-amber-400 hover:text-white'}`}
                  onClick={() => handleCryptoChangeBusiness('USDC')}
                >
                  USDC
                </button>
              </div>
            </div>

            <p className="text-slate-400 text-sm mt-3">Credit, Debit, Cash and Crypto Accepted <br />Special price if paid on crypto**</p>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-slate-800">
            <ul className="list-none text-slate-400">
              <li className="font-semibold text-slate-900 dark:text-white text-sm uppercase">Features:</li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
                <span className="text-slate-900 dark:text-white me-1 font-semibold">2-Day Expo Floor Access</span>
              </li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
                <span className="text-slate-900 dark:text-white me-1 font-semibold">PWR2TP Social Profile & Gifts</span>
              </li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
                <span className="text-slate-900 dark:text-white me-1 font-semibold">On-Site Quests & Rewards</span>
              </li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
                <span className="text-slate-900 dark:text-white me-1 font-semibold">Access to 2 Side Events</span>
              </li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
                <span className="text-slate-900 dark:text-white me-1 font-semibold">Industry Conferences</span>
              </li>
              <li className="flex items-center mt-2 text-slate-400">
                <AiOutlineClose className="h-[18px] w-[18px] me-2" />
                <span>Contest Participation</span>
                <span className="text-slate-500 text-sm ms-1">(Hackathon, Art, Trade Arena)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Hackers, Artists, etc. Section */}
        <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-800">
          <div className="p-6">
            <h5 className="text-2xl leading-normal font-semibold">Hackers, Artist, Trading Arena, and AiTrading</h5>
            <p className="text-slate-400 mt-2">For those who dare to get the glory and prove they are number one</p>
            <div className="flex mt-4">
              <span className="text-lg font-semibold">Ξ</span>
              <span className="text-5xl font-semibold mb-0 ms-1">
                {selectedCategory === 'Hackers' || selectedCategory === 'Artist' ? '0.0000' : selectedCategory === 'Traders' ? '0.005' : '0.025'}
              </span>
              <span className="text-lg font-semibold ms-2">
                / {selectedCategory === 'Hackers' || selectedCategory === 'Artist' ? '0.00' : selectedCategory === 'Traders' ? (0.005 * ethPrice).toFixed(2) : (0.025 * ethPrice).toFixed(2)} USDC
                / {selectedCategory === 'Hackers' || selectedCategory === 'Artist' ? '0.000000' : selectedCategory === 'Traders' ? (0.005 * ethPrice / btcPrice).toFixed(6) : (0.025 * ethPrice / btcPrice).toFixed(6)} ₿
                / {selectedCategory === 'Hackers' || selectedCategory === 'Artist' ? '0.00' : selectedCategory === 'Traders' ? (0.005 * ethPrice * 20).toFixed(2) : (0.025 * ethPrice * 20).toFixed(2)} MXN
              </span>
            </div>
            <Link href={`https://tally.so/r/mD104p`}>
              <button className="py-2 px-5 mr-2 font-semibold tracking-wide border align-middle duration-500 text-base text-center rounded">More Info</button>
            </Link>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-slate-800">
            <ul className="list-none text-slate-400">
              <li className="font-semibold text-slate-900 dark:text-white text-sm uppercase">Features:</li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
                <span className="text-slate-900 dark:text-white me-1 font-semibold">2-Day Expo Floor Access</span>
              </li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
                <span className="text-slate-900 dark:text-white me-1 font-semibold">PWR2TP Social Profile & Gifts</span>
              </li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
                <span className="text-slate-900 dark:text-white me-1 font-semibold">On-Site Quests & Rewards</span>
              </li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
                <span className="text-slate-900 dark:text-white me-1 font-semibold">All Access to Side Events</span>
              </li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
                <span className="text-slate-900 dark:text-white me-1 font-semibold">Selected Conferences</span>
              </li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
                <span className="text-slate-900 dark:text-white me-1 font-semibold">Special Kit With Professional Tools</span>
              </li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
                <span className="text-slate-900 dark:text-white me-1 font-semibold">OnChain POAP Collectible</span>
              </li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
                <span className="text-slate-900 dark:text-white me-1 font-semibold">Special Area To Build</span>
              </li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
                <span className="text-slate-900 dark:text-white me-1 font-semibold">Contest Participation to win +100K USD in Prizes</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
