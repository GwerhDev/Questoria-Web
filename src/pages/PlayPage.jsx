import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAndroid, faApple } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faDesktop, faMobileAlt, faDownload } from '@fortawesome/free-solid-svg-icons';

const PlayPage = () => {
  const accountData = useSelector((state) => state.account.data);
  const [deviceType, setDeviceType] = useState('');
  const [os, setOs] = useState('');

  useEffect(() => {
    const userAgent = navigator.userAgent;

    // Detect device type
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
      setDeviceType('Tablet');
    } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
      setDeviceType('Mobile');
    } else {
      setDeviceType('Desktop');
    }

    // Detect OS
    if (userAgent.indexOf('Win') !== -1) setOs('Windows');
    else if (userAgent.indexOf('Mac') !== -1) setOs('macOS');
    else if (userAgent.indexOf('Linux') !== -1) setOs('Linux');
    else if (userAgent.indexOf('Android') !== -1) setOs('Android');
    else if (userAgent.indexOf('iOS') !== -1) setOs('iOS');
    else setOs('Unknown');

  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen text-text-primary p-4">
      <h1 className="text-4xl font-bold mb-8">Opciones de Juego</h1>

      <div className="bg-surface p-6 rounded-lg shadow-lg w-full max-w-md mb-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center"><FontAwesomeIcon icon={faGlobe} className="mr-3" />Jugar en Navegador</h2>
        <p className="mb-4 text-text-secondary">Juega directamente desde tu navegador web.</p>
        <a
          href={accountData?.logged ? "https://app.questoria.cl" : "/login?redirect_uri=" + encodeURIComponent("https://app.questoria.cl")}
          rel="noopener noreferrer"
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300"
        >
          Ir a Questoria Web
        </a>
      </div>

      {deviceType === 'Desktop' && (
        <div className="bg-surface p-6 rounded-lg shadow-lg w-full max-w-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center"><FontAwesomeIcon icon={faDesktop} className="mr-3" />Jugar en Desktop</h2>
          <p className="mb-4 text-text-secondary">Descarga el cliente de escritorio para {os}.</p>
          <button className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors duration-300">
            <FontAwesomeIcon icon={faDownload} className="mr-2" />Descargar para {os}
          </button>
        </div>
      )}

      {(deviceType === 'Mobile' || deviceType === 'Tablet') && (
        <div className="bg-surface p-6 rounded-lg shadow-lg w-full max-w-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FontAwesomeIcon icon={faMobileAlt} className="mr-3" />
            Jugar en {deviceType}
          </h2>
          <p className="mb-4 text-text-secondary">Descarga la aplicación móvil para {os}.</p>
          <div className="flex justify-around mt-4">
            {os === 'Android' && (
              <a href="#" className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faAndroid} className="mr-2" />Descargar para Android
              </a>
            )}
            {os === 'iOS' && (
              <a href="#" className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-colors duration-300 flex items-center">
                <FontAwesomeIcon icon={faApple} className="mr-2" />Descargar para iOS
              </a>
            )}
            {os === 'Unknown' && (
              <p className="text-text-secondary">Opciones de descarga no disponibles para tu OS móvil.</p>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default PlayPage;