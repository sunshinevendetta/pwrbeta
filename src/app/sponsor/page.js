'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';

const NavLight = dynamic(() => import('../components/navlight'), { ssr: false });
const Footer = dynamic(() => import('../components/footer'), { ssr: false });
const WTCScene = dynamic(() => import('../wtc/page'), { ssr: false });
const StandScene = dynamic(() => import('../stand/page'), { ssr: false });
const RoomScene = dynamic(() => import('../room/page'), { ssr: false });
const WelcomeScene = dynamic(() => import('../logo/page'), { ssr: false });

const Sponsors = () => {
  useEffect(() => {
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }, []);

  return (
    <>
      <NavLight />
      <div className="min-h-screen text-white flex flex-col">
        <Head>
          <title>PWR2TP Sponsors Marketplace</title>
          <meta name="description" content="Unlock Business Opportunities at PWR2TP Sponsors Marketplace" />
          <meta property="og:title" content="PWR2TP Sponsors Marketplace" />
          <meta property="og:description" content="Join us at the World Trade Center in Mexico City on September 7-8, 2024. Discover unparalleled opportunities to showcase your brand, protocol, token, project, or product in this premier expo." />
          <meta property="og:image" content="/logo.gif" />
          <meta property="og:url" content="https://sponsors.pwr2tp.mx" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="PWR2TP Sponsors Marketplace" />
          <meta name="twitter:description" content="Join us at the World Trade Center in Mexico City on September 7-8, 2024." />
          <meta name="twitter:image" content="/logo.gif" />
        </Head>
        <div className="flex-grow">
          <div className="flex justify-center p-6">
            <div className="relative w-3/8">
              <WTCScene />
            </div>
          </div>
          <div className="container mx-auto py-8 px-8">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4">
                <span className="text-transparent bg-gradient-to-r from-green-600 to-fuchsia-400 bg-clip-text gradient">
                  PWR2TP Sponsors Marketplace
                </span>
              </h1>
              <h2 className="text-2xl font-semibold text-gray-400">
                Unlock Business Opportunities
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg shadow-lg">
                <div className="h-40 mb-4 rounded-md">
                  <WelcomeScene />
                </div>
                <h3 className="text-2xl font-bold mb-3">Welcome</h3>
                <p className="text-gray-400 mb-3">
                  Join us at the World Trade Center in Mexico City on September 7-8, 2024. Discover unparalleled opportunities to showcase your brand, protocol, token, project, or product in this premier expo.
                </p>
              </div>
              <div className="p-6 rounded-lg shadow-lg">
                <div className="h-40 mb-4 rounded-md">
                  <RoomScene />
                </div>
                <h3 className="text-2xl font-bold mb-3">Engage with Industry Leaders</h3>
                <p className="text-gray-400 mb-3">
                  Participate in interactive zones featuring personalized experiences, workshops, hackathons, and trading tournaments. Connect with pioneers and innovators in decentralized technologies, AI, robotics, and more.
                </p>
              </div>
              <div className="p-6 rounded-lg shadow-lg">
                <div className="h-40 mb-4 rounded-md">
                  <StandScene />
                </div>
                <h3 className="text-2xl font-bold mb-3">Exhibit and Network</h3>
                <p className="text-gray-400 mb-3">
                  Visit our booths, explore the event mapping, and browse exclusive merchandise. Network with other industry leaders, discover new partnerships, and find inspiration in our comprehensive showcase of innovation and creativity.
                </p>
              </div>
            </div>
            <div className="text-center mt-16">
              <h3 className="text-2xl font-bold mb-3">Get Ready to Elevate Your Business</h3>
              <p className="text-gray-400 mb-6">
                Whether you&apos;re an investor, tech enthusiast, artist, or entrepreneur, PWR2TP offers something for everyone. Explore all the opportunities to elevate your business and connect with the global community.
              </p>
              <div className="p-6 rounded-lg shadow-lg mb-12">
                <h3 className="text-2xl font-bold mb-3">Step-by-Step Guide</h3>
                <p className="text-gray-400 mb-3">
                  1. <strong>Explore Sections:</strong> Click on the sections below to see the various opportunities available at PWR2TP.
                </p>
                <p className="text-gray-400 mb-3">
                  2. <strong>Register to Place Orders or Get Information:</strong> Registration is required to place orders or get more information.
                </p>
                <p className="text-gray-400 mb-3">
                  3. <strong>On-Chain Registration:</strong> Connect your wallet to register.
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  We recommend generating a base smart wallet specifically for this site to ensure the safety of your personal wallet.
                </p>
                <p className="text-gray-400">
                  4. <strong>Secure Your Transactions:</strong> Use your smart wallet for all transactions and interactions on the site. Gas fees are sponsored by us.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  className="w-56 p-3 rounded-lg transition-all hover:shadow-lg gradient border-white/10 hover-gradient-amber-6 border text-center"
                  href="/booth"
                >
                  Explore Booths
                </Link>
                <Link
                  className="w-56 p-3 rounded-lg  transition-all hover:bg-white/[.06] border-white/10 hover-gradient-amber-6 border text-center"
                  href="/"
                >
                  Sponsorship Deals
                </Link>
                <Link
                  className="w-56 p-3 rounded-lg  transition-all hover:bg-white/[.06] border-white/10 hover-gradient-amber-6 border text-center"
                  href="/"
                >
                  Special Activations
                </Link>
                <Link
                  className="w-56 p-3 rounded-lg  transition-all hover:bg-white/[.06] border-white/10 hover-gradient-amber-6 border text-center"
                  href="/"
                >
                  See All
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Sponsors;
