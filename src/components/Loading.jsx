import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src="/repair.svg" alt="Under construction" className="w-40 h-40 mb-4" />
      <div className="text-2xl font-bold text-gray-700 mb-4">
        This site is under construction
      </div>
      {/* <div className="text-lg text-gray-600">Loading...</div> */}
    </div>
  );
};

export default Loading;
