import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const ToggleButton = dynamic(() => import('./toggleButton'));

export default function AboutTwo(){
    return(
        <>
            <div className="container relative md:mt-24 mt-16">
                <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-6">
                    {/* Power Frens Allies and Sponsors Logos Section */}
                    <div className="relative order-1 md:order-2">
                        <div className="relative overflow-hidden rounded-lg border border-amber-400/5 bg-gradient-to-tl to-amber-400/30 from-fuchsia-600/30 dark:to-amber-400/50 dark:from-fuchsia-600/50 pe-6 pt-6 lg:ms-8">
                            <Image src="/images/blog/1.webp" width={0} height={0} sizes="100vw" style={{width:"100%", height:"auto"}} className="ltr rtl" alt="Power Fren 1"/>
                            <Image src="/images/blog/2.webp" width={0} height={0} sizes="100vw" style={{width:"100%", height:"auto"}} className="ltr rtl" alt="Power Fren 2"/>
                            <Image src="/images/blog/3.webp" width={0} height={0} sizes="100vw" style={{width:"100%", height:"auto"}} className="ltr rtl" alt="Power Fren 3"/>
                            {/* Add more logos as needed */}
                        </div>
                    </div>

                    {/* Exhibitors Logos Section */}
                    <div className="order-2 md:order-1">
                    

                      

                        <div className="mt-8">
                            <h4 className="mb-4 md:text-2xl md:leading-normal text-xl leading-normal font-semibold">Exhibitors</h4>
                            <div className="flex flex-wrap gap-4">
                                <Link href="#"><Image src="/images/blog/1.webp" width={100} height={100} alt="Exhibitor 1"/></Link>
                                <Link href="#"><Image src="/images/blog/2.webp" width={100} height={100} alt="Exhibitor 2"/></Link>
                                <Link href="#"><Image src="/images/blog/3.webp" width={100} height={100} alt="Exhibitor 3"/></Link>
                                {/* Add more exhibitor logos as needed */}
                            </div>
                        </div>
                        <div className="font-sans mt-4">
                            <ToggleButton />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
