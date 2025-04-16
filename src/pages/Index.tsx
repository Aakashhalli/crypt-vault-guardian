
import React, { useState, useEffect } from 'react';
import MetaMaskButton from '@/components/MetaMaskButton';

const Index = () => {
  const [showTitle, setShowTitle] = useState(true);
  const [showConnect, setShowConnect] = useState(false);

  useEffect(() => {
    // Trigger animations with timers
    const titleTimer = setTimeout(() => {
      setShowTitle(false);
      
      // Show connect after title fades out
      const connectTimer = setTimeout(() => {
        setShowConnect(true);
      }, 500);
      
      return () => clearTimeout(connectTimer);
    }, 3000); // Show title for 3 seconds
    
    return () => clearTimeout(titleTimer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-crypto-darker relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute w-full h-full">
        <div className="absolute top-[10%] left-[15%] w-36 h-36 rounded-full bg-crypto-purple/10 blur-3xl animate-pulse-light"></div>
        <div className="absolute top-[40%] right-[20%] w-64 h-64 rounded-full bg-crypto-blue/10 blur-3xl animate-pulse-light animation-delay-600"></div>
        <div className="absolute bottom-[20%] left-[30%] w-48 h-48 rounded-full bg-crypto-accent/10 blur-3xl animate-pulse-light animation-delay-300"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYyek0zMCAzNGgtMnYtNGgydjR6TTI0IDM0aC0ydi00aDJ2NHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      
      {/* Main content */}
      <div className="container relative z-10 flex flex-col items-center justify-center p-4 text-center">
        {/* Title animation */}
        <div className={`transition-opacity duration-500 ${showTitle ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            <div className="reveal-text overflow-hidden">
              <span className="inline-block reveal-delay-1">Cryptex</span>{' '}
              <span className="inline-block reveal-delay-2">Vault</span>
            </div>
            <div className="reveal-text mt-2">
              <span className="text-gradient inline-block reveal-delay-3">Own</span>{' '}
              <span className="inline-block reveal-delay-4">What's</span>{' '}
              <span className="inline-block reveal-delay-5">Yours</span>
            </div>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in animate-delay-600">
            Secure your digital creations with unbreakable blockchain protection
          </p>
        </div>
        
        {/* Connect section */}
        <div className={`mt-12 transition-all duration-500 ${showConnect ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="glass-card p-8 rounded-xl max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gradient">Connect to continue</h2>
            <p className="text-gray-300 mb-8">
              Connect your MetaMask wallet to access the Cryptex Vault platform and protect your digital assets.
            </p>
            <MetaMaskButton animated={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
