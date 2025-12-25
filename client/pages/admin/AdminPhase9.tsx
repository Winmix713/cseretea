import React from 'react';
import { Zap, Code, Database, Sparkles } from 'lucide-react';

const AdminPhase9 = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-k-lime/10 border border-k-lime/20 flex items-center justify-center">
          <Zap className="w-6 h-6 text-k-lime" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Phase 9 Features</h1>
          <p className="text-gray-400">Advanced experimental features</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6 hover:border-k-lime/30 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className="text-lg font-bold text-white">AI Enhancement</h3>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Next-generation AI models with improved prediction accuracy and real-time learning capabilities.
          </p>
          <span className="text-xs bg-purple-500/10 text-purple-500 px-3 py-1 rounded-full border border-purple-500/20">
            In Development
          </span>
        </div>

        <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6 hover:border-k-lime/30 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Code className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="text-lg font-bold text-white">API v3</h3>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            RESTful API with GraphQL support, real-time subscriptions, and enhanced authentication.
          </p>
          <span className="text-xs bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full border border-blue-500/20">
            Planning
          </span>
        </div>

        <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6 hover:border-k-lime/30 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Database className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-lg font-bold text-white">Data Lake</h3>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Centralized data repository for historical match data, player statistics, and performance metrics.
          </p>
          <span className="text-xs bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full border border-emerald-500/20">
            Research
          </span>
        </div>

        <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6 hover:border-k-lime/30 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-orange-500" />
            </div>
            <h3 className="text-lg font-bold text-white">Real-time Streaming</h3>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Live match data streaming with instant predictions and dynamic odds updates.
          </p>
          <span className="text-xs bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full border border-orange-500/20">
            Prototype
          </span>
        </div>
      </div>

      <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Development Roadmap</h3>
        <div className="space-y-4">
          {[
            { phase: 'Q1 2025', title: 'AI Model v3.0', status: 'In Progress', progress: 65 },
            { phase: 'Q2 2025', title: 'API Gateway Upgrade', status: 'Planning', progress: 20 },
            { phase: 'Q3 2025', title: 'Data Lake Implementation', status: 'Research', progress: 10 },
            { phase: 'Q4 2025', title: 'Real-time Streaming', status: 'Planned', progress: 5 },
          ].map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400">{item.phase}</span>
                  <div className="text-sm font-bold text-white">{item.title}</div>
                </div>
                <span className="text-xs text-gray-400">{item.status}</span>
              </div>
              <div className="h-2 bg-k-surfaceHighlight rounded-full overflow-hidden">
                <div
                  className="h-full bg-k-lime"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPhase9;
