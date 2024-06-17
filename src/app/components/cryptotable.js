'use client';
import React from 'react';
import cryptoData from '../tokendata/data'; // Adjusted import path

const CryptoTable = () => {
  return (
    <div className="container relative md:mt-24 mt-16">
      <div className="grid grid-cols-1 pb-6 text-center">
        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Cryptocurrency Data</h3>
        <p className="text-slate-400 max-w-xl mx-auto">
          Explore the details of various cryptocurrencies.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-transparent dark:bg-slate-900">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Name</th>
              <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">ID</th>
              <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Website</th>
              <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Social Media Links</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((crypto, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{crypto.Name}</td>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{crypto.ID}</td>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                  {crypto.Website.split(', ').map((link, idx) => (
                    <div key={idx}>
                      <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                        {link}
                      </a>
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                  {crypto['Social Media Links'].split(', ').map((link, idx) => (
                    <div key={idx}>
                      <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                        {link}
                      </a>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid black; padding: 8px; text-align: left; }
        th { background-color: transparent; }
      `}</style>
    </div>
  );
};

export default CryptoTable;
