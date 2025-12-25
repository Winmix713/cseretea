import React from 'react';
import { TrendingUp, Target, Zap, BarChart3 } from 'lucide-react';

const AdminPredictions = () => {
  const predictions = [
    {
      match: 'Liverpool vs Real Madrid',
      prediction: 'Home Win',
      confidence: 78,
      actual: 'Home Win',
      correct: true,
    },
    {
      match: 'Man City vs Arsenal',
      prediction: 'Draw',
      confidence: 65,
      actual: 'Home Win',
      correct: false,
    },
    {
      match: 'Chelsea vs Leicester',
      prediction: 'Home Win',
      confidence: 82,
      actual: 'Home Win',
      correct: true,
    },
    {
      match: 'West Ham vs Burnley',
      prediction: 'Home Win',
      confidence: 71,
      actual: 'Draw',
      correct: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-k-lime/10 border border-k-lime/20 flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-k-lime" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Predictions Management</h1>
          <p className="text-gray-400">Monitor and analyze prediction performance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-5 h-5 text-k-lime" />
            <h3 className="text-sm font-bold text-white">Accuracy</h3>
          </div>
          <div className="text-3xl font-bold text-k-lime mb-1">72.4%</div>
          <div className="text-xs text-gray-400">Last 30 days</div>
        </div>

        <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            <h3 className="text-sm font-bold text-white">Total Predictions</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-1">1,247</div>
          <div className="text-xs text-gray-400">All time</div>
        </div>

        <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-5 h-5 text-emerald-500" />
            <h3 className="text-sm font-bold text-white">Active Models</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-1">3</div>
          <div className="text-xs text-gray-400">Running</div>
        </div>

        <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            <h3 className="text-sm font-bold text-white">Avg Confidence</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-1">74.2%</div>
          <div className="text-xs text-gray-400">This week</div>
        </div>
      </div>

      <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Recent Predictions</h3>
        <div className="space-y-3">
          {predictions.map((pred, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-k-surfaceHighlight rounded-xl border border-k-borderLight"
            >
              <div className="flex-1">
                <div className="text-sm font-bold text-white mb-1">{pred.match}</div>
                <div className="text-xs text-gray-400">
                  Predicted: {pred.prediction} | Actual: {pred.actual}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xs text-gray-400">Confidence</div>
                  <div className="text-sm font-bold text-white">{pred.confidence}%</div>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full border ${
                    pred.correct
                      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                      : 'bg-red-500/10 text-red-500 border-red-500/20'
                  }`}
                >
                  {pred.correct ? 'Correct' : 'Incorrect'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPredictions;
