
import React from 'react';
import { UetLogo } from './icons/UetLogo';

const Header: React.FC = () => {
  return (
    <header className="py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 text-center flex flex-col items-center">
        <UetLogo className="h-20 w-20 mb-4" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-sky-500">
          PMBOK® AI Plan
        </h1>
      </div>
    </header>
  );
};

export default Header;
