import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAccountData } from '../store/accountSlice';
import { Navbar } from '../components/Navbar';

const DashboardLayout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAccountData());
  }, [dispatch]);

  return (
    <div className="flex flex-col h-screen font-sans text-gray-400 max-w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-1 overflow-auto p-2 max-w-content mx-auto w-full">
        <div className="w-full h-full supports-backdrop-blur:bg-opacity-50 rounded-lg p-2">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;