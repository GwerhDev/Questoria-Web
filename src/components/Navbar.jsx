import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHome, faNewspaper, faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { UserButton } from './UserButton';

export const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getLinkClass = (path) => {
    const baseClasses = 'px-5 h-full flex gap-2 items-center font-medium text-gray-300 hover:text-white';
    if (path === '/') {
      return location.pathname === path ? `${baseClasses} bg-yellow-600 hover:bg-yellow-700  text-white` : baseClasses;
    }
    return location.pathname.startsWith(path) ? `${baseClasses} bg-yellow-600 hover:bg-yellow-700 text-white` : baseClasses;
  };

  return (
    <nav className="bg-surface py-0">
      <div className="max-w-content mx-auto py-0 px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-12">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start h-full">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-semibold text-text-primary">Questoria</h1>
            </div>
            <div className="hidden sm:block sm:ml-6 h-full">
              <div className="flex h-full">
                <Link to="/" className={getLinkClass('/')}>
                  <FontAwesomeIcon icon={faHome} />
                  Inicio
                </Link>
                <Link to="/news" className={getLinkClass('/news')}>
                  <FontAwesomeIcon icon={faNewspaper} />
                  Noticias
                </Link>
                <Link to="/shop" className={getLinkClass('/shop')}>
                  <FontAwesomeIcon icon={faBagShopping} />
                  Tienda
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Link to="/play" className="mr-4 px-4 py-1 flex justify-center items-center rounded-md text-white bg-yellow-600 hover:bg-yellow-700 transition-colors duration-300">
              Jugar
            </Link>
            <UserButton />
          </div>
        </div>
      </div>

      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link to="/" className={getLinkClass('/')}>
            <FontAwesomeIcon icon={faHome} />
            Inicio
          </Link>
          <Link to="/news" className={getLinkClass('/news')}>
            <FontAwesomeIcon icon={faNewspaper} />
            Noticias
          </Link>
          <Link to="/shop" className={getLinkClass('/shop')}>
            <FontAwesomeIcon icon={faBagShopping} />
            Tienda
          </Link>
        </div>
      </div>
    </nav>
  );
};