'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { FaTicketAlt, FaGift, FaEthereum } from 'react-icons/fa';
import { SiEthereum } from 'react-icons/si'; 
import ShareModal from './shareModal'; 

const CustomArrow = ({ className, style, onClick, direction }) => (
    <div
        className={`${className} custom-arrow`}
        style={{ ...style, display: 'block', [direction]: '10px', zIndex: 1 }}
        onClick={onClick}
    />
);

const ClaimSlider = ({ language }) => {
    const slides = [
        {
            icon: FaTicketAlt,
            image: '/images/blog/tradepass.webp',
            title: {
                en: 'Special Badge + Ticket',
                es: 'Medalla + Boleto Especial'
            },
            desc: {
                en: 'You are special! Enjoy a special badge and ticket for the Xverse event attendees.',
                es: '¡Eres especial! Disfruta de una medalla y boleto especial para asistentes al evento Xverse.'
            }
        },
        {
            icon: SiEthereum,
            image: '/images/2.webp',
            title: {
                en: 'Gas Fee Sponsor',
                es: 'Patrocinador de Tarifas de Gas'
            },
            desc: {
                en: 'We sponsor the transaction fee using Base Paymaster. We generate a smart wallet for you to ensure safety and cover the gas fees.',
                es: 'Patrocinamos la tarifa de transacción utilizando Base Paymaster. Generamos una billetera inteligente para ti para garantizar la seguridad y cubrir las tarifas de gas.'
            }
        },
        {
            icon: FaGift,
            image: '/images/3.webp',
            title: {
                en: 'Claim Tokens',
                es: 'Reclamar Tokens'
            },
            desc: {
                en: 'Claim 5,000 $People Tokens as a gift from us for being a part of the event.',
                es: 'Reclama 5,000 $People Tokens como un regalo de nuestra parte por asistir al evento.'
            }
        }
    ];

    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const sliderRef = useRef(null);

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <CustomArrow direction="right" />,
        prevArrow: <CustomArrow direction="left" />,
        adaptiveHeight: true,
    };

    const openShareModal = () => setIsShareModalOpen(true);
    const closeShareModal = () => setIsShareModalOpen(false);

    return (
        <div className="w-full h-full">
            <Slider ref={sliderRef} {...settings}>
                {slides.map((slide, index) => (
                    <div className="p-6" key={index}>
                        <div className="relative h-72 w-full bg-black bg-opacity-40 rounded-lg overflow-hidden">
                            <Image src={slide.image} alt={slide.title[language]} fill className="object-cover opacity-80" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center flex-col p-4">
                                <slide.icon className="h-12 w-12 text-white mb-4" />
                                <h4 className="text-xl font-bold text-white mb-2">{slide.title[language]}</h4>
                                <p className="text-white text-center">{slide.desc[language]}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
            <div className="flex justify-center mt-4">
                <button
                    className="py-2 px-5 bg-amber-400 hover:bg-amber-500 text-white rounded-md text-lg"
                    onClick={openShareModal}
                >
                    {language === 'en' ? 'Start Quest' : 'Iniciar Misión'}
                </button>
            </div>
            <ShareModal
                language={language}
                isOpen={isShareModalOpen}
                onClose={closeShareModal}
                className="fixed flex justify-center items-center w-full h-full"
            />
        </div>
    );
}

export default ClaimSlider;
