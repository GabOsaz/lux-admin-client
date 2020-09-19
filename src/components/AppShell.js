import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const AppShell = ({ children }) => {
  return (
    <>
      <div className="flex sm:flex-row">
        <div className="h-auto sm:w-64 px-4 sm:px-8 pt-6 bg-blue-700">
          <Sidebar />
        </div>
        <div className="flex flex-col w-4/5 border-l border-blue-800">
          <div className="p-4 sticky border-b border-gray-200 bg-white">
            <Navbar />
          </div>
          <div className="px-4 sm:px-8 py-2 bg-gray-100">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default AppShell;
