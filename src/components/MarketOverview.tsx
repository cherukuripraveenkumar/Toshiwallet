
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Star, StarOff } from 'lucide-react';

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume: string;
  marketCap: string;
  isWatched: boolean;
}

export const MarketOverview = () => {
  const marketData: MarketData[] = [
    { symbol: 'BTC', name: 'Bitcoin', price: 44250.00, change24h: 2.34, volume: '$28.4B', marketCap: '$867B', isWatched: true },
    { symbol: 'ETH', name: 'Ethereum', price: 2456.78, change24h: -1.23, volume: '$15.2B', marketCap: '$295B', isWatched: true },
    { symbol: 'USDC', name: 'USD Coin', price: 1.00, change24h: 0.01, volume: '$4.8B', marketCap: '$25.2B', isWatched: false },
    { symbol: 'SOL', name: 'Solana', price: 98.45, change24h: 5.67, volume: '$2.1B', marketCap: '$42.8B', isWatched: false },
    { symbol: 'ADA', name: 'Cardano', price: 0.485, change24h: -2.45, volume: '$456M', marketCap: '$17.2B', isWatched: true },
    { symbol: 'DOT', name: 'Polkadot', price: 7.23, change24h: 1.89, volume: '$234M', marketCap: '$9.8B', isWatched: false },
  ];

  const topGainers = marketData.filter(coin => coin.change24h > 0).sort((a, b) => b.change24h - a.change24h).slice(0, 3);
  const topLosers = marketData.filter(coin => coin.change24h < 0).sort((a, b) => a.change24h - b.change24h).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Market Stats Header */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r bg-gray-900/50 to-gray-800/50 border-white-700/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="text-sm text-gray-400">Total Cap</div>
            <div className="text-xl font-bold text-white">$1.2T</div>
            <div className="flex items-center text-green-400 text-sm">
              <TrendingUp className="w-3 h-3 mr-1" />
              +2.3%
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r bg-gray-900/50 to-gray-800/50 border-white-700/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="text-sm text-gray-400">24h Volume</div>
            <div className="text-xl font-bold text-white">$52.4B</div>
            <div className="flex items-center text-red-400 text-sm">
              <TrendingDown className="w-3 h-3 mr-1" />
              -5.1%
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r bg-gray-00/50 to-gray-800/50 border-white-700/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="text-sm text-gray-400">BTC Dom</div>
            <div className="text-xl font-bold text-white">52.8%</div>
            <div className="flex items-center text-green-400 text-sm">
              <TrendingUp className="w-3 h-3 mr-1" />
              +0.2%
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-gray-1000/50 to-gray-800/50 border-white-700/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="text-sm text-gray-400">Fear & Greed</div>
            <div className="text-xl font-bold text-yellow-400">67</div>
            <div className="text-sm text-gray-400">Greed</div>
          </CardContent>
        </Card>
      </div>

      {/* Top Gainers & Losers */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br bg-gray-900/50 to-gray-900/50 border-green-400/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
              Top Gainers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topGainers.map((coin) => (
              <div key={coin.symbol} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {coin.symbol.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-medium">{coin.symbol}</div>
                    <div className="text-gray-400 text-sm">{coin.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">${coin.price.toLocaleString()}</div>
                  <div className="text-green-400 text-sm font-medium">+{coin.change24h}%</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br bg-gray-900/50 to-gray-900/50 border-red-400/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingDown className="w-5 h-5 text-red-400 mr-2" />
              Top Losers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topLosers.map((coin) => (
              <div key={coin.symbol} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {coin.symbol.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-medium">{coin.symbol}</div>
                    <div className="text-gray-400 text-sm">{coin.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">${coin.price.toLocaleString()}</div>
                  <div className="text-red-400 text-sm font-medium">{coin.change24h}%</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Full Market List */}
      <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">All Markets</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-800/50">
            {marketData.map((coin) => (
              <div key={coin.symbol} className="p-4 hover:bg-gray-800/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                      {coin.isWatched ? <Star className="w-4 h-4 fill-current text-yellow-400" /> : <StarOff className="w-4 h-4" />}
                    </button>
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {coin.symbol.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-medium">{coin.symbol}</div>
                      <div className="text-gray-400 text-sm">{coin.name}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-white font-bold text-lg">
                      ${coin.price < 1 ? coin.price.toFixed(3) : coin.price.toLocaleString()}
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Badge variant={coin.change24h >= 0 ? "default" : "destructive"} 
                             className={coin.change24h >= 0 ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"}>
                        {coin.change24h >= 0 ? '+' : ''}{coin.change24h}%
                      </Badge>
                    </div>
                    <div className="text-gray-400 text-xs mt-1">Vol: {coin.volume}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
