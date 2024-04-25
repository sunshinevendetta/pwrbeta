'use client'
import React,{useEffect} from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const NavLight = dynamic(()=>import('../components/navlight'))
const Footer = dynamic(() => import('../components/footer'))
const AboutThree = dynamic(() => import('../components/aboutThree'))



import {FiFileText, FiVideo, FiPauseCircle, FiCamera, FiLayout,FiMessageCircle, FiHexagon} from '../assets/icons/vander'

export default function Services() {
    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    const casesData = [
        {
            icon:FiFileText,
            title:'',
            desc:''
        },
        {
            icon:FiVideo,
            title:'',
            desc:''
        },
        {
            icon:FiPauseCircle,
            title:'',
            desc:''
        },
        {
            icon:FiCamera,
            title:'',
            desc:''
        },
        {
            icon:FiLayout,
            title:'',
            desc:''
        },
        {
            icon:FiMessageCircle,
            title:'',
            desc:''
        },
    ]
    return(
        <>
        <NavLight/>
        <div className="relative">
            <div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden z-1 text-white dark:text-slate-900">
                <svg className="w-full h-auto scale-[2.0] origin-top" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                </svg>
            </div>
        </div>
        <section className="relative md:py-24 py-16">
        
            
            <div className="container relative md:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-6 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Title</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">Description</p>
                </div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
                    {casesData.map((item,index)=>{
                        const Icon = item.icon
                        return(
                            <div className="p-6 rounded-md shadow dark:shadow-gray-800 group bg-white dark:bg-slate-900 hover:bg-amber-400 dark:hover:bg-amber-500 duration-500" key={index}>
                                <div className="relative overflow-hidden text-transparent -m-3">
                                    <FiHexagon className="h-24 w-24 fill-amber-400/10 group-hover:fill-amber-400/20 duration-500"/>
                                    <div className="absolute top-2/4 -translate-y-2/4 start-9 text-amber-400 rounded-xl text-2xl flex align-middle justify-center items-center">
                                        <Icon/>
                                    </div>
                                </div>
        
                                <div className="content mt-6">
                                    <Link href="" className="font-semibold text-xl hover:text-amber-400">{item.title}</Link>
                                    <p className="text-slate-400 mt-3">{item.desc}</p>
                                    <div className="mt-4">
                                        <Link href="" className="hover:text-amber-400 font-medium duration-500">Register <i className="mdi mdi-arrow-right align-middle"></i></Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <AboutThree/>
        </section>
        <Footer/>
        </>
    )
}