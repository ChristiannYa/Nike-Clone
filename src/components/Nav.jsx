import { useEffect } from 'react';
import '../componentsCSS/nav.scss';
import tailwindConfig from '/tailwind.config.js'
import resolveConfig from 'tailwindcss/resolveConfig'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock-upgrade';

import { headerLogo } from '../assets/images';
import { closeMenu, hamburger } from '../assets/icons';
import { navLinks } from '../constants';

const Nav = () =>
{
   useEffect(() =>
   {
      // DOM element selections
      const btnOpen = document.querySelector('#btnOpenNav');
      const btnClose = document.querySelector('#btnCloseNav');
      const topNavMenu = document.querySelector('.topnav__menu');
      const main = document.querySelector('main');

      // Breakpoint setup
      const fullConfig = resolveConfig(tailwindConfig);
      const mdBreakpoint = fullConfig.theme.screens.sm;
      const media = window.matchMedia(`(width < ${mdBreakpoint})`);

      const setupTopNav = (e) =>
      {
         if (e.matches)
         {
            // Mobile view
            topNavMenu.setAttribute('inert', '');
            topNavMenu.style.transition = 'none';
            topNavMenu.setAttribute('role', 'dialog');

            const navLinks = document.querySelectorAll('.topnav__link');
            navLinks.forEach(link =>
            {
               link.addEventListener('click', mobileMenuClick);
            });
         } else
         {
            // Desktop view
            topNavMenu.removeAttribute('inert');
            topNavMenu.removeAttribute('role');
            topNavMenu.removeAttribute('style');
            main.removeAttribute('inert');

            // Remove any existing overlay
            const overlay = document.querySelector('.blur-backdrop');
            if (overlay)
            {
               overlay.remove();
            }

            const navLinks = document.querySelectorAll('.topnav__link');
            navLinks.forEach(link =>
            {
               link.removeEventListener('click', mobileMenuClick);
            });
         }
      };

      const openMobileMenu = () =>
      {
         if (topNavMenu.style.transition !== 'none')
         {
            return;
         }

         // Remove existing overlay
         const existingOverlay = document.querySelector('.blur-backdrop');
         if (existingOverlay)
         {
            existingOverlay.remove();
         }

         const overlay = document.createElement('div');
         overlay.classList.add('blur-backdrop');
         document.body.appendChild(overlay);

         overlay.offsetHeight;
         overlay.classList.add('active');

         btnOpen.setAttribute('aria-expanded', 'true');
         topNavMenu.removeAttribute('inert');
         topNavMenu.removeAttribute('style');
         main.setAttribute('inert', '');
         disableBodyScroll(topNavMenu);
         btnClose.focus();
      };

      const closeMobileMenu = () =>
      {
         // Remove blur overlay
         const overlay = document.querySelector('.blur-backdrop');
         if (overlay)
         {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 300);
         }

         btnOpen.setAttribute('aria-expanded', 'false');
         topNavMenu.setAttribute('inert', '');
         main.removeAttribute('inert');
         enableBodyScroll(topNavMenu);
         document.body.style.overflow = '';
         btnOpen.focus();

         setTimeout(() =>
         {
            topNavMenu.style.transition = 'none';
         }, 500);
      };

      const mobileMenuClick = (e) =>
      {
         if (media.matches)
         {
            e.preventDefault();
            closeMobileMenu();

            const href = e.currentTarget.getAttribute('href');
            setTimeout(() =>
            {
               window.location.href = href;
            }, 50);
         }
      };

      const adjustPageSpacing = () =>
      {
         const header = document.querySelector('header');
         const navHeight = header.offsetHeight;
         const sections = document.querySelectorAll('section');

         sections.forEach(section =>
         {
            section.style.scrollMarginTop = `${navHeight + 5}px`;
         });
      };

      // Initial setup
      adjustPageSpacing();

      // Event listeners
      let resizeTimer;
      window.addEventListener('resize', () =>
      {
         clearTimeout(resizeTimer);
         resizeTimer = setTimeout(adjustPageSpacing, 100);
      });

      setupTopNav(media);
      btnOpen.addEventListener('click', openMobileMenu);
      btnClose.addEventListener('click', closeMobileMenu);
      media.addEventListener('change', setupTopNav);

      // Cleanup
      return () =>
      {
         btnOpen.removeEventListener('click', openMobileMenu);
         btnClose.removeEventListener('click', closeMobileMenu);
         media.removeEventListener('change', setupTopNav);
         enableBodyScroll(topNavMenu);

         const navLinkElements = document.querySelectorAll('.topnav__link');
         navLinkElements.forEach(link =>
         {
            link.removeEventListener('click', mobileMenuClick);
         });
      };
   }, []);

   return (
      <header className='topnav wrapper bg-white m-auto w-full z-50 px-11 py-8 sticky top-0'>
         <a href="/">
            <img src={headerLogo} alt="Logo" width={130} height={29} />
         </a>

         <nav>
            <span id="nav-label" hidden>Navigation</span>

            <button id="btnOpenNav" className="topnav__open" aria-expanded='false' aria-labelledby='nav-label'>
               <img src={hamburger} width={32} height={32} />
            </button>

            <div className="topnav__menu z-50" aria-labelledby='nav-label'>
               <button id="btnCloseNav" aria-label='Close' className="topnav__close">
                  <img src={closeMenu} width={32} height={32} />
               </button>

               <ul className='topnav__links'>
                  {navLinks.map((item) => (
                     <li key={item.label} className='topnav__item'>
                        <a href={item.href} className='topnav__link'>
                           {item.label}
                        </a>
                     </li>
                  ))}
               </ul>
            </div>
         </nav>
      </header>
   )
}

export default Nav