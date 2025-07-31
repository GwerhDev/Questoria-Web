

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faHome, faScroll, faShield, faBagShopping, faTableColumns } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Sidebar = ({ isCollapsed, toggleSidebar, isMobile }) => {
  const accountData = useSelector((state) => state.account.data);
  const widthClass = isCollapsed ? (isMobile ? 'w-16' : '') : 'w-64';
  const location = useLocation();

  const getLinkClass = (path) => {
    const baseClasses = `flex items-center p-2 rounded-lg transition-colors duration-200 text-gray-400 hover:bg-gray-700 hover:text-white active:bg-gray-600 ${isCollapsed ? 'justify-center' : ''}`;
    if (path === '/') {
      return location.pathname === path ? `${baseClasses} bg-gray-600 text-white` : baseClasses;
    }
    return location.pathname.startsWith(path) ? `${baseClasses} bg-gray-600 text-white` : baseClasses;
  };

  const toDashboard = 'https://dashboard.questoria.cl'

  return (
    <aside
      className={`
        text-text-primary flex flex-col bg-surface backdrop-blur-lg 
        supports-backdrop-blur:bg-opacity-75 h-full
        transition-all duration-300 ease-in-out z-10
        ${isMobile ? 'absolute overflow-auto m-0' : 'relative'}
        ${widthClass}
      `}
    >
      <div className="p-4 flex justify-center items-center">
        <h1 className={`text-2xl font-semibold text-text-primary ${isCollapsed ? 'hidden' : 'block'}`}>Questoria</h1>
        <h1 className={`text-2xl font-semibold text-text-primary ${!isCollapsed ? 'hidden' : 'block'}`}>Q</h1>
      </div>

      <div className={`flex-1 flex flex-col justify-between`}>
        <nav className="p-4 space-y-2">
          <Link to="/" title='Inicio' className={getLinkClass('/')}>
            <FontAwesomeIcon icon={faHome} />
            <span className={`ml-2 ${isCollapsed ? 'hidden' : 'block'}`}>Inicio</span>
          </Link>
          <Link to="/adventure" title='Aventuras' className={getLinkClass('/users')}>
            <FontAwesomeIcon icon={faScroll} />
            <span className={`ml-2 ${isCollapsed ? 'hidden' : 'block'}`}>Aventuras</span>
          </Link>
          <Link to="/clan" title='Clan' className={getLinkClass('/creator')}>
            <FontAwesomeIcon icon={faShield} />
            <span className={`ml-2 ${isCollapsed ? 'hidden' : 'block'}`}>Clan</span>
          </Link>
          <Link to="/shop" title='Tienda' className={getLinkClass('/settings')}>
            <FontAwesomeIcon icon={faBagShopping} />
            <span className={`ml-2 ${isCollapsed ? 'hidden' : 'block'}`}>Tienda</span>
          </Link>
          {
            accountData?.userData.role === 'admin' &&
            <a href={toDashboard} className={getLinkClass('/settings')}>
              <FontAwesomeIcon icon={faTableColumns} />
              <span className={`ml-2 ${isCollapsed ? 'hidden' : 'block'}`}>Dashboard</span>
            </a>
          }
        </nav>

        <div className="p-4">
          <button onClick={toggleSidebar} className={`flex items-center py-3 rounded-lg transition-colors duration-200 text-gray-400 hover:bg-gray-700 hover:text-white active:bg-gray-600 w-full justify-center`}>
            <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft} />
          </button>
        </div>
      </div>
    </aside>
  );
};
