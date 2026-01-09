
import React from 'react';
import { Stakeholder, ScheduleDetails, Risk } from '../types';
import { UsersIcon } from './icons/UsersIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { ShieldExclamationIcon } from './icons/ShieldExclamationIcon';

interface DashboardProps {
  projectDescription: string;
  stakeholders: Stakeholder[];
  scheduleDetails: ScheduleDetails;
  risks: Risk[];
}

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex items-center space-x-4">
        <div className="bg-slate-700 p-3 rounded-full">{icon}</div>
        <div>
            <p className="text-slate-400 text-sm">{title}</p>
            <p className="text-2xl font-bold text-slate-100">{value}</p>
        </div>
    </div>
);


const Dashboard: React.FC<DashboardProps> = ({ projectDescription, stakeholders, scheduleDetails, risks }) => {
    
    const highImpactRiskCount = risks.filter(r => r.impact === 'High').length;
    
    return (
        <div className="space-y-8">
            <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 border border-slate-700">
              <h2 className="text-2xl font-bold text-teal-400 mb-3">Project Description</h2>
              <p className="text-slate-300 leading-relaxed">
                {projectDescription || "No description provided yet. Go to the Project Setup tab to add one."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                    title="Total Stakeholders" 
                    value={stakeholders.length.toString()} 
                    icon={<UsersIcon className="h-6 w-6 text-teal-400" />} 
                />
                 <StatCard 
                    title="Project Duration" 
                    value={scheduleDetails.duration || "N/A"} 
                    icon={<CalendarIcon className="h-6 w-6 text-sky-400" />} 
                />
                 <StatCard 
                    title="High Impact Risks" 
                    value={highImpactRiskCount.toString()} 
                    icon={<ShieldExclamationIcon className="h-6 w-6 text-red-400" />} 
                />
            </div>

             <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 border border-slate-700">
              <h2 className="text-2xl font-bold text-teal-400 mb-4">Risk Overview</h2>
              {risks.length > 0 ? (
                <ul className="space-y-3">
                    {risks.map(risk => (
                        <li key={risk.id} className="p-3 bg-slate-900/70 border border-slate-700 rounded-md flex justify-between items-center">
                            <span className="text-slate-300">{risk.description}</span>
                            <div className="flex space-x-2">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                    risk.probability === 'High' ? 'bg-red-500/20 text-red-300' :
                                    risk.probability === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                                    'bg-green-500/20 text-green-300'
                                }`}>
                                    {risk.probability} Prob.
                                </span>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                    risk.impact === 'High' ? 'bg-red-500/20 text-red-300' :
                                    risk.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                                    'bg-green-500/20 text-green-300'
                                }`}>
                                    {risk.impact} Impact
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
              ) : (
                <p className="text-slate-400">No risks identified yet. Add some in the Project Setup tab.</p>
              )}
            </div>
        </div>
    );
};

export default Dashboard;
