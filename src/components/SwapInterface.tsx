
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown, Settings, TrendingUp, Zap, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Token {
  symbol: string;
  name: string;
  balance: number;
  price: number;
  network: string;
}

export const SwapInterface = () => {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDC');
  const [slippage, setSlippage] = useState('0.5');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');

  const tokens: Token[] = [
    { symbol: 'ETH', name: 'Ethereum', balance: 3.4521, price: 2450.00, network: 'Ethereum' },
    { symbol: 'BTC', name: 'Bitcoin', balance: 0.2547, price: 44100.00, network: 'Bitcoin' },
    { symbol: 'USDC', name: 'USD Coin', balance: 15420.50, price: 1.00, network: 'Polygon' },
    { symbol: 'USDT', name: 'Tether', balance: 8750.25, price: 1.00, network: 'Ethereum' },
  ];

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    
    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const calculateToAmount = (from: string) => {
    if (!from) return '';
    const fromTokenPrice = tokens.find(t => t.symbol === fromToken)?.price || 0;
    const toTokenPrice = tokens.find(t => t.symbol === toToken)?.price || 0;
    const result = (parseFloat(from) * fromTokenPrice) / toTokenPrice;
    return result.toFixed(6);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setToAmount(calculateToAmount(value));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Order Type Selector */}
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
        <CardContent className="p-4">
          <div className="flex space-x-2">
            <Button
              variant={orderType === 'market' ? 'default' : 'outline'}
              onClick={() => setOrderType('market')}
              className={orderType === 'market' ? 'bg-blue-600 hover:bg-blue-700' : 'border-white/20 text-white hover:bg-white/10'}
            >
              <Zap className="w-4 h-4 mr-2" />
              Market Order
            </Button>
            <Button
              variant={orderType === 'limit' ? 'default' : 'outline'}
              onClick={() => setOrderType('limit')}
              className={orderType === 'limit' ? 'bg-blue-600 hover:bg-blue-700' : 'border-white/20 text-black hover:bg-green/10'}
            >
              <Clock className="w-4 h-4 mr-2" />
              Limit Order
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Swap Interface */}
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">
              {orderType === 'market' ? 'Instant Swap' : 'Limit Order'}
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* From Token */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-slate-300">From</label>
              <span className="text-sm text-slate-400">
                Balance: {tokens.find(t => t.symbol === fromToken)?.balance.toFixed(4)} {fromToken}
              </span>
            </div>
            <div className="flex space-x-2">
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={fromAmount}
                  onChange={(e) => handleFromAmountChange(e.target.value)}
                  className="bg-white/10 border-white/20 text-white text-lg h-12"
                />
              </div>
              <Select value={fromToken} onValueChange={setFromToken}>
                <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tokens.map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      <div className="flex items-center space-x-2">
                        <span>{token.symbol}</span>
                        <Badge variant="outline" className="text-xs">
                          {token.network}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSwapTokens}
              className="rounded-full bg-white/10 hover:bg-white/20 text-white p-2"
            >
              <ArrowUpDown className="w-4 h-4" />
            </Button>
          </div>

          {/* To Token */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-slate-300">To</label>
              <span className="text-sm text-slate-400">
                Balance: {tokens.find(t => t.symbol === toToken)?.balance.toFixed(4)} {toToken}
              </span>
            </div>
            <div className="flex space-x-2">
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={toAmount}
                  readOnly={orderType === 'market'}
                  onChange={(e) => orderType === 'limit' && setToAmount(e.target.value)}
                  className="bg-white/10 border-white/20 text-white text-lg h-12"
                />
              </div>
              <Select value={toToken} onValueChange={setToToken}>
                <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tokens.map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      <div className="flex items-center space-x-2">
                        <span>{token.symbol}</span>
                        <Badge variant="outline" className="text-xs">
                          {token.network}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Swap Details */}
          {fromAmount && toAmount && (
            <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Exchange Rate</span>
                <span className="text-white">
                  1 {fromToken} = {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(6)} {toToken}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Price Impact</span>
                <span className="text-green-400">0.12%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Network Fee</span>
                <span className="text-white">~$2.50</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Route</span>
                <span className="text-blue-400">1inch • Uniswap V3</span>
              </div>
            </div>
          )}

          {/* Slippage Settings */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Max Slippage</span>
            <div className="flex space-x-2">
              {['0.1', '0.5', '1.0'].map((value) => (
                <Button
                  key={value}
                  variant={slippage === value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSlippage(value)}
                  className={slippage === value ? 'bg-blue-600 hover:bg-blue-700' : 'border-white/20 text-white hover:bg-white/10'}
                >
                  {value}%
                </Button>
              ))}
            </div>
          </div>

          {/* Execute Button */}
          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 h-12"
            disabled={!fromAmount || !toAmount}
          >
            {orderType === 'market' ? 'Swap Now' : 'Place Limit Order'}
          </Button>
        </CardContent>
      </Card>

      {/* Market Stats */}
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Market Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tokens.slice(0, 4).map((token) => (
              <div key={token.symbol} className="text-center space-y-1">
                <div className="text-white font-medium">{token.symbol}</div>
                <div className="text-green-400 text-sm">
                  ${token.price.toLocaleString()}
                </div>
                <div className="text-slate-400 text-xs">+2.3%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
