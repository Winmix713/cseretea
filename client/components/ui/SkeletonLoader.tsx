import React from 'react';

const SkeletonLoader = () => (
  <div className="p-6 space-y-6 w-full animate-pulse">
    <div className="h-24 w-full bg-[#1a1a1a] rounded-2xl"></div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 h-80 bg-[#1a1a1a] rounded-3xl"></div>
      <div className="h-80 bg-[#1a1a1a] rounded-3xl"></div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="h-32 bg-[#1a1a1a] rounded-2xl"></div>
      ))}
    </div>
  </div>
);

export default SkeletonLoader;
