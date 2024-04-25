import React from "react";
import Link from "next/link";
import Image from "next/image";
import {FiCheckCircle, MdKeyboardArrowRight} from '../assets/icons/vander'
import { TbFlagFilled } from "react-icons/tb";
import { LuNetwork } from "react-icons/lu";
import { TbWorldHeart } from "react-icons/tb";

export default function AboutOne(){
    return(
        <>
        <div className="container relative md:mt-24 mt-16">
            <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-6">
                <div className="relative overflow-hidden rounded-lg border border-amber-400/5 bg-gradient-to-tl to-amber-400/30  from-fuchsia-600/30 dark:to-amber-400/50 dark:from-fuchsia-600/50 ps-6 pt-6 lg:me-8">
                    <Image src="/images/features/1.png" width={0} height={0} sizes="100vw" style={{width:"100%", height:"auto"}}  className="ltr:rounded-tl-lg rtl:rounded-tr-lg" alt=""/>
                </div>

                <div className="">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Welcome to the <span className="bg-gradient-to-br from-amber-400 to-fuchsia-600 text-transparent bg-clip-text"> Gathering</span></h3>
                    <p className="text-slate-400 max-w-xl">+10,000 human souls, ready to set the stage for an epic shift during the event.</p>

                    <ul className="list-none text-slate-400 mt-4">
  <li className="mb-2 flex items-center">
    <TbFlagFilled className="text-amber-400 h-5 w-5 me-2" />
    Mission: Empowering through education and technology.
  </li>
  <li className="mb-2 flex items-center">
    <LuNetwork className="text-amber-400 h-5 w-5 me-2" />
    Workshops & Activities: Held at the HIR Auditorium and Mixteca 1.
  </li>
  <li className="mb-2 flex items-center">
    <TbWorldHeart className="text-amber-400 h-5 w-5 me-2" />
    We believe in decentralized technologies building effective society.
  </li>
</ul>
                    <div className="font-val mt-4">
                        <Link href="" className="hover:text-amber-400 font-medium duration-500 inline-flex items-center">Find Out More <MdKeyboardArrowRight className="ms-1 text-[20px]"/></Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}