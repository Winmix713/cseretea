import React from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, Star } from 'lucide-react';

const AdminFeedback = () => {
  const feedbackItems = [
    {
      id: 1,
      user: 'User#1247',
      match: 'Liverpool vs Real Madrid',
      prediction: 'Home Win (78%)',
      feedback: 'positive',
      comment: 'Accurate prediction, great confidence level!',
      date: '2 hours ago',
    },
    {
      id: 2,
      user: 'User#0892',
      match: 'Man City vs Arsenal',
      prediction: 'Draw (65%)',
      feedback: 'negative',
      comment: 'Prediction was incorrect, need better model.',
      date: '5 hours ago',
    },
    {
      id: 3,
      user: 'User#2156',
      match: 'Chelsea vs Leicester',
      prediction: 'Home Win (82%)',
      feedback: 'positive',
      comment: 'High confidence and correct outcome!',
      date: '1 day ago',
    },
    {
      id: 4,
      user: 'User#3421',
      match: 'West Ham vs Burnley',
      prediction: 'Home Win (71%)',
      feedback: 'neutral',
      comment: 'Close call, could improve confidence calculation.',
      date: '1 day ago',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-k-lime/10 border border-k-lime/20 flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-k-lime" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Prediction Feedback</h1>
          <p className="text-gray-400">User feedback and prediction reviews</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Star className="w-5 h-5 text-k-lime" />
            <h3 className="text-sm font-bold text-white">Avg Rating</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-1">4.2/5</div>
          <div className="text-xs text-gray-400">From 847 reviews</div>
        </div>

        <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <ThumbsUp className="w-5 h-5 text-emerald-500" />
            <h3 className="text-sm font-bold text-white">Positive</h3>
          </div>
          <div className="text-3xl font-bold text-emerald-500 mb-1">672</div>
          <div className="text-xs text-gray-400">79.3%</div>
        </div>

        <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <ThumbsDown className="w-5 h-5 text-red-500" />
            <h3 className="text-sm font-bold text-white">Negative</h3>
          </div>
          <div className="text-3xl font-bold text-red-500 mb-1">124</div>
          <div className="text-xs text-gray-400">14.6%</div>
        </div>

        <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="w-5 h-5 text-gray-400" />
            <h3 className="text-sm font-bold text-white">Neutral</h3>
          </div>
          <div className="text-3xl font-bold text-gray-400 mb-1">51</div>
          <div className="text-xs text-gray-400">6.1%</div>
        </div>
      </div>

      <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Recent Feedback</h3>
        <div className="space-y-3">
          {feedbackItems.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-k-surfaceHighlight rounded-xl border border-k-borderLight hover:border-k-lime/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-sm font-bold text-white">{item.match}</div>
                  <div className="text-xs text-gray-400">{item.prediction}</div>
                </div>
                <div className="flex items-center gap-2">
                  {item.feedback === 'positive' && (
                    <ThumbsUp className="w-4 h-4 text-emerald-500" />
                  )}
                  {item.feedback === 'negative' && (
                    <ThumbsDown className="w-4 h-4 text-red-500" />
                  )}
                  {item.feedback === 'neutral' && (
                    <MessageSquare className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-2">{item.comment}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{item.user}</span>
                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminFeedback;
