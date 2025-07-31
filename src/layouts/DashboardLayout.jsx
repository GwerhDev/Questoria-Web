import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccountData, logoutUser } from '../store/accountSlice';
import { Loader } from '../components/Loader';
import { Sidebar } from '../components/Sidebar';

const DashboardLayout = ({ children }) => {
  const accountData = useSelector((state) => state.account.data);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const sidebarRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(fetchAccountData())
      .then((response) => {
        if (response.error) {
          navigate('/login');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && !isSidebarCollapsed && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarCollapsed(true);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, isSidebarCollapsed]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col h-screen font-sans text-gray-400 max-w-full overflow-x-hidden">
      <div className="flex flex-1 overflow-hidden">
        <div ref={sidebarRef}>
          <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} isMobile={isMobile} />
        </div>

        {/* Main Content Wrapper */}
        <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${isMobile ? 'ml-16' : ''}`}>
          {/* Navbar */}
          <header className="p-4 flex justify-end items-center">
            <div className="flex items-center space-x-4">
              {accountData && accountData.logged && (
                <div className="relative" ref={dropdownRef}>
                  <button onClick={toggleDropdown} className="flex items-center space-x-2 p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-300 focus:outline-none">
                    {accountData.userData.profilePic ? (
                      <img src={accountData.userData.profilePic} alt="Profile" className="w-8 h-8 rounded-full" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white text-sm">{accountData.userData.username.charAt(0).toUpperCase()}</div>
                    )}
                    <span className="text-text-primary hidden md:block">{accountData.userData.username}</span>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-surface rounded-md shadow-lg py-1 z-20">
                      <Link to="/u/account" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-700">Ver perfil</Link>
                      <button onClick={() => { dispatch(logoutUser(), navigate('/login')); setIsDropdownOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-gray-700">Cerrar sesión</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </header>

          {/* Content Area */}
          <main className="flex-1 overflow-auto p-2 max-w-content mx-auto w-full">
            <div className="w-full h-full supports-backdrop-blur:bg-opacity-50 rounded-lg p-2">
              {children}
            </div>
          </main>
        </div>
      </div >
    </div >
  );
};

export default DashboardLayout;