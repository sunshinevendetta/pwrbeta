import React from "react";
import Link from "next/link";
import Image from "next/image";

import {FaUserTie, FaUsersCog} from "react-icons/fa";

export default function AboutThree(){
    const countryData = [
        {
            name:"Español",
            image:"/images/flags/mex.png"
        },
        {
            name:"Hindi",
            image:"/images/flags/india.png"
        },
        {
            name:"中国人",
            image:"/images/flags/china.png"
        },
        {
            name:"Deutsche",
            image:"/images/flags/germany.png"
        },
        {
            name:"عربي",
            image:"/images/flags/uae.png"
        },
    ]
    return(
        <>
        <div className="container relative md:mt-24 mt-16">
                <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-6">
                    <div className="relative overflow-hidden p-6 bg-white dark:bg-slate-900 rounded-xl shadow dark:shadow-slate-800">
                        <div className="relative overflow-hidden rounded-lg shadow-md dark:shadow-gray-800">
                            <div className="relative">
                                <video autoPlay loop muted playsInline style={{ width: '100%', height: 'auto' }}>
                                    <source src="/images/cdmx.mp4" type="video/mp4"/>
                                </video>
                                <Link href="" className="absolute top-2 left-2 rounded-full p-0.1 bg-white dark:bg-slate-900 shadow dark:shadow-slate-800 z-10"><Image src="/images/flags/usa.png" width={28} height={28} className="h-7 w-7 rounded-full" alt=""/></Link>
                            </div>
                        </div>
                        
                        <div className="mt-6">
                            {countryData.map((item,index)=>{
                                return(
                                    <Link href="" className="py-[6px] px-2 inline-flex items-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400/5 hover:bg-amber-400 border border-amber-400/10 hover:border-amber-400 text-amber-400 hover:text-white font-semibold m-0.5" key={index}><Image src={item.image} width={20} height={20} className="h-5 w-5 me-1" alt="" /> {item.name}</Link>
                                )
                            })}
                        </div>
                    </div>

                    <div className="">
                        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">September 7-8, 2024 <br/>Mexico City</h3>
                        <p className="text-slate-400 max-w-xl">Colonia Nápoles a prime territory nestled next to Mexico City most vibrant districts - Roma, Condesa, Polanco, where exclusivity meets convenience.</p>
                        <h1 className="mb-4 md:text-1xl md:leading-normal text-1xl leading-normal font-semibold"><br/>The Arena</h1>
                        <ul className="list-none text-slate-400 mt-4">
                        <li className="mb-2 flex items-center"><FaUserTie className="text-amber-400 h-10 w-10 me-2"/> World Trade Center: <br/> Iconic landmark in Latin America, playing a pivotal role in shaping the narrative for business titans.</li> 
                        <li className="mb-2 flex items-center"><FaUsersCog className="text-amber-400 h-10 w-10 me-2"/> Operational year-round: <br/> The hub for trade fairs, exhibitions, congresses, concerts, private events, and much more.</li>
                        </ul>

                        <div className="font-val mt-4">
                            <Link href="/aboutus" className="bg-red-500 font-arcade hover:bg-green-600 hover:text-amber-400 font-medium duration-500 text-white font-bold py-2 px-4 rounded">Join Now <i className="mdi mdi-chevron-right text-[20px] align-middle"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
