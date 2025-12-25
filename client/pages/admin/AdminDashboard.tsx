import React from 'react';
import { Activity, Server, Database, Cpu } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">System overview and key metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-k-lime/10 border border-k-lime/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-k-lime" />
            </div>
            <h3 className="text-sm font-bold text-white">System Status</h3>
          </div>
          <div className="text-2xl font-bold text-white mb-1">Operational</div>
          <div className="text-xs text-gray-400">All systems running</div>
        </div>

        <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Server className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="text-sm font-bold text-white">Active Services</h3>
          </div>
          <div className="text-2xl font-bold text-white mb-1">24</div>
          <div className="text-xs text-gray-400">Running smoothly</div>
        </div>

        <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Database className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className="text-sm font-bold text-white">Database</h3>
          </div>
          <div className="text-2xl font-bold text-white mb-1">Connected</div>
          <div className="text-xs text-gray-400">Response: 12ms</div>
        </div>

        <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-orange-500" />
            </div>
            <h3 className="text-sm font-bold text-white">CPU Usage</h3>
          </div>
          <div className="text-2xl font-bold text-white mb-1">42%</div>
          <div className="text-xs text-gray-400">Normal load</div>
        </div>
      </div>

      <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-k-borderLight">
            <span className="text-sm text-gray-300">System backup completed</span>
            <span className="text-xs text-gray-500">2 minutes ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-k-borderLight">
            <span className="text-sm text-gray-300">ML model updated</span>
            <span className="text-xs text-gray-500">15 minutes ago</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-300">Prediction batch processed</span>
            <span className="text-xs text-gray-500">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
