
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faTimes, faScroll, faHome, faShield } from '@fortawesome/free-solid-svg-icons';
import { logoutUser } from '../store/accountSlice';

export const Navbar = () => {
  const accountData = useSelector((state) => state.account.data);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const getLinkClass = (path) => {
    const baseClasses = 'px-5 h-full flex gap-2 items-center font-medium text-gray-300 hover:text-white';
    if (path === '/') {
      return location.pathname === path ? `${baseClasses} bg-yellow-600 hover:bg-yellow-700  text-white` : baseClasses;
    }
    return location.pathname.startsWith(path) ? `${baseClasses} bg-yellow-600 hover:bg-yellow-700 text-white` : baseClasses;
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className="bg-surface py-0">
      <div className="max-w-content mx-auto py-0 px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
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
                <Link to="/adventure" className={getLinkClass('/adventure')}>
                  <FontAwesomeIcon icon={faScroll} />
                  Aventuras
                </Link>
                <Link to="/clan" className={getLinkClass('/clan')}>
                  <FontAwesomeIcon icon={faShield} />
                  Clan
                </Link>
                <Link to="/shop" className={getLinkClass('/shop')}>
                  <FontAwesomeIcon icon={faShield} />
                  Tienda
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {accountData && accountData.logged ? (
              <div className="relative" onBlur={handleUserMenuToggle} tabIndex={0}>
                <button 
                  onClick={handleUserMenuToggle} 
                  className="flex items-center space-x-2 p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-300 focus:outline-none">
                  {accountData.userData.profilePic ? (
                    <img src={accountData.userData.profilePic} alt="Profile" className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white text-sm">{accountData.userData.username.charAt(0).toUpperCase()}</div>
                  )}
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-surface rounded-md shadow-lg py-1 z-20">
                    <Link to="/u/account" className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-700">Ver perfil</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-gray-700">Cerrar sesión</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="p-2 rounded-full hover:bg-gray-700">
                <FontAwesomeIcon icon={faUser} className="text-gray-400" />
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link to="/" className={getLinkClass('/')}>
            <FontAwesomeIcon icon={faHome} />
            Inicio
          </Link>
          <Link to="/adventure" className={getLinkClass('/adventure')}>
            <FontAwesomeIcon icon={faScroll} />
            Aventuras
          </Link>
          <Link to="/clan" className={getLinkClass('/clan')}>
            <FontAwesomeIcon icon={faShield} />
            Clan
          </Link>
          <Link to="/shop" className={getLinkClass('/shop')}>
            <FontAwesomeIcon icon={faShield} />
            Tienda
          </Link>
        </div>
      </div>
    </nav>
  );
};
