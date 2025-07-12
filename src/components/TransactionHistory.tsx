
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpRight, ArrowDownLeft, ArrowLeftRight, Search, Filter } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'swap';
  asset: string;
  amount: number;
  usdValue: number;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
  hash: string;
  network: string;
  to?: string;
  from?: string;
}

export const TransactionHistory = () => {
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'receive',
      asset: 'BTC',
      amount: 0.0234,
      usdValue: 1234.56,
      timestamp: new Date('2024-01-15T10:30:00'),
      status: 'completed',
      hash: '0x1234...5678',
      network: 'Bitcoin',
      from: 'bc1q...xyz'
    },
    {
      id: '2',
      type: 'swap',
      asset: 'ETH → USDC',
      amount: 2.5,
      usdValue: 4250.00,
      timestamp: new Date('2024-01-14T15:45:00'),
      status: 'completed',
      hash: '0xabcd...efgh',
      network: 'Ethereum'
    },
    {
      id: '3',
      type: 'send',
      asset: 'USDT',
      amount: 500.00,
      usdValue: 500.00,
      timestamp: new Date('2024-01-13T09:15:00'),
      status: 'pending',
      hash: '0x9876...1234',
      network: 'Polygon',
      to: '0x1234...5678'
    },
    {
      id: '4',
      type: 'receive',
      asset: 'ETH',
      amount: 1.2,
      usdValue: 2880.00,
      timestamp: new Date('2024-01-12T14:20:00'),
      status: 'completed',
      hash: '0xdef0...abcd',
      network: 'Ethereum',
      from: '0xabcd...efgh'
    }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'send':
        return <ArrowUpRight className="w-4 h-4 text-red-400" />;
      case 'receive':
        return <ArrowDownLeft className="w-4 h-4 text-green-400" />;
      case 'swap':
        return <ArrowLeftRight className="w-4 h-4 text-blue-400" />;
      default:
        return <ArrowLeftRight className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'failed':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search transactions..." 
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-slate-400"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="send">Send</SelectItem>
                <SelectItem value="receive">Receive</SelectItem>
                <SelectItem value="swap">Swap</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Filter by network" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Networks</SelectItem>
                <SelectItem value="bitcoin">Bitcoin</SelectItem>
                <SelectItem value="ethereum">Ethereum</SelectItem>
                <SelectItem value="polygon">Polygon</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <span>Recent Transactions</span>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
              {transactions.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-white/10">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="p-4 hover:bg-white/5 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-700/50">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium capitalize">
                          {transaction.type}
                        </span>
                        <Badge variant="outline" className="text-xs border-white/20 text-slate-300">
                          {transaction.network}
                        </Badge>
                      </div>
                      <div className="text-sm text-slate-400">
                        {transaction.asset}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {transaction.timestamp.toLocaleDateString()} {transaction.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-1">
                    <div className="text-white font-medium">
                      {transaction.type === 'send' ? '-' : '+'}
                      {transaction.amount} {transaction.asset.split(' →')[0]}
                    </div>
                    <div className="text-sm text-slate-400">
                      ${transaction.usdValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                    <Badge className={`text-xs ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Hash: {transaction.hash}</span>
                    <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 p-0 h-auto">
                      View Details
                    </Button>
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
