import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TiUserAdd } from "react-icons/ti";
import { MdVpnKey } from "react-icons/md";

export default function Navbar(){
    const [toggleMenu, setToggleMenu] = useState(false)
    const [scroll, setScroll] = useState(false);

    useEffect(()=>{
        activateMenu()
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 50);
          });
    },[])

     /*********************/
 /*    Menu Active    */
 /*********************/
 function getClosest(elem, selector) {
 
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function (s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }

    for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.matches(selector)) return elem;
    }
    return null;

};

function activateMenu() {
    var menuItems = document.getElementsByClassName("sub-menu-item");
    if (menuItems) {

        var matchingMenuItem = null;
        for (var idx = 0; idx < menuItems.length; idx++) {
            if (menuItems[idx].href === window.location.href) {
                matchingMenuItem = menuItems[idx];
            }
        }

        if (matchingMenuItem) {
            matchingMenuItem.classList.add('active');
         
         
            var immediateParent = getClosest(matchingMenuItem, 'li');
      
            if (immediateParent) {
                immediateParent.classList.add('active');
            }
            
            var parent = getClosest(immediateParent, '.child-menu-item');
            if(parent){
                parent.classList.add('active');
            }

            var parent = getClosest(parent || immediateParent , '.parent-menu-item');
        
            if (parent) {
                parent.classList.add('active');

                var parentMenuitem = parent.querySelector('.menu-item');
                if (parentMenuitem) {
                    parentMenuitem.classList.add('active');
                }

                var parentOfParent = getClosest(parent, '.parent-parent-menu-item');
                if (parentOfParent) {
                    parentOfParent.classList.add('active');
                }
            } else {
                var parentOfParent = getClosest(matchingMenuItem, '.parent-parent-menu-item');
                if (parentOfParent) {
                    parentOfParent.classList.add('active');
                }
            }
        }
    }
}
if (typeof window !== "undefined"){
    if (document.getElementById("navigation")) {
        const anchorArray = Array.from(document.getElementById("navigation").getElementsByTagName("a"));
        anchorArray.forEach(element => {
            element.addEventListener('click', (elem) => {
                const target = elem.target.getAttribute("href")
                if (target !== "") {
                    if (elem.target.nextElementSibling) {
                        var submenu = elem.target.nextElementSibling.nextElementSibling;
                        submenu.classList.toggle('open');
                    }
                }
            })
        });
    }
}

    return(
        <>
        <nav id="topnav" className={`${scroll ? "nav-sticky" : "" } defaultscroll is-sticky`}>
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
                <li className=" inline mb-0">

<Link href="/login" target="_blank" className="inline-flex items-center justify-center py-[4px] px-4 font-arcade tracking-wider align-middle duration-400 text-sm text-center rounded bg-transparent hover:bg-amber-400 text-white font-semibold">
  <MdVpnKey className="mr-1 text-white" />
  <span className=" md:inline font-arcade "></span>
</Link>

<Link href="/signup" target="_blank" className="inline-flex items-center justify-center py-[4px] px-4 font-arcade tracking-wider align-middle duration-500 text-sm text-center rounded bg-transparent hover:bg-amber-500 text-white font-semibold">
  <TiUserAdd className="mr-1 text-white" />
  <span className=" md:inline font-arcade text-white"></span>
</Link>
</li>
                </ul>
                <div id="navigation" className={`${toggleMenu ? 'block' : ''}`}>
                    <ul className="navigation-menu">
                        <li className="has-submenu parent-menu-item">
                            <Link href="#">Home</Link></li>
                    <li className="has-submenu parent-parent-menu-item">
                            <Link href="#">Event</Link><span className="menu-arrow"></span>
                            <ul className="submenu">
                                <li><Link href="/aboutus" className="sub-menu-item font-arcade text-sm">Info</Link></li>
                        
                                <li><Link href="/blog" className="sub-menu-item font-arcade text-sm">News</Link></li>

                                <li className="has-submenu parent-menu-item font-arcade text-sm"><Link href="#"> Hackathon </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                    <li><Link href="/blog-detail/1" className="sub-menu-item text-xs"> Info</Link></li>
                                    <li><Link href="/synthetiq" className="sub-menu-item text-xs"> AI</Link></li>
                                    <li><Link href="/anonempire" className="sub-menu-item text-xs"> Web3</Link></li>
                                    <li><Link href="/lifecode" className="sub-menu-item text-xs"> Biohacking</Link></li>
                                    <li><Link href="/automate" className="sub-menu-item text-xs"> Robotics</Link></li>
                                        <li><Link href="/login" className="sub-menu-item text-xs"> Login</Link></li>
                                    </ul> 
                                </li>
                                <li className="has-submenu parent-menu-item font-arcade text-sm"><Link href="#"> Trade Arena </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                    <li><Link href="/dexarena" className="sub-menu-item text-xs"> Decentralized Arena</Link></li>
                                    <li><Link href="/fintecharena" className="sub-menu-item text-xs">Fintech Arena</Link></li>
                                    <li><Link href="/specialarena" className="sub-menu-item text-xs">Special Arena</Link></li>
                                    <li><Link href="/blog-detail/2" className="sub-menu-item text-xs"> Info</Link></li>
                                        <li><Link href="/login" className="sub-menu-item text-xs"> Login</Link></li>
                                    </ul> 
                                </li>
                                <li className="has-submenu parent-menu-item font-arcade text-sm"><Link href="#"> Art Contest </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                        <li><Link href="/fractal" className="sub-menu-item text-xs"> Fractal</Link></li>
                                        <li><Link href="/prism" className="sub-menu-item text-xs"> Prism</Link></li>
                                        <li><Link href="/login" className="sub-menu-item text-xs"> Login</Link></li>
                                    </ul> 
                                </li>
                                <li className="has-submenu parent-menu-item font-arcade text-sm"><Link href="#"> Privacy </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                        <li><Link href="/terms" className="sub-menu-item text-xs">Terms</Link></li>
                                        <li><Link href="/privacy" className="sub-menu-item text-xs">Policy</Link></li>
                                    </ul>  
                                </li>
                        <li><Link href="/helpcenter" className="sub-menu-item font-arcade text-sm">Helpcenter</Link></li>
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