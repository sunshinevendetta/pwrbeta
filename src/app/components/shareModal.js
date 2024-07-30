'use client';
import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
import { RiTwitterXLine } from '../assets/icons/vander';
import ExtraTokenModal from './extraToken';

const ShareModal = ({ isOpen, onClose, className = '', language }) => {
    const [userName, setUserName] = useState('');
    const [friendEmail, setFriendEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [timer, setTimer] = useState(null); // Initialize as null to start without a timer
    const [isExtraTokenModalOpen, setIsExtraTokenModalOpen] = useState(false);

    useEffect(() => {
        let countdown;
        if (timer !== null) {
            countdown = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer > 0) {
                        return prevTimer - 1;
                    } else {
                        clearInterval(countdown);
                        return 0;
                    }
                });
            }, 1000);
        }
        return () => clearInterval(countdown);
    }, [timer]);

    useEffect(() => {
        if (isEmailSent || timer === 0) {
            setIsExtraTokenModalOpen(true);
        }
    }, [isEmailSent, timer]);

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    };

    const handleFriendEmailChange = (e) => {
        setFriendEmail(e.target.value);
    };

    const handleSendEmail = async () => {
        try {
            const res = await fetch('/api/share', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: userName,
                    email: friendEmail,
                    subject: language === 'en' ? 'Join me at the Power 2 The People Event!' : '¡Únete a mí en el evento Power 2 The People!',
                    message: language === 'en'
                        ? `Hi, join me at the Power 2 The People Event and claim your special edition ticket from the Xverse event! Don't miss out on this unique opportunity. Claim your ticket here: https://pwr2tp.mx/road2`
                        : `Hola, únete a mí en el evento Power 2 The People y reclama tu boleto de edición especial del evento Xverse! No te pierdas esta oportunidad única. Reclama tu boleto aquí: https://pwr2tp.mx/road2`
                })
            });

            if (res.ok) {
                setMessage(language === 'en' ? 'Email sent successfully!' : '¡Correo enviado con éxito!');
                setIsEmailSent(true);
            } else {
                const errorData = await res.json();
                setMessage(language === 'en' ? `Error sending email: ${errorData.message}` : `Error al enviar el correo: ${errorData.message}`);
            }
        } catch (error) {
            setMessage(language === 'en' ? `Error sending email: ${error.message}` : `Error al enviar el correo: ${error.message}`);
        }
    };

    const shareText = language === 'en'
        ? `Join me at the Power 2 The People Event and claim your special edition ticket from the Xverse event! Don't miss out on this unique opportunity. Claim your ticket here: https://pwr2tp.mx/road2`
        : `Únete a mí en el evento Power 2 The People y reclama tu boleto de edición especial del evento Xverse! No te pierdas esta oportunidad única. Reclama tu boleto aquí: https://pwr2tp.mx/road2`;

    const handleSocialShare = (platform) => {
        setTimer(15); // Start 15 seconds timer for social share
        if (platform === 'facebook') {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=https://pwr2tp.mx/road2&quote=${encodeURIComponent(shareText)}`, '_blank');
        } else if (platform === 'twitter') {
            window.open(`https://twitter.com/share?url=https://pwr2tp.mx/road2&text=${encodeURIComponent(shareText)}`, '_blank');
        } else if (platform === 'linkedin') {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=https://pwr2tp.mx/road2&title=${encodeURIComponent(shareText)}`, '_blank');
        } else if (platform === 'whatsapp') {
            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
        } else if (platform === 'telegram') {
            window.open(`https://telegram.me/share/url?url=https://pwr2tp.mx/road2&text=${encodeURIComponent(shareText)}`, '_blank');
        }
    };

    const handleProceed = () => {
        window.open('https://xverse.pwr2tp.mx', '_blank'); // Redirect to the specified domain
        onClose();
    };

    return (
        <div className={`modal-overlay ${isOpen ? 'block' : 'hidden'} ${className}`}>
            <div className="modal glass-card">
                <button className="modal-close" onClick={onClose}>×</button>
                <div className="p-6 rounded-lg text-white">
                    <h2 className="text-md font-bold mb-4">{language === 'en' ? 'Share and get 5000 $PEOPLE Tokens' : 'Comparte y obtén 5000 $PEOPLE Tokens'}</h2>
                    <div className="flex justify-around mb-4">
                        <button onClick={() => handleSocialShare('facebook')} className="text-white">
                            <FaFacebookF className="h-8 w-8" />
                        </button>
                        <button onClick={() => handleSocialShare('twitter')} className="text-white">
                            <RiTwitterXLine className="h-8 w-8" />
                        </button>
                        <button onClick={() => handleSocialShare('linkedin')} className="text-white">
                            <FaLinkedinIn className="h-8 w-8" />
                        </button>
                        <button onClick={() => handleSocialShare('whatsapp')} className="text-white">
                            <FaWhatsapp className="h-8 w-8" />
                        </button>
                        <button onClick={() => handleSocialShare('telegram')} className="text-white">
                            <FaTelegramPlane className="h-8 w-8" />
                        </button>
                    </div>
                    <div className="flex flex-col items-center">
                        <input
                            type="text"
                            placeholder={language === 'en' ? "Your Name" : "Tu Nombre"}
                            value={userName}
                            onChange={handleUserNameChange}
                            className="py-2 px-4 mb-4 rounded bg-white text-black"
                        />
                        <input
                            type="email"
                            placeholder={language === 'en' ? "Friend's Email" : "Correo de tu Amigo"}
                            value={friendEmail}
                            onChange={handleFriendEmailChange}
                            className="py-2 px-4 mb-4 rounded bg-white text-black"
                        />
                        <div className="flex space-x-4 mb-4">
                            <button className="py-2 px-5 bg-amber-400 hover:bg-amber-500 text-white rounded-md text-lg" onClick={handleSendEmail}>
                                {language === 'en' ? 'Send Email' : 'Enviar Correo'}
                            </button>
                            {isEmailSent && (
                                <button className="py-2 px-5 bg-green-500 hover:bg-green-600 text-white rounded-md text-lg" onClick={handleProceed}>
                                    {language === 'en' ? 'Proceed' : 'Proceder'}
                                </button>
                            )}
                            {!isEmailSent && timer === 0 && (
                                <button className="py-2 px-5 bg-green-500 hover:bg-green-600 text-white rounded-md text-lg" onClick={handleProceed}>
                                    {language === 'en' ? 'Proceed' : 'Proceder'}
                                </button>
                            )}
                        </div>
                        {message && <p className="mt-4 text-sm">{message}</p>}
                        {!isEmailSent && timer > 0 && (
                            <p className="mt-4 text-xs">{language === 'en' ? `Please wait ${timer} to claim extra tokens.` : `Espera ${timer} para reclamar tokens extra.`}</p>
                        )}
                    </div>
                </div>

                <ExtraTokenModal
                    language={language}
                    isOpen={isExtraTokenModalOpen}
                    onClose={() => setIsExtraTokenModalOpen(false)}
                />
            </div>
        </div>
    );
};

export default ShareModal;
