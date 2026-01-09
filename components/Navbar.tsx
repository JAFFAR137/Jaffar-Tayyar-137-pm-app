
import React from 'react';
import { ChartPieIcon } from './icons/ChartPieIcon';
import { DocumentDuplicateIcon } from './icons/DocumentDuplicateIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';

interface NavbarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                    ? 'bg-slate-700 text-teal-300'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
};


const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
    return (
        <nav className="flex justify-center p-2 bg-slate-800/50 border border-slate-700 rounded-xl max-w-md mx-auto">
            <div className="flex space-x-2">
                <NavItem 
                    icon={<DocumentTextIcon className="h-5 w-5" />}
                    label="Project Setup"
                    isActive={activeTab === 'setup'}
                    onClick={() => setActiveTab('setup')}
                />
                 <NavItem 
                    icon={<ChartPieIcon className="h-5 w-5" />}
                    label="Dashboard"
                    isActive={activeTab === 'dashboard'}
                    onClick={() => setActiveTab('dashboard')}
                />
                <NavItem 
                    icon={<DocumentDuplicateIcon className="h-5 w-5" />}
                    label="Reports"
                    isActive={activeTab === 'reports'}
                    onClick={() => setActiveTab('reports')}
                />
            </div>
        </nav>
    );
};

export default Navbar;
