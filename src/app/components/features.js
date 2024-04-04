import React from "react";
import Image from "next/image";

export default function Features({classlist}){
    const featuresData = [
        {
            image:'/images/features/video-1.png',
            title:"The future is OnChain.",
            desc:"Blockchain, Bitcoin, Crypto, Web3, and real-world asset tokenization are about to shake things up. Get ready to witness a digital revolution that's unlocking crazy finance, art, social movements and bringing the power back to the people."
        },
        {
            image:'/images/features/video-2.png',
            title:"Unleashing Human Evolution: Biohacking.",
            desc:"Biohacking is the cutting-edge art of optimizing your mind, body, and life. Unlock your superhuman potential with groundbreaking tools and techniques. Welcome to the era of self-directed evolution!"
        },
        
        {
            image:'/images/features/video-3.png',
            title:"Trading: Shaping the Future of Finance.",
            desc:"Discover the cutting-edge technologies and innovative strategies revolutionizing finance. From algorithmic trading to AI-driven investments, explore the democratization of financial markets and its potential to shape society. Dive into transformative trends & their impact on global economies."
        },
        {
            image:'/images/features/video-4.png',
            title:"The Revolution Will Be Automated.",
            desc:"From factories to farms, these cutting-edge technologies are transforming industries like never before. With robots and AI's that can think, learn, and adapt, we're entering a new era of efficiency and innovation. Get ready to witness the automation revolution unfold before your eyes."
            
        },
    ]
    return(
        <>
            <div className={classlist}>
                <div className="grid grid-cols-1 pb-6 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Vertical <span className="bg-gradient-to-br from-amber-400 to-fuchsia-600 text-transparent bg-clip-text">Topics</span></h3>

                    <p className="text-slate-400 max-w-xl mx-auto">Bitcoin - Crypto - Web3 - DeFi - RWA - Decentralized Social Media <br/>  Tokens - Gaming - Workshops - Speakers - Biohacking
 <br/> Art OnChain - Hackatons - Trading Tournament <br/> Artificial Intelligence - Robotics <br/> Quantum Technology </p>
                </div>

                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
                    {featuresData.map((item,index) => {
                        return(
                        <div className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-800" key={index}>
                            <div className="p-6 pb-0 relative overflow-hidden after:content-[''] after:absolute after:inset-0 after:mx-auto after:w-72 after:h-72 after:bg-gradient-to-tl after:to-amber-400 after:from-fuchsia-600 after:blur-[80px] after:rounded-full">
                                <Image src={item.image} width={0} height={0} sizes="100vw" style={{width:"100%", height:"auto"}} className="relative rounded-t-md shadow-md dark:shadow-slate-700 z-1" alt=""/>
                            </div>

                            <div className="p-6">
                                <h5 className="text-lg font-semibold">{item.title}</h5>
                                <p className="text-slate-400 mt-3">{item.desc}</p>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
