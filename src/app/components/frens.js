import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Marquee from "react-fast-marquee";


export default function AboutTwo() {
    const logos = [
        { src: "/images/frens/nerd.webp", alt: "Nerd Conf", link: "https://www.nerdconf.com/" },
        { src: "/images/frens/espacio.webp", alt: "Espacio Cripto", link: "https://www.espaciocripto.io/" },
        { src: "/images/frens/logow.webp", alt: "Hyperbass", link: "https://hyperbass.xyz" },
        { src: "/images/frens/hola.webp", alt: "Hola Wave", link: "https://holawave.store/" },
        { src: "/images/frens/estacion.webp", alt: "Estacion Conciencia", link: "https://www.instagram.com/estacionconciencia/" },
        { src: "/images/frens/holaradio.webp", alt: "Hola Wave Radio", link: "https://www.instagram.com/holawave.radio/" },
        { src: "/images/frens/exhale.webp", alt: "Exhale Core", link: "https://www.instagram.com/exhale_core/" },
        // Add more logos as needed
    ];

    return (
        <>
            <div className="custom-container relative md:mt-24 mt-16">
                <div className="flex flex-col items-center gap-10">
                    {/* Power Frens Logos Section */}
                    <div className="w-full">
                        <div className="mt-8 text-center">
                            <h4 className="mb-8 md:text-4xl text-3xl font-bold text-gray-800">Power Frens</h4>
                            <div className="glow-border my-4"></div>
                            <Marquee gradient={false} speed={40} pauseOnHover={true} loop={0} className="marquee-container py-4">
                                {[...logos, ...logos].map((logo, index) => (
                                    <Link key={index} href={logo.link} target="_blank" rel="noopener noreferrer" className="marquee-item">
                                        <Image src={logo.src} width={120} height={120} alt={logo.alt} className="logo-image" />
                                    </Link>
                                ))}
                            </Marquee>
                            <div className="glow-border my-4"></div>
                        </div>
                        <div className="mt-8 text-center">
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
