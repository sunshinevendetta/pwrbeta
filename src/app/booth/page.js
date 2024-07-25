'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const NavLight = dynamic(() => import('../components/navlight'), { ssr: false });
const Footer = dynamic(() => import('../components/footer'), { ssr: false });
const ExpoFloor = dynamic(() => import('../components/expoFloor'), { ssr: false });

const teamMembers = [
  'Alessia', 'Anana', 'Carlos', 'Eduardo', 'Elosegui', 'Israel', 'Javier', 'Joselo', 
  'NerdConf', 'Sunshine Vendetta','Paco', 'Porras', 'Revilla', 'Ricardo', 'Sebastian', 'No Team Member'
].sort();

const BoothPage = () => {
  const [quoteDetails, setQuoteDetails] = useState({ size: '', price: '' });
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');
  const [selectedTeamMember, setSelectedTeamMember] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  const updateQuoteDetails = (details) => {
    setQuoteDetails(details);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTeamMember) {
      setMessage('Please select a team member.');
      return;
    }
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        subject: `Quote Request from ${formData.name}`,
        message: `Quote Details:\n\nSize: ${quoteDetails.size}\nPrice: ${quoteDetails.price}\nTeam Member: ${selectedTeamMember}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`,
      }),
    });
    const result = await response.json();
    if (response.ok) {
      setMessage('Quote sent successfully!');
    } else {
      setMessage('Error sending quote');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <NavLight />
      <section className="relative md:py-44 py-32 bg-no-repeat bg-bottom bg-cover" style={{ backgroundImage: "url('/images/bg/bg-pages.webp')" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-slate-900/70"></div>
        <div className="container relative">
          <div className="grid grid-cols-1 text-center mt-6">
            <div>
              <h5 className="md:text-4xl text-3xl md:leading-normal leading-normal tracking-wider font-semibold text-white mb-0">Interactive Expo Floor</h5>
            </div>
            <ul className="tracking-[0.5px] mb-0 inline-block mt-5">
              <li className="inline-block capitalize text-[15px] font-medium duration-500 ease-in-out text-white/50 hover:text-white">
                <Link href="/">Home</Link>
              </li>
              <li className="inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180">
                <i className="mdi mdi-chevron-right"></i>
              </li>
              <li className="inline-block capitalize text-[15px] font-medium duration-500 ease-in-out text-white" aria-current="page">Sponsors</li>
            </ul>
          </div>
        </div>
      </section>
      <div className="relative">
        <div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden z-1 text-white dark:text-slate-900">
          <svg className="w-full h-auto scale-[2.0] origin-top" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">Please Select Your Booth Size</h1>
        <div className=" w-3/4 mx-auto flex flex-col items-center justify-center mb-8">
          <ExpoFloor updateQuoteDetails={updateQuoteDetails} />
        </div>
        {quoteDetails.size && (
          <div className="text-center text-white">
            <h2 className="text-xl font-semibold mb-2">Selected Booth Size: {quoteDetails.size}</h2>
            <p className="mb-4">Price: {quoteDetails.price}</p>
            <form onSubmit={handleSubmit} className="mt-4 max-w-md mx-auto p-6 bg-transparent">
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="border border-green-500 p-3 mb-4 w-full rounded bg-black text-white placeholder-green-500"
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="border border-green-500 p-3 mb-4 w-full rounded bg-black text-white placeholder-green-500"
                onChange={handleInputChange}
              />
              <p className="text-lg font-semibold mb-2">Please select the team member who contacted you:</p>
              <select
                value={selectedTeamMember}
                onChange={(e) => setSelectedTeamMember(e.target.value)}
                className="border border-green-500 p-3 mb-4 w-full rounded bg-black text-white"
              >
                <option value="" disabled>Select a team member</option>
                {teamMembers.map((member) => (
                  <option key={member} value={member}>{member}</option>
                ))}
              </select>
              <button type="submit" className="bg-green-500 hover:bg-purple-500 text-white p-3 w-full rounded transition-all duration-200">
                Send Quote
              </button>
            </form>
            {message && <p className="mt-4 text-center text-green-500">{message}</p>}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BoothPage;
