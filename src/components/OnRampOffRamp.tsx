
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Banknote, Clock, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

interface Provider {
  name: string;
  logo: string;
  fees: string;
  limits: string;
  kyc: 'none' | 'basic' | 'full';
  time: string;
  rating: number;
  regions: string[];
}

export const OnRampOffRamp = () => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [crypto, setCrypto] = useState('BTC');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const providers: Provider[] = [
    {
      name: 'Transak',
      logo: '🔄',
      fees: '1.49%',
      limits: '$20 - $10,000',
      kyc: 'basic',
      time: '5-10 min',
      rating: 4.8,
      regions: ['US', 'EU', 'UK', 'AU']
    },
    {
      name: 'MoonPay',
      logo: '🌙',
      fees: '1.99%',
      limits: '$30 - $15,000',
      kyc: 'full',
      time: '2-5 min',
      rating: 4.6,
      regions: ['US', 'EU', 'UK', 'CA']
    },
    {
      name: 'Ramp Network',
      logo: '⚡',
      fees: '0.99%',
      limits: '$50 - $25,000',
      kyc: 'basic',
      time: '1-3 min',
      rating: 4.9,
      regions: ['EU', 'UK', 'US']
    }
  ];

  const getKycBadgeColor = (kyc: string) => {
    switch (kyc) {
      case 'none':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'basic':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'full':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Tab Selector */}
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
        <CardContent className="p-4">
          <div className="flex space-x-2">
            <Button
              variant={activeTab === 'buy' ? 'default' : 'outline'}
              onClick={() => setActiveTab('buy')}
              className={activeTab === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'border-white/20 text-white hover:bg-white/10'}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Buy Crypto
            </Button>
            <Button
              variant={activeTab === 'sell' ? 'default' : 'outline'}
              onClick={() => setActiveTab('sell')}
              className={activeTab === 'sell' ? 'bg-yellow-600 hover:bg-yellow-700' : 'border-white/20 text-green'}
            >
              <Banknote className="w-4 h-4 mr-2" />
              Sell Crypto
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Amount Input */}
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle className="text-white">
            {activeTab === 'buy' ? 'Buy Cryptocurrency' : 'Sell Cryptocurrency'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-300">
                {activeTab === 'buy' ? 'Spend Amount' : 'Sell Amount'}
              </label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="1000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-white/10 border-white/20 text-white text-lg h-12"
                />
                <Select value={activeTab === 'buy' ? currency : crypto} onValueChange={activeTab === 'buy' ? setCurrency : setCrypto}>
                  <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {activeTab === 'buy' ? (
                      <>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="INR">INR</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="BTC">BTC</SelectItem>
                        <SelectItem value="ETH">ETH</SelectItem>
                        <SelectItem value="USDC">USDC</SelectItem>
                        <SelectItem value="USDT">USDT</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-300">
                {activeTab === 'buy' ? 'Receive' : 'Receive Amount'}
              </label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="0.0227"
                  readOnly
                  className="bg-white/10 border-white/20 text-white text-lg h-12"
                />
                <Select value={activeTab === 'buy' ? crypto : currency} onValueChange={activeTab === 'buy' ? setCrypto : setCurrency}>
                  <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {activeTab === 'buy' ? (
                      <>
                        <SelectItem value="BTC">BTC</SelectItem>
                        <SelectItem value="ETH">ETH</SelectItem>
                        <SelectItem value="USDC">USDC</SelectItem>
                        <SelectItem value="USDT">USDT</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="INR">INR</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {activeTab === 'buy' && (
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Payment Method</label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="apple">Apple Pay</SelectItem>
                  <SelectItem value="google">Google Pay</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Provider Options */}
      <div className="space-y-4">
        <h3 className="text-white text-lg font-medium">Choose Provider</h3>
        <div className="grid gap-4">
          {providers.map((provider) => (
            <Card key={provider.name} className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{provider.logo}</div>
                    <div>
                      <div className="text-white font-medium flex items-center space-x-2">
                        <span>{provider.name}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-xs ${i < Math.floor(provider.rating) ? 'text-yellow-400' : 'text-gray-500'}`}>
                              ★
                            </span>
                          ))}
                          <span className="text-xs text-slate-400 ml-1">({provider.rating})</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 mt-1">
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                          {provider.fees} fee
                        </Badge>
                        <Badge className={`text-xs ${getKycBadgeColor(provider.kyc)}`}>
                          {provider.kyc.toUpperCase()} KYC
                        </Badge>
                        <span className="text-xs text-slate-400 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {provider.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-1">
                    <div className="text-white font-medium">{provider.limits}</div>
                    <div className="text-xs text-slate-400">
                      Available in: {provider.regions.join(', ')}
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Select
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* KYC Info */}
      <Card className="bg-yellow-500/10 border border-yellow-500/30 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
            <div>
              <h4 className="text-yellow-400 font-medium">KYC Requirements</h4>
              <p className="text-slate-300 text-sm mt-1">
                Most providers require identity verification for compliance. This typically includes:
              </p>
              <ul className="text-slate-300 text-sm mt-2 space-y-1">
                <li>• Government-issued ID (passport, driver's license)</li>
                <li>• Proof of address (utility bill, bank statement)</li>
                <li>• Selfie verification</li>
                <li>• Processing time: 5 minutes to 24 hours</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
