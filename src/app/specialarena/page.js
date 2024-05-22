'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { TextPlugin } from 'gsap/dist/TextPlugin'; // Ensure to import TextPlugin
import '../assets/css/tailwind.css';
import Image from 'next/image';

const NavLight = dynamic(() => import('../components/navlight'));
const Footer = dynamic(() => import('../components/footer'));
const AboutThree = dynamic(() => import('../components/aboutThree'));
const Pricing = dynamic(() => import('../components/pricinghackers'));
const Web3News = dynamic(() => import('../components/web3news'));

const Animations = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    ScrollTrigger.defaults({
      toggleActions: "restart pause resume pause"
    });

    gsap.to(".orange p", {
      scrollTrigger: ".orange",
      duration: 5,
      rotation: 360
    });

    gsap.to(".purple", {
      scrollTrigger: {
        trigger: ".purple",
        toggleActions: "restart pause reverse pause"
      },
      duration: 1,
      backgroundColor: "#000",
      ease: "none"
    });

    gsap.to(".yoyo p", {
      scrollTrigger: ".yoyo",
      scale: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2"
    });

    gsap.to("#myText", {
      duration: 1.5,
      text: "Decentralized Area",
      delay: 1
    });
    gsap.to("#myText2", {
      duration: 10.7,
      text: "Welcome, to the Decentralized Trading Arena, designed to challenge traders across trading platforms, using a combination of real-world tools and strategies within a high-stakes, yet entirely risk-free, simulated trading environment.",
      delay: 7
    });
    gsap.to("#myText3", {
      duration: 10.7,
      text: "The winner will outsmart competitors and claim victory by demonstrating superior trading insight and strategy.",
      delay: 15
    });
  }, []);

  return (
    <>
      
      <NavLight />
      <div>
      <section className="panel green hover-gradient-amber-5 mx-auto text-center relative h-96">
  <div className="absolute inset-0">
    <Image src="/images/blog/tradepass.jpg" alt="Background Image" className="opacity-30" fill style={{ objectFit: "cover" }} />
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  </div>
  <div className="relative z-10 p-6 flex items-center justify-center flex-col">
    <h3 id="myText" className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold text-white">
      Trading Arena
    </h3>
  </div>
</section>

        <section className="panel orange mx-auto text-center relative h-96">
          <div className="absolute inset-0">
    <Image src="/images/blog/tradeteam.jpg" alt="Background Image" className="opacity-30" fill style={{ objectFit: "cover" }} />
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  </div>
  <div className="relative z-10 p-6 flex items-center justify-center flex-col">
          <p id="myText2" className='mb-4  md:leading-normal text-lg leading-normal text-white hover-gradient-amber-5 text-center p-8'>Are you ready?</p>
          </div>
        </section>

        <section className="panel purple mx-auto text-center relative hover-gradient-amber-6">
        <div className="absolute inset-0">
    <Image src="/images/blog/tooltrade.jpg" alt="Background Image" className="opacity-30" fill style={{ objectFit: "cover" }} />
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  </div>
  <div className="relative z-10 p-6 flex items-center justify-center flex-col"></div>
          <h1 id='myText3' className="text-green-400 max-w-xl text-xl  hover-gradient-amber-5 z-0 mx-auto p-8 text-center">🏆</h1>
        </section>


        <section className="panel blue yoyo">
          <p className='text-center'>Yoyo Text!</p>
        </section>

        <Pricing />
      </div>
      <Web3News />
      <AboutThree />
      <Footer />
    </>
  );
}

export default Animations;
