
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coins, Send, Download, TrendingUp, Eye, EyeOff, Plus, QrCode, ArrowUpRight, ArrowDownLeft, Zap } from 'lucide-react';

interface Balance {
  symbol: string;
  amount: number;
  usdValue: number;
  change24h: number;
  network: string;
  price: number;
}

export const WalletDashboard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [totalValue, setTotalValue] = useState(0);
  
  const balances: Balance[] = [
    { symbol: 'BTC', amount: 0.2547, usdValue: 11234.50, change24h: 2.34, network: 'Bitcoin', price: 44100.00 },
    { symbol: 'ETH', amount: 3.4521, usdValue: 8456.78, change24h: -1.23, network: 'Ethereum', price: 2450.00 },
    { symbol: 'USDC', amount: 15420.50, usdValue: 15420.50, change24h: 0.01, network: 'Polygon', price: 1.00 },
    { symbol: 'USDT', amount: 8750.25, usdValue: 8750.25, change24h: -0.02, network: 'Ethereum', price: 1.00 },
  ];

  const totalUsdValue = balances.reduce((sum, balance) => sum + balance.usdValue, 0);
  const portfolioChange = 234.56;
  const portfolioChangePercent = 1.2;

  // Animated counter effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalValue(prev => {
        if (prev < totalUsdValue) {
          return Math.min(prev + totalUsdValue / 50, totalUsdValue);
        }
        return totalUsdValue;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [totalUsdValue]);

  return (
    <div className="space-y-6">
      {/* Premium Portfolio Balance Card */}
      <Card className="bg-gradient-to-br from-gray-00/80 to-gray-800/80 border-gray-700/50 backdrop-blur-xl shadow-2xl shadow-blue-500/10">
        <CardContent className="p-6">
          <div className="text-center space-y-6">
            {/* Balance Header */}
            <div className="flex items-center justify-between">
              <div className="text-gray-400 text-sm font-medium uppercase tracking-wide">Total Portfolio</div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBalance(!showBalance)}
                className="text-gray-400 hover:text-white hover:bg-gray-700/50 h-8 w-8 p-0 rounded-full"
              >
                {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </Button>
            </div>

            {/* Main Balance Display */}
            <div className="space-y-2">
              <div className="text-5xl font-bold text-white tracking-tight">
                {showBalance ? `$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '••••••••'}
              </div>
              <div className="flex items-center justify-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-semibold">
                  +${portfolioChange.toFixed(2)} ({portfolioChangePercent}%)
                </span>
                <span className="text-gray-500 text-sm">24h</span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-4 gap-3">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-2xl h-16 flex flex-col space-y-1 shadow-lg shadow-blue-500/25">
                <Send className="w-5 h-5" />
                <span className="text-xs font-medium">Send</span>
              </Button>
              <Button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-2xl h-16 flex flex-col space-y-1 shadow-lg shadow-green-500/25">
                <Download className="w-5 h-5" />
                <span className="text-xs font-medium">Receive</span>
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white rounded-2xl h-16 flex flex-col space-y-1 shadow-lg shadow-purple-500/25">
                <Zap className="w-5 h-5" />
                <span className="text-xs font-medium">Swap</span>
              </Button>
              <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-white rounded-2xl h-16 flex flex-col space-y-1 shadow-lg shadow-yellow-500/25">
                <Plus className="w-5 h-5" />
                <span className="text-xs font-medium">Buy</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Premium Assets List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold text-lg">Your Assets</h3>
          <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-full">
            <Plus className="w-4 h-4 mr-1" />
            Add Token
          </Button>
        </div>
        
        <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="divide-y divide-gray-800/50">
              {balances.map((balance) => (
                <div key={balance.symbol} className="p-4 hover:bg-gray-800/30 transition-all duration-200 cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${
                        balance.symbol === 'BTC' ? 'bg-gradient-to-r from-orange-500 to-yellow-500' :
                        balance.symbol === 'ETH' ? 'bg-gradient-to-r from-blue-500 to-purple-500' :
                        balance.symbol === 'USDC' ? 'bg-gradient-to-r from-blue-600 to-blue-400' :
                        'bg-gradient-to-r from-green-600 to-green-400'
                      }`}>
                        {balance.symbol === 'BTC' ? '₿' : balance.symbol.charAt(0)}
                      </div>
                      <div>
                        <div className="text-white font-semibold text-lg">{balance.symbol}</div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                            {balance.network}
                          </Badge>
                          <span className="text-gray-500 text-sm">
                            ${balance.price < 1 ? balance.price.toFixed(3) : balance.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-1">
                      <div className="text-white font-semibold text-lg">
                        {showBalance ? 
                          `${balance.amount < 1 ? balance.amount.toFixed(4) : balance.amount.toFixed(2)} ${balance.symbol}` : 
                          '••••••'
                        }
                      </div>
                      <div className="text-gray-400 text-sm">
                        {showBalance ? `$${balance.usdValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '••••••'}
                      </div>
                      <div className="flex items-center justify-end space-x-1">
                        {balance.change24h >= 0 ? 
                          <ArrowUpRight className="w-3 h-3 text-green-400" /> : 
                          <ArrowDownLeft className="w-3 h-3 text-red-400" />
                        }
                        <span className={`text-sm font-medium ${balance.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {balance.change24h >= 0 ? '+' : ''}{balance.change24h}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Market Insights */}
      <Card className="bg-gradient-to-r from-gray-1000/50 to-gray-800/50 border-gray-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="w-5 h-5 text-blue-400 mr-2" />
            Market Pulse
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-500/10 rounded-xl border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">+12.5%</div>
              <div className="text-sm text-gray-400">Bitcoin 7d</div>
            </div>
            <div className="text-center p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">$2.1T</div>
              <div className="text-sm text-gray-400">Total Market Cap</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
