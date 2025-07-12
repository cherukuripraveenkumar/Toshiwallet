
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, Key, Smartphone, Cloud, Server, CheckCircle, AlertTriangle, Fingerprint } from 'lucide-react';

interface KeyShare {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'backup';
  location: string;
  lastSync: Date;
  icon: React.ReactNode;
}

export const SecurityPanel = () => {
  const [mpcStatus, setMpcStatus] = useState<'healthy' | 'warning' | 'error'>('healthy');
  
  const keyShares: KeyShare[] = [
    {
      id: '1',
      name: 'Device Share',
      status: 'active',
      location: 'Local Secure Enclave',
      lastSync: new Date(),
      icon: <Smartphone className="w-5 h-5" />
    },
    {
      id: '2',
      name: 'Cloud Backup',
      status: 'active',
      location: 'iCloud Keychain',
      lastSync: new Date(Date.now() - 300000),
      icon: <Cloud className="w-5 h-5" />
    },
    {
      id: '3',
      name: 'Server Co-signer',
      status: 'active',
      location: 'AWS HSM',
      lastSync: new Date(Date.now() - 60000),
      icon: <Server className="w-5 h-5" />
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'inactive':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'backup':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getMpcStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* MPC Status Overview */}
      <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-400/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>FROST MPC Status</span>
            <Badge className={`${getMpcStatusColor(mpcStatus) === 'text-green-400' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
              {mpcStatus.toUpperCase()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">2/3</div>
              <div className="text-sm text-slate-300">Threshold Scheme</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">3/3</div>
              <div className="text-sm text-slate-300">Active Shares</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">256</div>
              <div className="text-sm text-slate-300">Security Bits</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">System Health</span>
              <span className="text-green-400">98%</span>
            </div>
            <Progress value={98} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Key Shares Status */}
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Key className="w-5 h-5" />
            <span>Key Shares</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {keyShares.map((share) => (
            <div key={share.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-blue-400">
                  {share.icon}
                </div>
                <div>
                  <div className="text-white font-medium">{share.name}</div>
                  <div className="text-sm text-slate-400">{share.location}</div>
                  <div className="text-xs text-slate-500">
                    Last sync: {share.lastSync.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(share.status)}>
                  {share.status}
                </Badge>
                {share.status === 'active' ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Authentication Methods */}
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Fingerprint className="w-5 h-5" />
            <span>Authentication</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Fingerprint className="w-5 h-5 text-green-400" />
                <div>
                  <div className="text-white font-medium">Biometric Authentication</div>
                  <div className="text-sm text-slate-400">Touch ID / Face ID</div>
                </div>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Enabled
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Key className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-white font-medium">WebAuthn Passkey</div>
                  <div className="text-sm text-slate-400">Hardware Security Key</div>
                </div>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Active
              </Badge>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
              Add Security Key
            </Button>
            <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
              Backup Shares
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Security Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 justify-start">
              <Shield className="w-4 h-4 mr-2" />
              Export Recovery Kit
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 justify-start">
              <Key className="w-4 h-4 mr-2" />
              Rotate Key Shares
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 justify-start">
              <Server className="w-4 h-4 mr-2" />
              Test MPC Protocol
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 justify-start">
              <Cloud className="w-4 h-4 mr-2" />
              Sync Cloud Backup
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
