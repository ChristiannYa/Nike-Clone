import { useEffect } from 'react';
import '../componentsCSS/nav.scss';
import tailwindConfig from '/tailwind.config.js'
import resolveConfig from 'tailwindcss/resolveConfig'

import { headerLogo } from '../assets/images';
import { closeMenu, hamburger } from '../assets/icons';
import { navLinks } from '../constants';

const Nav = () =>
{
   useEffect(() =>
   {
      const SCROLL_THRESHOLD = 100;
      const TRANSITION_DELAY = 500;
      const NAVIGATION_DELAY = 1000;

      const fullConfig = resolveConfig(tailwindConfig);
      const mdBreakpoint = fullConfig.theme.screens.lg;
      const media = window.matchMedia(`(width < ${mdBreakpoint})`);

      let lastScroll = window.scrollY;
      let navigating = false;
      let navigationTimer;
      let resizeTimer;

      const header = document.querySelector('header');
      const btnOpen = document.querySelector('#btnOpenNav');
      const btnClose = document.querySelector('#btnCloseNav');
      const topNavMenu = document.querySelector('.topnav__menu');
      const main = document.querySelector('main');

      const adjustPageSpacing = () =>
      {
         const navHeight = header.offsetHeight;
         const sections = document.querySelectorAll('section');

         main.style.paddingTop = `${navHeight}px`;

         sections.forEach(section =>
         {
            section.style.scrollMarginTop = `${navHeight}px`;
         });
      };

      const createOverlay = () =>
      {
         const overlay = document.createElement('div');
         overlay.classList.add('blur-backdrop');
         document.body.appendChild(overlay);
         return overlay;
      }

      const scrollToSection = (targetSection) =>
      {
         header.style.transform = 'translateY(0)';
         targetSection.scrollIntoView({ behavior: 'smooth' });
      }

      const handleScroll = () =>
      {
         if (navigating) return;

         const currentScroll = window.scrollY;

         if (currentScroll <= SCROLL_THRESHOLD)
         {
            header.style.transform = 'translateY(0)';
            lastScroll = currentScroll;
            return;
         }

         header.style.transform = `translateY(${currentScroll > lastScroll ? '-100%' : '0'})`;
         lastScroll = currentScroll;
      };

      const setupTopNav = (e) =>
      {
         const navLinks = document.querySelectorAll('.topnav__link');

         if (e.matches)
         {
            // Mobile view
            topNavMenu.setAttribute('inert', '');
            topNavMenu.style.transition = 'none';
            topNavMenu.setAttribute('role', 'dialog');

            navLinks.forEach(link =>
            {
               link.removeEventListener('click', desktopMenuClick);
               link.addEventListener('click', mobileMenuClick);
            });
         } else
         {
            // Desktop view
            topNavMenu.removeAttribute('inert');
            topNavMenu.removeAttribute('role');
            topNavMenu.removeAttribute('style');
            main.removeAttribute('inert');

            const overlay = document.querySelector('.blur-backdrop');
            if (overlay) overlay.remove();

            navLinks.forEach(link =>
            {
               link.removeEventListener('click', mobileMenuClick);
               link.addEventListener('click', desktopMenuClick);
            });
         }
      };

      const openMobileMenu = () =>
      {
         if (topNavMenu.style.transition !== 'none') return;

         document.body.classList.add('scroll-lock');

         const existingOverlay = document.querySelector('.blur-backdrop');
         if (existingOverlay) existingOverlay.remove();

         const overlay = createOverlay();
         overlay.offsetHeight;
         overlay.classList.add('active');

         btnOpen.setAttribute('aria-expanded', 'true');
         topNavMenu.removeAttribute('inert');
         topNavMenu.removeAttribute('style');
         main.setAttribute('inert', '');
         btnClose.focus();
      };

      const closeMobileMenu = (shouldScroll = false) =>
      {
         document.body.classList.remove('scroll-lock');

         const overlay = document.querySelector('.blur-backdrop');
         if (overlay)
         {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), TRANSITION_DELAY);
         }

         btnOpen.setAttribute('aria-expanded', 'false');
         topNavMenu.setAttribute('inert', '');
         main.removeAttribute('inert');
         btnOpen.focus();

         setTimeout(() =>
         {
            topNavMenu.style.transition = 'none';
         }, TRANSITION_DELAY);

         if (shouldScroll)
         {
            const savedPosition = parseInt(topNavMenu.dataset.scrollPosition || '0');
            window.scrollTo(0, savedPosition);
         }
      };

      const mobileMenuClick = (e) =>
      {
         if (!media.matches) return;

         e.preventDefault();
         closeMobileMenu(true);

         const href = e.currentTarget.getAttribute('href');
         const targetSection = document.querySelector(href);
         navigating = true;

         scrollToSection(targetSection);

         setTimeout(() =>
         {
            navigating = false;
         }, NAVIGATION_DELAY);
      };

      const desktopMenuClick = (e) =>
      {
         e.preventDefault();
         clearTimeout(navigationTimer);

         const href = e.currentTarget.getAttribute('href');
         const targetSection = document.querySelector(href);
         navigating = true;

         scrollToSection(targetSection);

         navigationTimer = setTimeout(() =>
         {
            navigating = false;
         }, NAVIGATION_DELAY);
      };

      // Initial setup
      adjustPageSpacing();

      // Event listeners
      window.addEventListener('scroll', handleScroll);

      const resizeHandler = () =>
      {
         clearTimeout(resizeTimer);
         resizeTimer = setTimeout(adjustPageSpacing, TRANSITION_DELAY);
      };

      window.addEventListener('resize', resizeHandler);
      setupTopNav(media);
      btnOpen.addEventListener('click', openMobileMenu);
      btnClose.addEventListener('click', () => closeMobileMenu(false));
      media.addEventListener('change', setupTopNav);

      // Cleanup
      return () =>
      {
         window.removeEventListener('scroll', handleScroll);
         window.removeEventListener('resize', resizeHandler);
         btnOpen.removeEventListener('click', openMobileMenu);
         btnClose.removeEventListener('click', closeMobileMenu);
         media.removeEventListener('change', setupTopNav);

         const navLinkElements = document.querySelectorAll('.topnav__link');
         navLinkElements.forEach(link =>
         {
            link.removeEventListener('click', mobileMenuClick);
            link.removeEventListener('click', desktopMenuClick);
         });
      };
   })

   return (
      <header className='topnav wrapper bg-white m-auto w-full z-[999] px-11 py-8 fixed top-0 left-0'>
         <a href="/" className='z-[999]'>
            <img src={headerLogo} alt="Logo" width={70} height={29} />
         </a>

         <nav>
            <span id="nav-label" hidden>Navigation</span>

            <button id="btnOpenNav" className="topnav__open" aria-expanded='false' aria-labelledby='nav-label'>
               <img src={hamburger} width={32} height={32} />
            </button>

            <div className="topnav__menu" aria-labelledby='nav-label'>
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