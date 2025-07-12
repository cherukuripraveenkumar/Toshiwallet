import { useState, useEffect } from 'react';
import { WalletDashboard } from '@/components/WalletDashboard';
import { TransactionHistory } from '@/components/TransactionHistory';
import { SwapInterface } from '@/components/SwapInterface';
import { SecurityPanel } from '@/components/SecurityPanel';
import { OnRampOffRamp } from '@/components/OnRampOffRamp';
import { MarketOverview } from '@/components/MarketOverview';
import { Button } from '@/components/ui/button';
import { Shield, Wallet, ArrowLeftRight, History, CreditCard, User, TrendingUp } from 'lucide-react';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    // Simulate authentication check
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleAuthenticate = async () => {
    setIsLoading(true);
    // Simulate WebAuthn authentication
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsAuthenticated(true);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="animate-spin w-16 h-16 border-4 border-blue-500/30 border-t-blue-400 rounded-full mx-auto"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-blue-500/10 rounded-full mx-auto animate-pulse"></div>
          </div>
          <div className="text-white text-xl font-semibold">
            {isAuthenticated ? 'Loading Portfolio...' : 'Initializing Toshi Wallet...'}
          </div>
          <div className="text-gray-400 text-sm">FROST MPC • Enterprise Grade Security</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center p-4">
        <div className="max-w-sm w-full bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-3xl p-8 text-center space-y-8 shadow-2xl">
          <div className="space-y-4">
            <div className="relative">
              <Shield className="w-24 h-24 text-blue-400 mx-auto drop-shadow-lg" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Toshi Wallet
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium MPC wallet with institutional-grade security
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-blue-300 font-semibold mb-4 text-sm uppercase tracking-wide">Security Features</h3>
              <ul className="text-sm text-gray-300 space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mr-3"></div>
                  2-of-3 Threshold Signatures
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full mr-3"></div>
                  WebAuthn Biometric Auth
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full mr-3"></div>
                  Encrypted Key Shares
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mr-3"></div>
                  Account Abstraction
                </li>
              </ul>
            </div>
            
            <Button 
              onClick={handleAuthenticate}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-4 rounded-2xl transition-all transform hover:scale-[1.02] active:scale-95 h-auto shadow-lg shadow-blue-500/25"
            >
              <Shield className="w-5 h-5 mr-2" />
              Authenticate with Biometrics
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <WalletDashboard />;
      case 'swap':
        return <SwapInterface />;
      case 'history':
        return <TransactionHistory />;
      case 'onramp':
        return <OnRampOffRamp />;
      case 'markets':
        return <MarketOverview />;
      case 'profile':
        return <SecurityPanel />;
      default:
        return <WalletDashboard />;
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Portfolio', icon: Wallet },
    { id: 'markets', label: 'Markets', icon: TrendingUp },
    { id: 'swap', label: 'Trade', icon: ArrowLeftRight },
    { id: 'history', label: 'Activity', icon: History },
    { id: 'onramp', label: 'Buy', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex flex-col">
      {/* Premium App Header */}
      <header className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Shield className="w-8 h-8 text-blue-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Toshi</h1>
              <div className="text-xs text-gray-400">Wallet</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <div className="text-xs text-green-400 font-medium">SECURE</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 pb-24 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>

      {/* Premium Bottom Navigation */}
      <nav className="bg-gray-900/90 backdrop-blur-xl border-t border-gray-800/50 fixed bottom-0 left-0 right-0 z-50">
        <div className="flex items-center justify-around py-2 px-4 max-w-sm mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center space-y-1 p-3 rounded-xl transition-all ${
                  isActive 
                    ? 'text-blue-400 bg-blue-500/10 shadow-lg shadow-blue-500/20' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'drop-shadow-sm' : ''}`} />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Index;
