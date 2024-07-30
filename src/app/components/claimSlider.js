'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { FaTicketAlt, FaGift, FaRegSmile, FaEthereum } from 'react-icons/fa';
import { SiEthereum } from 'react-icons/si'; 
import ShareModal from './shareModal'; 

const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow`}
            style={{ ...style, display: 'block', right: '10px' }}
            onClick={onClick}
        />
    );
}

const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow`}
            style={{ ...style, display: 'block', left: '10px', zIndex: 1 }}
            onClick={onClick}
        />
    );
}

const ClaimSlider = ({ language }) => {
    const steps = [
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
        },
        {
            icon: FaRegSmile,
            image: '/images/4.webp',
            title: {
                en: 'Enjoy the Event',
                es: 'Disfruta del Evento'
            },
            desc: {
                en: 'Enjoy the event and feel special with your unique medals and tokens!',
                es: '¡Disfruta del evento y siéntete especial con tus medallas y tokens únicos!'
            }
        },
        {
            icon: FaEthereum,
            image: '/images/5.webp',
            title: {
                en: 'Connect and Share',
                es: 'Conecta y Comparte'
            },
            desc: {
                en: 'Share it with friends or generate your profile.',
                es: 'Comparte con amigos o generar tu perfil.'
            }
        }
    ];

    const [slideIndex, setSlideIndex] = useState(0);
    const [showFinalStep, setShowFinalStep] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10); // Set the initial time (in seconds)
    const [buttonText, setButtonText] = useState('');
    const sliderRef = useRef(null);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    useEffect(() => {
        setButtonText(language === 'en' ? 'Invite Frens!' : 'Invitar Amix');
    }, [language]);

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (current) => setSlideIndex(current),
        adaptiveHeight: true,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />
    };

    const handleConnect = () => {
        setShowFinalStep(true);
        sliderRef.current.slickGoTo(steps.length);
    };

    const openShareModal = () => {
        setIsShareModalOpen(true);
    };

    const closeShareModal = () => {
        setIsShareModalOpen(false);
    };

    const handleInvite = () => {
        window.open('https://xverse.pwr2tp.mx', '_blank');
    };

    return (
        <div className="w-full h-full">
            <Slider ref={sliderRef} {...settings}>
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                        <div className="p-6" key={index}>
                            <div className="relative h-72 w-full bg-black bg-opacity-40 rounded-lg overflow-hidden">
                                <Image src={step.image} alt={step.title[language]} fill className="object-cover opacity-80" />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center flex-col p-4">
                                    <Icon className="h-12 w-12 text-white mb-4" />
                                    <h4 className="text-xl font-bold text-white mb-2">{step.title[language]}</h4>
                                    <p className="text-white text-center">{step.desc[language]}</p>
                                    {index === steps.length - 1 && (
                                        <button
                                            className="mt-4 py-2 px-5 bg-amber-400 hover:bg-amber-500 text-white rounded-md text-lg"
                                            onClick={handleConnect}
                                        >
                                            {buttonText}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
                {showFinalStep && (
                    <div className="p-6">
                        <div className="relative h-72 w-full bg-black bg-opacity-40 rounded-lg overflow-hidden">
                            <Image src="/images/6.webp" alt={language === 'en' ? 'Share with Friends' : 'Comparte con Amigos'} fill className="object-cover opacity-80" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center flex-col p-4">
                                <FaGift className="h-12 w-12 text-white mb-4" />
                                <h4 className="text-xl font-bold text-white mb-2">{language === 'en' ? 'Share with Friends' : 'Comparte con Amigos'}</h4>
                                <p className="text-white text-center mb-4">{language === 'en' ? 'Share your special experience with friends or generate your profile.' : 'Comparte tu experiencia especial con amigos o genera tu perfil.'}</p>
                                <div className="flex flex-col items-center">
                                    <button className="py-2 px-5 bg-amber-400 hover:bg-amber-500 text-white rounded-md text-lg mb-2" onClick={openShareModal}>
                                        {language === 'en' ? 'Send to a Friend' : 'Enviar a un Amigo'}
                                    </button>
                                    <button className="py-2 px-5 bg-amber-400 hover:bg-amber-500 text-white rounded-md text-lg" onClick={handleInvite}>
                                        {buttonText}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Slider>
            <div className="flex justify-center mt-4">
                <button
                    className="py-2 px-5 bg-amber-400 hover:bg-amber-500 text-white rounded-md text-lg"
                    onClick={() => sliderRef.current.slickNext()}
                >
                    {language === 'en' ? 'Next' : 'Siguiente'}
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
