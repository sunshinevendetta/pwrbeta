'use client';
import React from 'react';
import { FaGift } from 'react-icons/fa';

const ExtraTokenModal = ({ isOpen, onClose, language }) => {
    if (!isOpen) return null;

    const handleClaimTokens = () => {
        window.open('https://ordinaleslatam.pwr2tp.mx', '_blank');
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="modal-close" onClick={onClose}>×</button>
                <div className="flex flex-col items-center">
                    <FaGift className="h-12 w-12 text-white mb-4" />
                    <h4 className="text-xl font-bold text-white mb-2">{language === 'en' ? 'Claim Extra Tokens' : 'Reclama Tokens Extra'}</h4>
                    <p className="text-white text-center mb-4">{language === 'en' ? 'Thank you for inviting your friend! Claim an additional 5000 PEOPLE tokens as a reward.' : '¡Gracias por invitar a tu amigo! Reclama 5000 PEOPLE tokens adicionales como recompensa.'}</p>
                    <button className="py-2 px-5 bg-amber-400 hover:bg-amber-500 text-white rounded-md text-lg" onClick={handleClaimTokens}>
                        {language === 'en' ? 'Claim 5,000 $PEOPLE Tokens' : 'Reclama 5,000 $PEOPLE Tokens'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExtraTokenModal;
