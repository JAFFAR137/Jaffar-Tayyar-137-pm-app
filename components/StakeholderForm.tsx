
import React from 'react';
import { Stakeholder } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';

interface StakeholderFormProps {
  stakeholders: Stakeholder[];
  setStakeholders: React.Dispatch<React.SetStateAction<Stakeholder[]>>;
}

const StakeholderForm: React.FC<StakeholderFormProps> = ({ stakeholders, setStakeholders }) => {
  
  const addStakeholder = () => {
    const newStakeholder: Stakeholder = {
      id: Date.now(),
      name: '',
      role: '',
      interest: 'Medium',
      influence: 'Medium',
      expectations: '',
    };
    setStakeholders([...stakeholders, newStakeholder]);
  };

  const removeStakeholder = (id: number) => {
    setStakeholders(stakeholders.filter(s => s.id !== id));
  };

  const handleStakeholderChange = (id: number, field: keyof Omit<Stakeholder, 'id'>, value: string) => {
    setStakeholders(
      stakeholders.map(s =>
        s.id === id ? { ...s, [field]: value } : s
      )
    );
  };

  return (
    <div className="space-y-6">
      {stakeholders.map((stakeholder, index) => (
        <div key={stakeholder.id} className="p-4 bg-slate-900/70 border border-slate-700 rounded-lg space-y-4 relative">
          <button
              onClick={() => removeStakeholder(stakeholder.id)}
              className="absolute top-3 right-3 text-slate-500 hover:text-red-400 transition-colors"
              aria-label="Remove Stakeholder"
          >
              <TrashIcon className="h-5 w-5" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Name</label>
                  <input
                      type="text"
                      value={stakeholder.name}
                      onChange={(e) => handleStakeholderChange(stakeholder.id, 'name', e.target.value)}
                      placeholder="e.g., Jane Doe"
                      className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  />
              </div>
              <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Role</label>
                  <input
                      type="text"
                      value={stakeholder.role}
                      onChange={(e) => handleStakeholderChange(stakeholder.id, 'role', e.target.value)}
                      placeholder="e.g., Marketing Director"
                      className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  />
              </div>
              <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Interest</label>
                   <select
                      value={stakeholder.interest}
                      onChange={(e) => handleStakeholderChange(stakeholder.id, 'interest', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                  </select>
              </div>
               <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Influence</label>
                   <select
                      value={stakeholder.influence}
                      onChange={(e) => handleStakeholderChange(stakeholder.id, 'influence', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                  </select>
              </div>
          </div>
          <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Key Expectations</label>
              <input
                  type="text"
                  value={stakeholder.expectations}
                  onChange={(e) => handleStakeholderChange(stakeholder.id, 'expectations', e.target.value)}
                  placeholder="e.g., Regular progress updates"
                  className="w-full bg-slate-800 border border-slate-600 rounded-md p-2 focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
              />
          </div>
        </div>
      ))}
       <button
        onClick={addStakeholder}
        className="w-full flex items-center justify-center bg-slate-700 hover:bg-slate-600 text-teal-300 font-semibold py-2 px-4 rounded-md transition-colors"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        Add Stakeholder
      </button>
    </div>
  );
};

export default StakeholderForm;
