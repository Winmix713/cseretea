import React from 'react';
import { Clock, Play, Pause, CheckCircle, AlertCircle } from 'lucide-react';

const AdminJobs = () => {
  const jobs = [
    {
      name: 'Daily Predictions Update',
      schedule: 'Every day at 06:00',
      status: 'completed',
      lastRun: '2 hours ago',
      duration: '3m 24s',
    },
    {
      name: 'ML Model Retraining',
      schedule: 'Every Sunday at 02:00',
      status: 'scheduled',
      lastRun: '4 days ago',
      duration: '45m 12s',
    },
    {
      name: 'Database Backup',
      schedule: 'Every 6 hours',
      status: 'running',
      lastRun: 'In progress',
      duration: '2m 15s',
    },
    {
      name: 'Stats Aggregation',
      schedule: 'Every hour',
      status: 'completed',
      lastRun: '12 minutes ago',
      duration: '45s',
    },
    {
      name: 'Cache Cleanup',
      schedule: 'Every day at 03:00',
      status: 'failed',
      lastRun: '5 hours ago',
      duration: 'Failed after 1m 23s',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'emerald';
      case 'running':
        return 'blue';
      case 'failed':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'running':
        return <Play className="w-4 h-4" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Pause className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-k-lime/10 border border-k-lime/20 flex items-center justify-center">
          <Clock className="w-6 h-6 text-k-lime" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Jobs & Schedules</h1>
          <p className="text-gray-400">Manage automated tasks and cron jobs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
          <div className="text-sm text-gray-400 mb-1">Total Jobs</div>
          <div className="text-2xl font-bold text-white">5</div>
        </div>
        <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
          <div className="text-sm text-gray-400 mb-1">Running</div>
          <div className="text-2xl font-bold text-blue-500">1</div>
        </div>
        <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
          <div className="text-sm text-gray-400 mb-1">Completed</div>
          <div className="text-2xl font-bold text-emerald-500">3</div>
        </div>
        <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
          <div className="text-sm text-gray-400 mb-1">Failed</div>
          <div className="text-2xl font-bold text-red-500">1</div>
        </div>
      </div>

      <div className="bg-k-surface border border-k-borderLight rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Scheduled Jobs</h3>
        <div className="space-y-3">
          {jobs.map((job, index) => {
            const statusColor = getStatusColor(job.status);
            return (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-k-surfaceHighlight rounded-xl border border-k-borderLight hover:border-k-lime/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg bg-${statusColor}-500/10 border border-${statusColor}-500/20 flex items-center justify-center text-${statusColor}-500`}>
                    {getStatusIcon(job.status)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{job.name}</div>
                    <div className="text-xs text-gray-400">{job.schedule}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Last Run</div>
                    <div className="text-sm font-bold text-white">{job.lastRun}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Duration</div>
                    <div className="text-sm font-bold text-white">{job.duration}</div>
                  </div>
                  <span className={`text-xs bg-${statusColor}-500/10 text-${statusColor}-500 px-3 py-1 rounded-full border border-${statusColor}-500/20 capitalize`}>
                    {job.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
