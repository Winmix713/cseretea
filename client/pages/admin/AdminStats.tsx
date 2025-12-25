import React from 'react';
import { BarChart3, Activity, TrendingUp, Zap } from 'lucide-react';

const AdminStats = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-k-lime/10 border border-k-lime/20 flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-k-lime" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Stats Analyzer</h1>
          <p className="text-gray-400">Advanced statistical analysis tools</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-5 h-5 text-k-lime" />
            <h3 className="text-sm font-bold text-white">Matches Analyzed</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-1">3,842</div>
          <div className="text-xs text-gray-400">All time</div>
        </div>

        <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <h3 className="text-sm font-bold text-white">Data Points</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-1">2.4M</div>
          <div className="text-xs text-gray-400">Processed</div>
        </div>

        <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-5 h-5 text-purple-500" />
            <h3 className="text-sm font-bold text-white">Processing Speed</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-1">142ms</div>
          <div className="text-xs text-gray-400">Avg per match</div>
        </div>
      </div>

      <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Analysis Metrics</h3>
        <div className="space-y-4">
          {[
            { label: 'Expected Goals (xG)', value: '95.2%', description: 'Model accuracy' },
            { label: 'Possession Analysis', value: '89.7%', description: 'Data coverage' },
            { label: 'Shot Quality Index', value: '92.4%', description: 'Prediction rate' },
            { label: 'Defensive Metrics', value: '88.1%', description: 'Tracking accuracy' },
          ].map((metric, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-k-borderLight last:border-0">
              <div>
                <div className="text-sm font-bold text-white">{metric.label}</div>
                <div className="text-xs text-gray-400">{metric.description}</div>
              </div>
              <div className="text-lg font-bold text-k-lime">{metric.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Recent Analysis Jobs</h3>
        <div className="space-y-3">
          {[
            { name: 'Premier League Round 8', status: 'Completed', time: '5 minutes ago' },
            { name: 'La Liga Round 10', status: 'Processing', time: 'In progress' },
            { name: 'Champions League MD4', status: 'Completed', time: '2 hours ago' },
          ].map((job, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-k-surfaceHighlight rounded-lg">
              <span className="text-sm text-white">{job.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">{job.time}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  job.status === 'Completed'
                    ? 'bg-emerald-500/10 text-emerald-500'
                    : 'bg-blue-500/10 text-blue-500'
                }`}>
                  {job.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
