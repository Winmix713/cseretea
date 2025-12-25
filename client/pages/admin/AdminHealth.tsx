import React from 'react';
import { Shield, CheckCircle, AlertTriangle, Server, Database, Wifi } from 'lucide-react';

const AdminHealth = () => {
  const healthChecks = [
    { name: 'API Gateway', status: 'healthy', latency: '45ms', icon: Server, color: 'emerald' },
    { name: 'Database Cluster', status: 'healthy', latency: '12ms', icon: Database, color: 'emerald' },
    { name: 'ML Inference Service', status: 'healthy', latency: '89ms', icon: Wifi, color: 'emerald' },
    { name: 'Cache Layer', status: 'warning', latency: '156ms', icon: Server, color: 'warning' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-k-lime/10 border border-k-lime/20 flex items-center justify-center">
          <Shield className="w-6 h-6 text-k-lime" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Health & Monitoring</h1>
          <p className="text-gray-400">Real-time system health checks</p>
        </div>
      </div>

      <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">System Health Overview</h3>
          <span className="text-xs bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full border border-emerald-500/20">
            All Systems Operational
          </span>
        </div>

        <div className="space-y-4">
          {healthChecks.map((check, index) => {
            const Icon = check.icon;
            const isHealthy = check.status === 'healthy';
            const statusColor = isHealthy ? 'emerald' : 'warning';

            return (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-k-surfaceHighlight rounded-xl border border-k-borderLight"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg bg-${statusColor}-500/10 border border-${statusColor}-500/20 flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 text-${statusColor}-500`} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{check.name}</div>
                    <div className="text-xs text-gray-400">Latency: {check.latency}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isHealthy ? (
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-warning" />
                  )}
                  <span className={`text-sm font-bold text-${statusColor}-500 capitalize`}>
                    {check.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white mb-3">Uptime (30d)</h3>
          <div className="text-3xl font-bold text-k-lime mb-1">99.98%</div>
          <div className="text-xs text-gray-400">Target: 99.90%</div>
        </div>

        <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white mb-3">Avg Response Time</h3>
          <div className="text-3xl font-bold text-white mb-1">76ms</div>
          <div className="text-xs text-gray-400">Target: &lt;100ms</div>
        </div>

        <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white mb-3">Error Rate</h3>
          <div className="text-3xl font-bold text-white mb-1">0.02%</div>
          <div className="text-xs text-gray-400">Target: &lt;0.1%</div>
        </div>
      </div>
    </div>
  );
};

export default AdminHealth;
