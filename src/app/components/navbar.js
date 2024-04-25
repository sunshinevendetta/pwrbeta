import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TiUserAdd } from "react-icons/ti";
import { MdVpnKey } from "react-icons/md";

export default function Navbar() {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        function activateMenu() {
            const menuItems = document.getElementsByClassName("sub-menu-item");
            let matchingMenuItem = null;
            for (let idx = 0; idx < menuItems.length; idx++) {
                if (menuItems[idx].href === window.location.href) {
                    matchingMenuItem = menuItems[idx];
                }
            }

            if (matchingMenuItem) {
                matchingMenuItem.classList.add('active');
                const immediateParent = getClosest(matchingMenuItem, 'li');
                if (immediateParent) {
                    immediateParent.classList.add('active');
                }
                
                let parent = getClosest(immediateParent, '.child-menu-item');
                if (parent) {
                    parent.classList.add('active');
                }

                parent = getClosest(parent || immediateParent, '.parent-menu-item');
                if (parent) {
                    parent.classList.add('active');
                    const parentMenuitem = parent.querySelector('.menu-item');
                    if (parentMenuitem) {
                        parentMenuitem.classList.add('active');
                    }

                    const parentOfParent = getClosest(parent, '.parent-parent-menu-item');
                    if (parentOfParent) {
                        parentOfParent.classList.add('active');
                    }
                } else {
                    const parentOfParent = getClosest(matchingMenuItem, '.parent-parent-menu-item');
                    if (parentOfParent) {
                        parentOfParent.classList.add('active');
                    }
                }
            }
        }

        activateMenu();

        function onScroll() {
            setScroll(window.scrollY > 50);
        }

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const navigation = document.getElementById("navigation");
        if (navigation) {
            const anchorArray = Array.from(navigation.getElementsByTagName("a"));
            anchorArray.forEach(element => {
                element.addEventListener('click', (elem) => {
                    const target = elem.target.getAttribute("href");
                    if (target && target !== "#") {
                        const nextElementSibling = elem.target.nextElementSibling;
                        if (nextElementSibling && nextElementSibling.classList.contains('submenu-arrow')) {
                            const submenu = nextElementSibling.nextElementSibling;
                            submenu.classList.toggle('open');
                        }
                    }
                });
            });
        }
    }, []);

    // Helper function to get the closest matching element
    function getClosest(elem, selector) {
        for (; elem && elem !== document; elem = elem.parentNode) {
            if (elem.matches(selector)) return elem;
        }
        return null;
    }

    return (
        <>
            <nav id="topnav" className={`${scroll ? "nav-sticky" : ""} defaultscroll is-sticky`}>
                <div className="container">
                <Link className="logo" href="/">
                    <Image src="/images/logo-dark.png" width={128} height={24} className="h-6 inline-block dark:hidden" alt=""/>
                    <Image src="/images/logo-light.png" width={128} height={24} className="h-6 hidden dark:inline-block" alt=""/>
                </Link>
               
                <div className="menu-extras">
                    <div className="menu-item">
                        <Link href="#" className={`${toggleMenu ? 'open' : ''} navbar-toggle`}  onClick={()=>setToggleMenu(!toggleMenu)}>
                            <div className="lines">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </Link>
                    </div>
                </div>
                <ul className="buy-button list-none mb-0">
  <li className="hidden md:inline ps-1 mb-0">
    <Link href="/login">
      <span className="inline-flex items-center justify-center py-[4px] px-4 font-arcade tracking-wider align-middle duration-500 text-sm text-center rounded bg-transparent hover:bg-amber-400 border border-transparent hover:border-amber-400 text-amber-400 hover:text-white font-semibold">
        <MdVpnKey className="mr-1 text-white" />
        <span className="hidden md:inline"></span>
      </span>
    </Link>
  </li>

  <li className="hidden md:inline ps-1 mb-0">
    <Link href="/signup" target="_blank" className="inline-flex items-center justify-center py-[4px] px-4 font-arcade tracking-wider align-middle duration-500 text-sm text-center rounded bg-transparent hover:bg-amber-500 border border-transparent hover:border-amber-500 text-white font-semibold">
      <TiUserAdd className="mr-1 text-white" />
      <span className="hidden md:inline"></span>
    </Link>
  </li>
</ul>

                <div id="navigation" className= {`${toggleMenu ? 'block' : ''}`}>
                    <ul className="font-val navigation-menu">
                    <li><Link href="/" className="parent-menu-item">Home</Link></li>
                    <li className="has-submenu parent-parent-menu-item">
                            <Link href="#">Event</Link><span className="menu-arrow"></span>
                            <ul className="submenu">
                                <li><Link href="/aboutus" className="sub-menu-item">Info</Link></li>
                        
                                <li className="has-submenu parent-menu-item"><Link href="#"> News </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                        <li><Link href="/blog" className="sub-menu-item"> Blogs</Link></li>
                                        <li><Link href="/blog-detail" className="sub-menu-item"> Blog Detail</Link></li>
                                    </ul> 
                                </li>

                                <li className="has-submenu parent-menu-item"><Link href="#"> Hackathon </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                    <li><Link href="/blog-detail/1" className="sub-menu-item"> Info</Link></li>
                                        <li><Link href="/login" className="sub-menu-item"> Login</Link></li>
                                    </ul> 
                                </li>
                                <li className="has-submenu parent-menu-item"><Link href="#"> Trading Arena </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                    <li><Link href="/blog-detail/2" className="sub-menu-item"> Info</Link></li>
                                        <li><Link href="/login" className="sub-menu-item"> Login</Link></li>
                                    </ul> 
                                </li>
                                <li className="has-submenu parent-menu-item"><Link href="#"> Show your ART </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                        <li><Link href="/blog-detail/3" className="sub-menu-item"> Info</Link></li>
                                        <li><Link href="/login" className="sub-menu-item"> Login</Link></li>
                                    </ul> 
                                </li>
                                <li className="has-submenu parent-menu-item"><Link href="#"> Privacy Terms </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                        <li><Link href="/terms" className="sub-menu-item">Terms of Services</Link></li>
                                        <li><Link href="/privacy" className="sub-menu-item">Privacy Policy</Link></li>
                                    </ul>  
                                </li>
                        <li><Link href="/helpcenter" className="sub-menu-item">Helpcenter</Link></li>
                            </ul>
                        </li>
                        <li><Link href="/pricing" className="sub-menu-item">Tickets </Link></li>
                
                        
                        <li><Link href="/contact" className="sub-menu-item">Sponsors</Link></li>
                
                        <li><Link href="/contact" className="sub-menu-item">Contact</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
        </>
    )
}