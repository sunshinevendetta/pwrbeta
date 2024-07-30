'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Back from "../bg/page";
import Navbar from "../components/navbar"; // Adjust the import path as necessary
import ClaimSlider from "../components/ClaimSlider"; // Adjust the import path as necessary

export default function ResetPassword() {
    const [language, setLanguage] = useState('en');
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            const lang = urlParams.get('lang');
            if (lang) {
                setLanguage(lang);
            }
        }
    }, []);

    const handleLanguageChange = (lang) => {
        const currentPath = window.location.pathname;
        setLanguage(lang);
        window.location.href = `${currentPath}?lang=${lang}`; // Reload the current page with the language parameter
    };

    return (
        <>
            <Navbar />
            <section className="relative h-screen flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <Back />
                </div>
                <div className="absolute inset-0 bg-slate-950/20 z-10"></div>
                <div className="relative z-20 flex items-center justify-center">
                    <div className="glass-card">
                        <div className="flex justify-center mb-4">
                            <button onClick={() => handleLanguageChange('en')} className="flex items-center mr-4">
                                <img src="/images/flags/usa.webp" alt="English" className="h-6 w-6 mr-2" />
                                English
                            </button>
                            <button onClick={() => handleLanguageChange('es')} className="flex items-center">
                                <img src="/images/flags/mex.webp" alt="Español" className="h-6 w-6 mr-2" />
                                Español
                            </button>
                        </div>
                        <ClaimSlider language={language} />
                    </div>
                </div>
            </section>
        </>
    );
}
