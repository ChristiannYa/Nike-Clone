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
      const btnOpen = document.querySelector('#btnOpenNav');
      const btnClose = document.querySelector('#btnCloseNav');

      // Take the Tailwind config file and process it to get a complete 
      // configuration object with all default and custom values
      const fullConfig = resolveConfig(tailwindConfig);

      // Extract the 'sm' breakpoint value from the processed config
      const mdBreakpoint = fullConfig.theme.screens.sm;
      const media = window.matchMedia(`(width < ${mdBreakpoint})`);
      const topNavMenu = document.querySelector('.topnav__menu');

      const main = document.querySelector('main');

      const setupTopNav = (e) =>
      {
         if (e.matches)
         {
            // Is mobile
            // console.log('is mobile');
            topNavMenu.setAttribute('innert', '');
            topNavMenu.style.transition = 'none';
         } else
         {
            // Is desktop
            // console.log('is desktop')
            topNavMenu.removeAttribute('innert');

            // Close the menu is it is open
            // while switching from mobile to desktop
            closeMobileMenu();
         }
      }

      const openMobileMenu = () =>
      {
         btnOpen.setAttribute('aria-expanded', 'true');
         topNavMenu.removeAttribute('innert');
         topNavMenu.removeAttribute('style');
         main.setAttribute('innert', '');
         disableBodyScroll(topNavMenu);
         btnClose.focus();
      }

      const closeMobileMenu = () =>
      {
         btnOpen.setAttribute('aria-expanded', 'false');
         topNavMenu.setAttribute('innert', '');
         main.removeAttribute('innert');
         enableBodyScroll(topNavMenu);
         btnOpen.focus();

         setTimeout(() =>
         {
            topNavMenu.style.transition = 'none';
         }, 500);
      }

      const mobileMenuClick = (e) =>
      {
         if (media.matches)
         {
            // Close the menu first
            closeMobileMenu();

            const href = e.currentTarget.getAttribute('href');

            // Small delay to allow menu to close
            setTimeout(() =>
            {
               window.location.href = href;
            }, 50);

            e.preventDefault();
         }
      }

      // Clicked link auto adjustment //
      function adjustPageSpacing()
      {
         const header = document.querySelector('header');
         const navHeight = header.offsetHeight;
         const sections = document.querySelectorAll('section');

         sections.forEach(section =>
         {
            section.style.scrollMarginTop = `${navHeight + 5}px`;
         });
      }

      adjustPageSpacing();

      let resizeTimer;
      window.addEventListener('resize', () =>
      {
         clearTimeout(resizeTimer);
         resizeTimer = setTimeout(adjustPageSpacing, 100);
      });

      // Click handlers to all nav links
      const navLinks = document.querySelectorAll('.topnav__link');
      navLinks.forEach(link =>
      {
         link.addEventListener('click', mobileMenuClick);
      })

      setupTopNav(media);

      btnOpen.addEventListener('click', openMobileMenu);
      btnClose.addEventListener('click', closeMobileMenu);

      media.addEventListener('change', function (e)
      {
         setupTopNav(e);
      })

      // Cleanup function to remove event listeners and enable scroll when component unmounts
      return () =>
      {
         btnOpen.removeEventListener('click', openMobileMenu);
         btnClose.removeEventListener('click', closeMobileMenu);
         media.removeEventListener('change', setupTopNav);
         enableBodyScroll(topNavMenu);

         navLinks.forEach(link =>
         {
            link.removeEventListener('click', mobileMenuClick);
         })
      }

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

            <div className="topnav__menu z-50" role='dialog' aria-labelledby='nav-label'>
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