import React from 'react';

const AuthCard = ({ title, subtitle, children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full">
    <div className="text-center mb-6">
      <div className="w-12 h-12 bg-blue-600 rounded-full text-white flex items-center justify-center mx-auto mb-3 text-xl font-semibold">L</div>
      <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>

    {children}
  </div>
);

export default AuthCard;
