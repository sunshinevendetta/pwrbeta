'use client';
import React from 'react';
import brandsData from '../brandsdata/data'; // Adjusted import path

const BrandsData = () => {
  return (
    <div className="container relative md:mt-24 mt-16">
      <div className="grid grid-cols-1 pb-6 text-center">
        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Brands Data</h3>
        <p className="text-slate-400 max-w-xl mx-auto">
          Explore brands to contact
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-transparent dark:bg-slate-900">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Name</th>
              <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Official Link</th>
              <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Description</th>
              <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Social Media Links</th>
              <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">Corporate Contact</th>
            </tr>
          </thead>
          <tbody>
            {brandsData.map((brand, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{brand.name}</td>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                  <a href={brand.official_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                    {brand.official_link}
                  </a>
                </td>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">{brand.description}</td>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                  {Object.keys(brand.social_media_links).map((platform, idx) => (
                    <div key={idx}>
                      <a href={brand.social_media_links[platform]} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                        {platform}
                      </a>
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                  <a href={brand.corporate_contact} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                    {brand.corporate_contact}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid black;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default BrandsData;
