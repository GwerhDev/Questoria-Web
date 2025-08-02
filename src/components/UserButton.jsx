import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserCircle, faSignOutAlt, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { logoutUser } from '../store/accountSlice';

export const UserButton = () => {
  const accountData = useSelector((state) => state.account.data);
  const accountStatus = useSelector((state) => state.account.status);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setIsUserMenuOpen(false);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    setIsUserMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {accountStatus === 'loading' ? (
        <div className="p-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
        </div>
      ) : accountData && accountData.logged ? (
          <div className="relative" ref={userMenuRef}>
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
              <div className="px-4 py-2 flex items-center space-x-3 border-b border-gray-700">
                {accountData.userData.profilePic ? (
                  <img src={accountData.userData.profilePic} alt="Profile" className="w-10 h-10 rounded-full" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white text-lg">{accountData.userData.username.charAt(0).toUpperCase()}</div>
                )}
                <div>
                  <p className="text-sm font-medium text-text-primary">{accountData.userData.username}</p>
                  <p className="text-xs text-gray-400">{accountData.userData.role}</p>
                </div>
              </div>
              <Link to="/u/account" className="px-4 py-2 text-sm text-text-primary hover:bg-gray-700 flex items-center space-x-2">
                <FontAwesomeIcon icon={faUserCircle} />
                <span>Ver perfil</span>
              </Link>
              {accountData.userData.role === 'admin' && (
                <a href="https://dashboard.questoria.cl" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm text-text-primary hover:bg-gray-700 flex items-center space-x-2">
                  <FontAwesomeIcon icon={faUserShield} />
                  <span>Admin Dashboard</span>
                </a>
              )}
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-gray-700 flex items-center space-x-2">
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Cerrar sesión</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link to="/login" className="p-2 rounded-full hover:bg-gray-700">
          <FontAwesomeIcon icon={faUser} className="text-gray-400" />
        </Link>
      )}
    </>
  );
};
