import React from 'react';
import { Cpu, Zap, Activity, CheckCircle } from 'lucide-react';

const AdminModels = () => {
  const models = [
    {
      name: 'Neural Network v2.1',
      type: 'Deep Learning',
      accuracy: 78.4,
      status: 'active',
      lastTrained: '2 days ago',
    },
    {
      name: 'XGBoost Ensemble',
      type: 'Gradient Boosting',
      accuracy: 74.2,
      status: 'active',
      lastTrained: '5 days ago',
    },
    {
      name: 'Random Forest Classifier',
      type: 'Ensemble',
      accuracy: 71.8,
      status: 'testing',
      lastTrained: '1 day ago',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-k-lime/10 border border-k-lime/20 flex items-center justify-center">
          <Cpu className="w-6 h-6 text-k-lime" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">ML Models</h1>
          <p className="text-gray-400">Manage machine learning models</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-5 h-5 text-k-lime" />
            <h3 className="text-sm font-bold text-white">Active Models</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-1">2</div>
          <div className="text-xs text-gray-400">In production</div>
        </div>

        <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-5 h-5 text-blue-500" />
            <h3 className="text-sm font-bold text-white">Best Accuracy</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-1">78.4%</div>
          <div className="text-xs text-gray-400">Neural Network v2.1</div>
        </div>

        <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            <h3 className="text-sm font-bold text-white">Training Status</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-1">Idle</div>
          <div className="text-xs text-gray-400">No active training</div>
        </div>
      </div>

      <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Model Registry</h3>
        <div className="space-y-3">
          {models.map((model, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-k-surfaceHighlight rounded-xl border border-k-borderLight hover:border-k-lime/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-k-lime/10 border border-k-lime/20 flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-k-lime" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{model.name}</div>
                  <div className="text-xs text-gray-400">{model.type}</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-xs text-gray-400">Accuracy</div>
                  <div className="text-sm font-bold text-white">{model.accuracy}%</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">Last Trained</div>
                  <div className="text-sm font-bold text-white">{model.lastTrained}</div>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full border capitalize ${
                    model.status === 'active'
                      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                      : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                  }`}
                >
                  {model.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Training History</h3>
        <div className="space-y-3">
          {[
            { model: 'Neural Network v2.1', date: '2 days ago', duration: '4h 23m', improvement: '+2.1%' },
            { model: 'Random Forest Classifier', date: '1 day ago', duration: '1h 45m', improvement: '+0.8%' },
            { model: 'XGBoost Ensemble', date: '5 days ago', duration: '2h 12m', improvement: '+1.5%' },
          ].map((training, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-k-surfaceHighlight rounded-lg">
              <span className="text-sm text-white">{training.model}</span>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400">{training.date}</span>
                <span className="text-xs text-gray-400">{training.duration}</span>
                <span className="text-xs text-k-lime font-bold">{training.improvement}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminModels;
